import { beforeEach, describe, expect, it, vi } from 'vitest'

const retrieveCheckoutSession = vi.fn()

vi.mock('@/lib/support/stripe', () => ({
  getStripeClient: () => ({
    checkout: {
      sessions: {
        retrieve: retrieveCheckoutSession,
      },
    },
  }),
}))

describe('GET /api/support/stripe/session', () => {
  beforeEach(() => {
    retrieveCheckoutSession.mockReset()
  })

  it(
    'returns only the minimal session state',
    async () => {
      retrieveCheckoutSession.mockResolvedValue({
        id: 'cs_test_123',
        status: 'complete',
        payment_status: 'paid',
        metadata: {
          kind: 'subscription',
        },
        customer_details: {
          email: 'apoio@vivenciasazuis.com.br',
        },
      })

      const { GET } = await import('./route')
      const response = await GET(
        new Request(
          'http://localhost/api/support/stripe/session?session_id=cs_test_123',
        ),
      )

      expect(response.status).toBe(200)
      await expect(response.json()).resolves.toEqual({
        id: 'cs_test_123',
        status: 'complete',
        paymentStatus: 'paid',
      })
    },
    15000,
  )

  it('returns 400 when session_id is missing', async () => {
    const { GET } = await import('./route')
    const response = await GET(
      new Request('http://localhost/api/support/stripe/session'),
    )

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({
      message: 'session_id é obrigatório.',
    })
    expect(retrieveCheckoutSession).not.toHaveBeenCalled()
  })

  it('returns 404 for a non-support session', async () => {
    retrieveCheckoutSession.mockResolvedValue({
      id: 'cs_test_123',
      status: 'complete',
      payment_status: 'paid',
      metadata: {
        kind: 'ebook',
      },
    })

    const { GET } = await import('./route')
    const response = await GET(
      new Request(
        'http://localhost/api/support/stripe/session?session_id=cs_test_123',
      ),
    )

    expect(response.status).toBe(404)
    await expect(response.json()).resolves.toEqual({
      message: 'Sessão não encontrada.',
    })
  })

  it('returns 502 when Stripe session lookup fails', async () => {
    retrieveCheckoutSession.mockRejectedValue(new Error('stripe down'))

    const { GET } = await import('./route')
    const response = await GET(
      new Request(
        'http://localhost/api/support/stripe/session?session_id=cs_test_123',
      ),
    )

    expect(response.status).toBe(502)
    await expect(response.json()).resolves.toEqual({
      message: 'Não foi possível verificar o pagamento.',
    })
  })
})
