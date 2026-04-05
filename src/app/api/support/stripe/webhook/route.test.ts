import { beforeEach, describe, expect, it, vi } from 'vitest'

const constructEventMock = vi.fn()
const updateClerkMembershipMetadataMock = vi.fn()

vi.mock('@/lib/support/stripe', () => ({
  getStripeClient: () => ({
    webhooks: {
      constructEvent: constructEventMock,
    },
  }),
}))

vi.mock('@/lib/support/stripe-webhook', async () => {
  const actual = await vi.importActual<typeof import('@/lib/support/stripe-webhook')>(
    '@/lib/support/stripe-webhook',
  )

  return {
    ...actual,
    updateClerkMembershipMetadata: updateClerkMembershipMetadataMock,
  }
})

describe('POST /api/support/stripe/webhook', () => {
  beforeEach(() => {
    constructEventMock.mockReset()
    updateClerkMembershipMetadataMock.mockReset()
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_123'
  })

  it('syncs membership for checkout.session.completed subscription events', async () => {
    constructEventMock.mockReturnValue({
      type: 'checkout.session.completed',
      data: {
        object: {
          mode: 'subscription',
          customer: 'cus_123',
          subscription: 'sub_123',
          metadata: {
            clerkUserId: 'user_123',
            tierSlug: 'fortalecer',
          },
        },
      },
    })

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/stripe/webhook', {
        method: 'POST',
        body: JSON.stringify({ type: 'checkout.session.completed' }),
        headers: {
          'Content-Type': 'application/json',
          'stripe-signature': 't=1,v1=signature',
        },
      }),
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ received: true })
    expect(updateClerkMembershipMetadataMock).toHaveBeenCalledWith({
      clerkUserId: 'user_123',
      stripeCustomerId: 'cus_123',
      stripeSubscriptionId: 'sub_123',
      subscriptionStatus: 'active',
      tierSlug: 'fortalecer',
    })
  })

  it('syncs membership for recurring subscription updates', async () => {
    constructEventMock.mockReturnValue({
      type: 'customer.subscription.updated',
      data: {
        object: {
          id: 'sub_123',
          status: 'active',
          customer: 'cus_123',
          metadata: {
            clerkUserId: 'user_123',
            tierSlug: 'sustentar',
          },
        },
      },
    })

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/stripe/webhook', {
        method: 'POST',
        body: JSON.stringify({ type: 'customer.subscription.updated' }),
        headers: {
          'Content-Type': 'application/json',
          'stripe-signature': 't=1,v1=signature',
        },
      }),
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ received: true })
    expect(updateClerkMembershipMetadataMock).toHaveBeenCalledWith({
      clerkUserId: 'user_123',
      stripeCustomerId: 'cus_123',
      stripeSubscriptionId: 'sub_123',
      subscriptionStatus: 'active',
      tierSlug: 'sustentar',
    })
  })

  it('rejects invalid signatures and does not sync', async () => {
    constructEventMock.mockImplementation(() => {
      throw new Error('invalid signature')
    })

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/stripe/webhook', {
        method: 'POST',
        body: JSON.stringify({ type: 'checkout.session.completed' }),
        headers: {
          'Content-Type': 'application/json',
          'stripe-signature': 't=1,v1=bad-signature',
        },
      }),
    )

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({
      message: 'Assinatura inválida.',
    })
    expect(updateClerkMembershipMetadataMock).not.toHaveBeenCalled()
  })

  it('ignores irrelevant events after signature verification', async () => {
    constructEventMock.mockReturnValue({
      type: 'invoice.paid',
      data: {
        object: {},
      },
    })

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/support/stripe/webhook', {
        method: 'POST',
        body: JSON.stringify({ type: 'invoice.paid' }),
        headers: {
          'Content-Type': 'application/json',
          'stripe-signature': 't=1,v1=signature',
        },
      }),
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ received: true })
    expect(updateClerkMembershipMetadataMock).not.toHaveBeenCalled()
  })
})
