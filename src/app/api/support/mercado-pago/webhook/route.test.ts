import { beforeEach, describe, expect, it, vi } from 'vitest'

const fetchMercadoPagoPayment = vi.fn()
const updateSupportPixChargeStatus = vi.fn()

vi.mock('@/lib/support/mercado-pago', () => ({
  fetchMercadoPagoPayment,
}))

vi.mock('@/lib/support/support-payments-store', () => ({
  updateSupportPixChargeStatus,
  upsertSupportPixCharge: vi.fn(),
  findSupportPixChargeByProviderChargeId: vi.fn(),
}))

describe('POST /api/support/mercado-pago/webhook', () => {
  beforeEach(() => {
    fetchMercadoPagoPayment.mockReset()
    updateSupportPixChargeStatus.mockReset()
  })

  it('acknowledges payment notifications and fetches the payment', async () => {
    fetchMercadoPagoPayment.mockResolvedValue({
      id: '123',
      status: 'PAID',
      expiresAt: '2026-04-05T12:00:00.000Z',
      externalReference: 'support-page',
    })

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/mercado-pago/webhook', {
        method: 'POST',
        body: JSON.stringify({
          type: 'payment',
          data: { id: '123' },
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ ok: true })
    expect(fetchMercadoPagoPayment).toHaveBeenCalledWith('123')
    expect(updateSupportPixChargeStatus).toHaveBeenCalledWith({
      expiresAt: '2026-04-05T12:00:00.000Z',
      externalReference: 'support-page',
      provider: 'mercado_pago',
      providerChargeId: '123',
      status: 'PAID',
    })
  })

  it('ignores non-payment notifications', async () => {
    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/mercado-pago/webhook', {
        method: 'POST',
        body: JSON.stringify({
          type: 'topic_authorized_payment',
          data: { id: '123' },
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ ok: true })
    expect(fetchMercadoPagoPayment).not.toHaveBeenCalled()
  })

  it('accepts payment notifications sent by query string', async () => {
    fetchMercadoPagoPayment.mockResolvedValue({
      id: '123',
      status: 'pending',
      expiresAt: '2026-04-05T12:00:00.000Z',
      externalReference: 'support-page',
    })

    const { POST } = await import('./route')
    const response = await POST(
      new Request(
        'http://localhost/api/support/mercado-pago/webhook?topic=payment&id=123',
        { method: 'POST' },
      ),
    )

    expect(response.status).toBe(200)
    expect(fetchMercadoPagoPayment).toHaveBeenCalledWith('123')
  })
})
