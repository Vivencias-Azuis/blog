import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { getSupportPixEnv } from '@/lib/support/config'
import { SupportRouteError } from '@/lib/support/errors'
import type {
  PixChargeCreateInput,
  PixChargeResult,
  PixChargeStatus,
  PixProviderAdapter,
} from '@/lib/support/pix-provider'

const mercadoPagoPaymentResponseSchema = z.object({
  id: z.union([z.string(), z.number()]),
  status: z.string(),
  external_reference: z.string().nullable().optional(),
  date_of_expiration: z.string().nullable().optional(),
  point_of_interaction: z
    .object({
      transaction_data: z
        .object({
          qr_code: z.string(),
          qr_code_base64: z.string(),
          ticket_url: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
})

const mercadoPagoErrorResponseSchema = z.object({
  message: z.string().nullable().optional(),
  error: z.string().nullable().optional(),
  errors: z
    .array(
      z.object({
        code: z.string().optional(),
        message: z.string().optional(),
      }),
    )
    .optional(),
})

function getMercadoPagoConfig() {
  const env = getSupportPixEnv()

  if (!env.MERCADO_PAGO_ACCESS_TOKEN) {
    throw new SupportRouteError(500, 'Mercado Pago não configurado para Pix.')
  }

  return {
    token: env.MERCADO_PAGO_ACCESS_TOKEN,
    siteUrl: env.NEXT_PUBLIC_SITE_URL,
  }
}

function buildMercadoPagoWebhookUrl(siteUrl: string) {
  if (!siteUrl.startsWith('https://')) {
    return undefined
  }

  return `${siteUrl}/api/support/mercado-pago/webhook`
}

function mapMercadoPagoStatus(status: string): PixChargeResult['status'] {
  if (status === 'approved') {
    return 'PAID'
  }

  if (status === 'cancelled' || status === 'rejected' || status === 'expired') {
    return 'EXPIRED'
  }

  return 'PENDING'
}

async function parseMercadoPagoError(response: Response) {
  let body: unknown = null
  let rawBody = ''

  try {
    if (typeof response.text === 'function') {
      rawBody = await response.text()
      body = rawBody ? JSON.parse(rawBody) : null
    } else if (typeof response.json === 'function') {
      body = await response.json()
      rawBody = body ? JSON.stringify(body) : ''
    }
  } catch {
    body = null
  }

  console.error('Mercado Pago API error response', {
    status: response.status,
    body: rawBody || body,
  })

  const parsed = mercadoPagoErrorResponseSchema.safeParse(body)
  const firstError = parsed.success ? parsed.data.errors?.[0] : undefined
  const code = firstError?.code
  const message = firstError?.message ?? (parsed.success ? parsed.data.message : null)

  if (response.status === 401 && code === 'invalid_credentials') {
    throw new SupportRouteError(500, 'Mercado Pago rejeitou as credenciais de Pix.')
  }

  if (response.status >= 500 || message === 'internal_error') {
    throw new SupportRouteError(502, 'Mercado Pago indisponível para Pix agora.')
  }

  throw new SupportRouteError(502, 'Falha ao falar com o Mercado Pago.')
}

async function mercadoPagoRequest(path: string, init: RequestInit) {
  const { token } = getMercadoPagoConfig()

  const response = await fetch(`https://api.mercadopago.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    await parseMercadoPagoError(response)
  }

  try {
    let parsedBody: unknown = null
    let rawBody = ''

    if (typeof response.text === 'function') {
      rawBody = await response.text()
      parsedBody = rawBody ? JSON.parse(rawBody) : null
    } else if (typeof response.json === 'function') {
      parsedBody = await response.json()
      rawBody = parsedBody ? JSON.stringify(parsedBody) : ''
    }

    return mercadoPagoPaymentResponseSchema.parse(parsedBody)
  } catch (error) {
    console.error('Mercado Pago response parse failure', {
      path,
      status: response.status,
      body: typeof response.text === 'function' ? undefined : 'unavailable-after-consume',
      error,
    })
    throw new SupportRouteError(502, 'Resposta inválida do Mercado Pago para Pix.')
  }
}

export async function fetchMercadoPagoPayment(paymentId: string) {
  const payment = await mercadoPagoRequest(`/v1/payments/${encodeURIComponent(paymentId)}`, {
    method: 'GET',
    headers: {},
  })

  return {
    id: String(payment.id),
    status: mapMercadoPagoStatus(payment.status),
    expiresAt:
      payment.date_of_expiration ??
      new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    externalReference: payment.external_reference ?? null,
  }
}

function toPixChargeResult(
  payment: z.infer<typeof mercadoPagoPaymentResponseSchema>,
): PixChargeResult {
  const transactionData = payment.point_of_interaction?.transaction_data

  if (!transactionData?.qr_code || !transactionData.qr_code_base64) {
    throw new SupportRouteError(502, 'Mercado Pago não retornou o QR Code do Pix.')
  }

  return {
    chargeId: String(payment.id),
    status: mapMercadoPagoStatus(payment.status),
    brCode: transactionData.qr_code,
    brCodeBase64: `data:image/png;base64,${transactionData.qr_code_base64}`,
    expiresAt: payment.date_of_expiration ?? new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    ticketUrl: transactionData.ticket_url,
  }
}

export const mercadoPagoPixAdapter: PixProviderAdapter = {
  provider: 'mercado_pago',
  async createCharge(input: PixChargeCreateInput) {
    const { siteUrl } = getMercadoPagoConfig()
    const notificationUrl = buildMercadoPagoWebhookUrl(siteUrl)

    if (!input.payerEmail) {
      throw new SupportRouteError(
        400,
        'Informe um e-mail válido para gerar o Pix.',
      )
    }

    const payment = await mercadoPagoRequest('/v1/payments', {
      method: 'POST',
      headers: {
        'X-Idempotency-Key': randomUUID(),
      },
      body: JSON.stringify({
        transaction_amount: input.amountInCents / 100,
        description: 'Doação para o projeto Vivências Azuis',
        payment_method_id: 'pix',
        external_reference: `support:${input.source}:${Date.now()}`,
        date_of_expiration: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        ...(notificationUrl ? { notification_url: notificationUrl } : {}),
        payer: {
          email: input.payerEmail,
        },
      }),
    })

    return toPixChargeResult(payment)
  },
  async checkCharge(chargeId: string): Promise<PixChargeStatus> {
    const payment = await fetchMercadoPagoPayment(chargeId)

    return {
      chargeId: payment.id,
      status: payment.status,
      expiresAt: payment.expiresAt,
    }
  },
}
