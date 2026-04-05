import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const getSupportStripeEnv = vi.hoisted(() => vi.fn())
const stripeConstructor = vi.hoisted(() => vi.fn())

vi.mock('@/lib/support/config', () => ({
  getSupportStripeEnv,
}))

vi.mock('stripe', () => ({
  default: stripeConstructor,
}))

describe('stripe support client', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  beforeEach(() => {
    vi.clearAllMocks()
    getSupportStripeEnv.mockReturnValue({
      STRIPE_SECRET_KEY: 'sk_test_123',
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
      STRIPE_PRICE_ID_APOIAR: 'price_apoiar',
      STRIPE_PRICE_ID_FORTALECER: 'price_fortalecer',
      STRIPE_PRICE_ID_SUSTENTAR: 'price_sustentar',
    })
  })

  it('creates a singleton client with an explicit apiVersion', async () => {
    const { getStripeClient } = await import('./stripe')

    const clientA = getStripeClient()
    const clientB = getStripeClient()

    expect(clientA).toBe(clientB)
    expect(stripeConstructor).toHaveBeenCalledTimes(1)
    expect(stripeConstructor).toHaveBeenCalledWith('sk_test_123', {
      apiVersion: '2025-08-27.basil',
    })
  })
})
