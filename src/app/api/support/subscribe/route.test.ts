import { beforeEach, describe, expect, it, vi } from 'vitest'

const createCheckoutSession = vi.fn()
const authMock = vi.fn()
const currentUserMock = vi.fn()

vi.mock('@clerk/nextjs/server', () => ({
  auth: authMock,
  currentUser: currentUserMock,
}))

vi.mock('@/lib/support/stripe', () => ({
  getStripeClient: () => ({
    checkout: {
      sessions: {
        create: createCheckoutSession,
      },
    },
  }),
}))

describe('POST /api/support/subscribe', () => {
  beforeEach(() => {
    createCheckoutSession.mockReset()
    authMock.mockReset()
    currentUserMock.mockReset()
    authMock.mockResolvedValue({ userId: 'user_default' })
    currentUserMock.mockResolvedValue(null)
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.vivenciasazuis.com.br'
    process.env.STRIPE_SECRET_KEY = 'sk_test_123'
    process.env.STRIPE_PRICE_ID_APOIAR = 'price_apoiar'
    process.env.STRIPE_PRICE_ID_FORTALECER = 'price_fortalecer'
    process.env.STRIPE_PRICE_ID_SUSTENTAR = 'price_sustentar'
    process.env.ABACATE_PAY_API_KEY = 'abacate_test_123'
  })

  it('returns the redirect url for a valid subscription tier', async () => {
    createCheckoutSession.mockResolvedValue({
      url: 'https://checkout.stripe.com/c/pay/cs_test_123',
    })

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/subscribe', {
        method: 'POST',
        body: JSON.stringify({ tierSlug: 'fortalecer', source: 'support-page' }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      url: 'https://checkout.stripe.com/c/pay/cs_test_123',
    })
    expect(createCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'subscription',
        line_items: [{ price: 'price_fortalecer', quantity: 1 }],
        client_reference_id: 'user_default',
        metadata: expect.objectContaining({
          kind: 'subscription',
          tierSlug: 'fortalecer',
          clerkUserId: 'user_default',
          source: 'support-page',
        }),
      }),
    )
  })

  it('returns 401 when recurring checkout is requested without a signed-in user', async () => {
    authMock.mockResolvedValue({ userId: null })

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/subscribe', {
        method: 'POST',
        body: JSON.stringify({ tierSlug: 'apoiar', source: 'support-page' }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({
      message: 'Faça login para iniciar a assinatura.',
    })
    expect(createCheckoutSession).not.toHaveBeenCalled()
  })

  it('passes clerkUserId and tierSlug into checkout metadata', async () => {
    authMock.mockResolvedValue({ userId: 'user_123' })
    currentUserMock.mockResolvedValue({
      emailAddresses: [{ emailAddress: 'person@example.com' }],
    })
    createCheckoutSession.mockResolvedValue({
      url: 'https://checkout.stripe.com/c/pay/cs_test_123',
    })

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/subscribe', {
        method: 'POST',
        body: JSON.stringify({ tierSlug: 'fortalecer', source: 'support-page' }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(200)
    expect(createCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        client_reference_id: 'user_123',
        customer_email: 'person@example.com',
        metadata: expect.objectContaining({
          clerkUserId: 'user_123',
          tierSlug: 'fortalecer',
          kind: 'subscription',
        }),
      }),
    )
  })

  it('continues checkout when currentUser lookup fails', async () => {
    authMock.mockResolvedValue({ userId: 'user_123' })
    currentUserMock.mockRejectedValue(new Error('clerk unavailable'))
    createCheckoutSession.mockResolvedValue({
      url: 'https://checkout.stripe.com/c/pay/cs_test_123',
    })

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/subscribe', {
        method: 'POST',
        body: JSON.stringify({ tierSlug: 'fortalecer', source: 'support-page' }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(200)
    expect(createCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        client_reference_id: 'user_123',
        metadata: expect.objectContaining({
          clerkUserId: 'user_123',
          tierSlug: 'fortalecer',
        }),
      }),
    )
    expect(createCheckoutSession).toHaveBeenCalledWith(
      expect.not.objectContaining({
        customer_email: expect.anything(),
      }),
    )
  })

  it('returns 400 for an invalid subscription request body', async () => {
    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/subscribe', {
        method: 'POST',
        body: JSON.stringify({ tierSlug: 'invalido' }),
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
    createCheckoutSession.mockResolvedValue({
      url: null,
    })

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/subscribe', {
        method: 'POST',
        body: JSON.stringify({ tierSlug: 'apoiar', source: 'support-page' }),
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
      new Request('http://localhost/api/support/subscribe', {
        method: 'POST',
        body: JSON.stringify({ tierSlug: 'sustentar', source: 'support-page' }),
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    expect(response.status).toBe(502)
    await expect(response.json()).resolves.toEqual({
      message: 'Não foi possível iniciar a assinatura.',
    })
  })
})
