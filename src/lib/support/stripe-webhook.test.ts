import { describe, expect, it, vi } from 'vitest'

const { updateUserMetadataMock, clerkClientMock } = vi.hoisted(() => {
  const updateUserMetadataMock = vi.fn()
  const clerkClientMock = vi.fn(async () => ({
    users: {
      updateUserMetadata: updateUserMetadataMock,
    },
  }))

  return {
    updateUserMetadataMock,
    clerkClientMock,
  }
})

vi.mock('@clerk/nextjs/server', () => ({
  clerkClient: clerkClientMock,
}))

import {
  buildClerkSubscriptionPrivateMetadata,
  buildClerkSubscriptionPublicMetadata,
  getClerkUserIdFromStripeObject,
  updateClerkMembershipMetadata,
} from '@/lib/support/stripe-webhook'

describe('buildClerkSubscriptionPublicMetadata', () => {
  it('builds sanitized public membership fields from an active subscription', () => {
    expect(
      buildClerkSubscriptionPublicMetadata({
        subscriptionStatus: 'active',
        tierSlug: 'sustentar',
      }),
    ).toEqual({
      isMember: true,
      supportTier: 'sustentar',
    })
  })

  it('revokes public member access for canceled subscriptions', () => {
    expect(
      buildClerkSubscriptionPublicMetadata({
        subscriptionStatus: 'canceled',
        tierSlug: 'apoiar',
      }),
    ).toEqual({
      isMember: false,
      supportTier: 'apoiar',
    })
  })
})

describe('buildClerkSubscriptionPrivateMetadata', () => {
  it('builds private billing fields from Stripe identifiers and status', () => {
    expect(
      buildClerkSubscriptionPrivateMetadata({
        stripeCustomerId: 'cus_123',
        stripeSubscriptionId: 'sub_123',
        subscriptionStatus: 'active',
        tierSlug: 'fortalecer',
      }),
    ).toEqual({
      stripeCustomerId: 'cus_123',
      stripeSubscriptionId: 'sub_123',
      subscriptionStatus: 'active',
      supportTier: 'fortalecer',
    })
  })
})

describe('getClerkUserIdFromStripeObject', () => {
  it('prefers metadata clerkUserId from a checkout session', () => {
    expect(
      getClerkUserIdFromStripeObject({
        metadata: { clerkUserId: 'user_meta' },
        client_reference_id: 'user_ref',
      }),
    ).toBe('user_meta')
  })

  it('falls back to client_reference_id when metadata is absent', () => {
    expect(
      getClerkUserIdFromStripeObject({
        metadata: {},
        client_reference_id: 'user_ref',
      }),
    ).toBe('user_ref')
  })

  it('reads clerkUserId from a subscription metadata object', () => {
    expect(
      getClerkUserIdFromStripeObject({
        metadata: { clerkUserId: 'user_sub' },
      }),
    ).toBe('user_sub')
  })

  it('returns null when clerkUserId cannot be derived', () => {
    expect(
      getClerkUserIdFromStripeObject({
        metadata: {},
      }),
    ).toBeNull()
  })
})

describe('updateClerkMembershipMetadata', () => {
  it('updates public and private metadata separately', async () => {
    await updateClerkMembershipMetadata({
      clerkUserId: 'user_123',
      stripeCustomerId: 'cus_123',
      stripeSubscriptionId: 'sub_123',
      subscriptionStatus: 'active',
      tierSlug: 'fortalecer',
    })

    expect(clerkClientMock).toHaveBeenCalledTimes(1)
    expect(updateUserMetadataMock).toHaveBeenCalledWith('user_123', {
      publicMetadata: {
        isMember: true,
        supportTier: 'fortalecer',
      },
      privateMetadata: {
        stripeCustomerId: 'cus_123',
        stripeSubscriptionId: 'sub_123',
        subscriptionStatus: 'active',
        supportTier: 'fortalecer',
      },
    })
  })
})
