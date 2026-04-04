import { beforeEach, describe, expect, it, vi } from 'vitest'

const createCheckoutSession = vi.fn()

vi.mock('@/lib/support/stripe', () => ({
  getStripeClient: () => ({
    checkout: {
      sessions: {
        create: createCheckoutSession,
      },
    },
  }),
}))

describe('POST /api/support/donate/card', () => {
  beforeEach(() => {
    createCheckoutSession.mockReset()
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.vivenciasazuis.com.br'
    process.env.STRIPE_SECRET_KEY = 'sk_test_123'
    process.env.STRIPE_PRICE_ID_APOIAR = 'price_apoiar'
    process.env.STRIPE_PRICE_ID_FORTALECER = 'price_fortalecer'
    process.env.STRIPE_PRICE_ID_SUSTENTAR = 'price_sustentar'
    process.env.ABACATE_PAY_API_KEY = 'abacate_test_123'
  })

  it('returns the redirect url for a valid card donation', async () => {
    createCheckoutSession.mockResolvedValue({
      url: 'https://checkout.stripe.com/c/pay/cs_test_card_123',
    })

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/donate/card', {
        method: 'POST',
        body: JSON.stringify({
          amountInCents: 2500,
          paymentMethod: 'card',
          source: 'support-page',
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      url: 'https://checkout.stripe.com/c/pay/cs_test_card_123',
    })
    expect(createCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'payment',
        metadata: {
          kind: 'donation-card',
          source: 'support-page',
          amountInCents: '2500',
        },
      }),
    )
  })

  it('returns 400 for an invalid card donation request body', async () => {
    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/donate/card', {
        method: 'POST',
        body: JSON.stringify({
          amountInCents: 2500,
          paymentMethod: 'pix',
          source: 'support-page',
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({
      message: 'Dados inválidos.',
    })
    expect(createCheckoutSession).not.toHaveBeenCalled()
  })

  it('returns 502 when Stripe does not provide a redirect url', async () => {
    createCheckoutSession.mockResolvedValue({ url: null })

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/donate/card', {
        method: 'POST',
        body: JSON.stringify({
          amountInCents: 5000,
          paymentMethod: 'card',
          source: 'support-page',
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(502)
    await expect(response.json()).resolves.toEqual({
      message: 'Checkout indisponível no momento.',
    })
  })

  it('returns 502 when Stripe checkout creation fails', async () => {
    createCheckoutSession.mockRejectedValue(new Error('stripe down'))

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/donate/card', {
        method: 'POST',
        body: JSON.stringify({
          amountInCents: 5000,
          paymentMethod: 'card',
          source: 'support-page',
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(502)
    await expect(response.json()).resolves.toEqual({
      message: 'Não foi possível iniciar a doação por cartão.',
    })
  })
})
