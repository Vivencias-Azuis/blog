import { getSupportEnv, type PixProvider } from '@/lib/support/config'
import { SupportRouteError } from '@/lib/support/errors'
import { createTransparentPixCharge, checkTransparentPixCharge } from '@/lib/support/abacate-pay'
import { mercadoPagoPixAdapter } from '@/lib/support/mercado-pago'
import { buildAbacatePixPayload } from '@/lib/support/schema'

export interface PixChargeCreateInput {
  amountInCents: number
  source: string
  payerEmail?: string
}

export interface PixChargeResult {
  chargeId: string
  status: 'PENDING' | 'PAID' | 'EXPIRED'
  brCode: string
  brCodeBase64: string
  expiresAt: string
  ticketUrl?: string
}

export interface PixChargeStatus {
  chargeId: string
  status: 'PENDING' | 'PAID' | 'EXPIRED'
  expiresAt: string
}

export interface PixProviderAdapter {
  provider: PixProvider
  createCharge(input: PixChargeCreateInput): Promise<PixChargeResult>
  checkCharge(chargeId: string): Promise<PixChargeStatus>
}

const abacatePayPixAdapter: PixProviderAdapter = {
  provider: 'abacate_pay',
  async createCharge(input) {
    const charge = await createTransparentPixCharge(
      buildAbacatePixPayload(input),
    )

    return {
      chargeId: charge.data.id,
      status: charge.data.status,
      brCode: charge.data.brCode,
      brCodeBase64: charge.data.brCodeBase64,
      expiresAt: charge.data.expiresAt,
      ticketUrl: undefined,
    }
  },
  async checkCharge(chargeId) {
    const charge = await checkTransparentPixCharge(chargeId)

    return {
      chargeId: charge.data.id,
      status: charge.data.status,
      expiresAt: charge.data.expiresAt,
    }
  },
}

export function getPixProviderAdapter(): PixProviderAdapter {
  const env = getSupportEnv()

  if (env.PIX_PROVIDER === 'abacate_pay') {
    if (!env.ABACATE_PAY_API_KEY) {
      throw new SupportRouteError(500, 'Abacate Pay não configurado para Pix.')
    }

    return abacatePayPixAdapter
  }

  if (env.PIX_PROVIDER === 'mercado_pago') {
    return mercadoPagoPixAdapter
  }

  throw new SupportRouteError(500, 'Provedor Pix inválido.')
}
