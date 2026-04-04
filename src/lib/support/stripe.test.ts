import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const getSupportEnv = vi.hoisted(() => vi.fn())
const stripeConstructor = vi.hoisted(() => vi.fn())

vi.mock('@/lib/support/config', () => ({
  getSupportEnv,
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
    getSupportEnv.mockReturnValue({
      STRIPE_SECRET_KEY: 'sk_test_123',
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
