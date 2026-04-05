import { beforeEach, describe, expect, it, vi } from 'vitest'

const createCharge = vi.fn()
const checkCharge = vi.fn()
const getPixProviderAdapter = vi.fn()
const upsertSupportPixCharge = vi.fn()

vi.mock('@/lib/support/pix-provider', () => ({
  getPixProviderAdapter,
}))

vi.mock('@/lib/support/support-payments-store', () => ({
  upsertSupportPixCharge,
  updateSupportPixChargeStatus: vi.fn(),
  findSupportPixChargeByProviderChargeId: vi.fn(),
}))

describe('pix donation routes', () => {
  beforeEach(() => {
    createCharge.mockReset()
    checkCharge.mockReset()
    getPixProviderAdapter.mockReset()
    upsertSupportPixCharge.mockReset()
    getPixProviderAdapter.mockReturnValue({
      provider: 'abacate_pay',
      createCharge,
      checkCharge,
    })
  })

  it('returns the qr code payload for pix donations', async () => {
    createCharge.mockResolvedValue({
      chargeId: 'pix_char_123',
      status: 'PENDING',
      brCode: '00020126...',
      brCodeBase64: 'data:image/png;base64,abc',
      expiresAt: '2026-04-04T18:00:00.000Z',
      ticketUrl: 'https://www.mercadopago.com.br/payments/123/ticket',
    })

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/donate/pix', {
        method: 'POST',
        body: JSON.stringify({
          amountInCents: 2500,
          paymentMethod: 'pix',
          payerEmail: 'pix@example.com',
          source: 'support-page',
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      chargeId: 'pix_char_123',
      status: 'PENDING',
      ticketUrl: 'https://www.mercadopago.com.br/payments/123/ticket',
    })
    expect(createCharge).toHaveBeenCalledWith({
      amountInCents: 2500,
      payerEmail: 'pix@example.com',
      source: 'support-page',
    })
    expect(upsertSupportPixCharge).toHaveBeenCalledWith({
      amountInCents: 2500,
      brCode: '00020126...',
      brCodeBase64: 'data:image/png;base64,abc',
      expiresAt: '2026-04-04T18:00:00.000Z',
      payerEmail: 'pix@example.com',
      provider: 'abacate_pay',
      providerChargeId: 'pix_char_123',
      source: 'support-page',
      status: 'PENDING',
      ticketUrl: 'https://www.mercadopago.com.br/payments/123/ticket',
    })
  })

  it('returns 400 for an invalid pix donation request body', async () => {
    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/donate/pix', {
        method: 'POST',
        body: JSON.stringify({
          amountInCents: 2500,
          paymentMethod: 'card',
          payerEmail: 'pix@example.com',
          source: 'support-page',
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({
      message: 'Dados inválidos.',
    })
    expect(createCharge).not.toHaveBeenCalled()
  })

  it('returns 502 when pix charge creation fails', async () => {
    createCharge.mockRejectedValue(new Error('provider down'))

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/donate/pix', {
        method: 'POST',
        body: JSON.stringify({
          amountInCents: 2500,
          paymentMethod: 'pix',
          payerEmail: 'pix@example.com',
          source: 'support-page',
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(502)
    await expect(response.json()).resolves.toEqual({
      message: 'Não foi possível gerar o Pix agora.',
    })
  })

  it('returns pix status by charge id', async () => {
    checkCharge.mockResolvedValue({
      chargeId: 'pix_char_123',
      status: 'PAID',
      expiresAt: '2026-04-04T18:00:00.000Z',
    })

    const { GET } = await import('./[chargeId]/route')
    const response = await GET(
      new Request('http://localhost/api/support/donate/pix/pix_char_123'),
      { params: Promise.resolve({ chargeId: 'pix_char_123' }) },
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      chargeId: 'pix_char_123',
      status: 'PAID',
      expiresAt: '2026-04-04T18:00:00.000Z',
    })
  })

  it('returns 502 when pix status lookup fails', async () => {
    checkCharge.mockRejectedValue(new Error('provider down'))

    const { GET } = await import('./[chargeId]/route')
    const response = await GET(
      new Request('http://localhost/api/support/donate/pix/pix_char_123'),
      { params: Promise.resolve({ chargeId: 'pix_char_123' }) },
    )

    expect(response.status).toBe(502)
    await expect(response.json()).resolves.toEqual({
      message: 'Não foi possível consultar o Pix.',
    })
  })
})
