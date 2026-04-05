import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SupportRouteError } from '@/lib/support/errors'

const getSupportEnv = vi.fn()

vi.mock('@/lib/support/config', () => ({
  getSupportEnv,
}))

describe('mercado pago pix adapter', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-05T11:00:00.000Z'))
    getSupportEnv.mockReset()
    getSupportEnv.mockReturnValue({
      NEXT_PUBLIC_SITE_URL: 'https://www.vivenciasazuis.com.br',
      MERCADO_PAGO_ACCESS_TOKEN: 'TEST-token',
    })
  })

  it('creates a pix charge and normalizes the qr code payload', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          id: 123456,
          status: 'pending',
          date_of_expiration: '2026-04-05T12:00:00.000-03:00',
          point_of_interaction: {
            transaction_data: {
              qr_code: '000201010212...',
              qr_code_base64: 'iVBORw0KGgoAAAANSUhEUgAA',
              ticket_url: 'https://www.mercadopago.com.br/payments/123456/ticket',
            },
          },
        }),
      }),
    )

    const { mercadoPagoPixAdapter } = await import('./mercado-pago')
    const charge = await mercadoPagoPixAdapter.createCharge({
      amountInCents: 2500,
      payerEmail: 'pix@example.com',
      source: 'support-page',
    })

    expect(charge).toEqual({
      chargeId: '123456',
      status: 'PENDING',
      brCode: '000201010212...',
      brCodeBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA',
      expiresAt: '2026-04-05T12:00:00.000-03:00',
      ticketUrl: 'https://www.mercadopago.com.br/payments/123456/ticket',
    })
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadopago.com/v1/payments',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer TEST-token',
          'Content-Type': 'application/json',
        }),
      }),
    )
    const body = JSON.parse((vi.mocked(fetch).mock.calls[0]?.[1] as RequestInit).body as string)
    expect(body).toMatchObject({
      transaction_amount: 25,
      description: 'Doação para o projeto Vivências Azuis',
      payment_method_id: 'pix',
      date_of_expiration: '2026-04-05T12:00:00.000Z',
      notification_url:
        'https://www.vivenciasazuis.com.br/api/support/mercado-pago/webhook',
      payer: {
        email: 'pix@example.com',
      },
    })
    expect(body.external_reference).toMatch(/^support:support-page:/)
  })

  it('checks a pix charge and maps approved to paid', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          id: 987654,
          status: 'approved',
          date_of_expiration: '2026-04-05T12:00:00.000-03:00',
          point_of_interaction: {
            transaction_data: {
              qr_code: 'unused',
              qr_code_base64: 'unused',
            },
          },
        }),
      }),
    )

    const { mercadoPagoPixAdapter } = await import('./mercado-pago')
    const charge = await mercadoPagoPixAdapter.checkCharge('987654')

    expect(charge).toEqual({
      chargeId: '987654',
      status: 'PAID',
      expiresAt: '2026-04-05T12:00:00.000-03:00',
    })
  })

  it('surfaces invalid credentials with an actionable error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        json: async () => ({
          errors: [
            {
              code: 'invalid_credentials',
              message:
                'Test credentials are not supported, use test users with production credentials to sandbox environment.',
            },
          ],
        }),
      }),
    )

    const { mercadoPagoPixAdapter } = await import('./mercado-pago')

    await expect(
      mercadoPagoPixAdapter.createCharge({
        amountInCents: 2500,
        payerEmail: 'pix@example.com',
        source: 'support-page',
      }),
    ).rejects.toEqual(
      new SupportRouteError(
        500,
        'Mercado Pago rejeitou as credenciais de Pix.',
      ),
    )
  })

  it('fetches an existing mercado pago payment and normalizes its status', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          id: 123456,
          status: 'approved',
          date_of_expiration: '2026-04-05T12:00:00.000-03:00',
          external_reference: 'support:support-page:123',
        }),
      }),
    )

    const { fetchMercadoPagoPayment } = await import('./mercado-pago')
    const payment = await fetchMercadoPagoPayment('123456')

    expect(payment).toEqual({
      id: '123456',
      status: 'PAID',
      expiresAt: '2026-04-05T12:00:00.000-03:00',
      externalReference: 'support:support-page:123',
    })
  })
})
