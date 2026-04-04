import { beforeEach, describe, expect, it, vi } from 'vitest'

const createTransparentPixCharge = vi.fn()
const checkTransparentPixCharge = vi.fn()

vi.mock('@/lib/support/abacate-pay', () => ({
  createTransparentPixCharge,
  checkTransparentPixCharge,
}))

describe('pix donation routes', () => {
  beforeEach(() => {
    createTransparentPixCharge.mockReset()
    checkTransparentPixCharge.mockReset()
  })

  it('returns the qr code payload for pix donations', async () => {
    createTransparentPixCharge.mockResolvedValue({
      success: true,
      error: null,
      data: {
        id: 'pix_char_123',
        status: 'PENDING',
        brCode: '00020126...',
        brCodeBase64: 'data:image/png;base64,abc',
        expiresAt: '2026-04-04T18:00:00.000Z',
      },
    })

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/donate/pix', {
        method: 'POST',
        body: JSON.stringify({
          amountInCents: 2500,
          paymentMethod: 'pix',
          source: 'support-page',
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      chargeId: 'pix_char_123',
      status: 'PENDING',
    })
    expect(createTransparentPixCharge).toHaveBeenCalledWith({
      method: 'PIX',
      data: {
        amount: 2500,
        description: 'Doação para o projeto Vivências Azuis',
        expiresIn: 3600,
        metadata: {
          kind: 'donation',
          source: 'support-page',
        },
      },
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
          source: 'support-page',
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({
      message: 'Dados inválidos.',
    })
    expect(createTransparentPixCharge).not.toHaveBeenCalled()
  })

  it('returns 502 when pix charge creation fails', async () => {
    createTransparentPixCharge.mockRejectedValue(new Error('abacate down'))

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/donate/pix', {
        method: 'POST',
        body: JSON.stringify({
          amountInCents: 2500,
          paymentMethod: 'pix',
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
    checkTransparentPixCharge.mockResolvedValue({
      success: true,
      error: null,
      data: {
        id: 'pix_char_123',
        status: 'PAID',
        brCode: '00020126...',
        brCodeBase64: 'data:image/png;base64,abc',
        expiresAt: '2026-04-04T18:00:00.000Z',
      },
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
    checkTransparentPixCharge.mockRejectedValue(new Error('abacate down'))

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
