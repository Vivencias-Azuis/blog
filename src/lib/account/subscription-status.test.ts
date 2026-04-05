import { describe, expect, it } from 'vitest'
import {
  isMemberFromSubscriptionStatus,
  readPublicSubscriptionMetadata,
  readSubscriptionMetadata,
} from '@/lib/account/subscription-status'

describe('isMemberFromSubscriptionStatus', () => {
  it('returns true for active subscriptions', () => {
    expect(isMemberFromSubscriptionStatus('active')).toBe(true)
  })

  it('returns false for canceled subscriptions', () => {
    expect(isMemberFromSubscriptionStatus('canceled')).toBe(false)
  })
})

describe('readSubscriptionMetadata', () => {
  it('extracts the normalized account billing state', () => {
    expect(
      readSubscriptionMetadata({
        publicMetadata: {
          isMember: true,
          supportTier: 'fortalecer',
        },
        privateMetadata: {
          stripeCustomerId: 'cus_123',
          stripeSubscriptionId: 'sub_123',
          subscriptionStatus: 'active',
        },
      }),
    ).toEqual({
      isMember: true,
      stripeCustomerId: 'cus_123',
      stripeSubscriptionId: 'sub_123',
      supportTier: 'fortalecer',
      subscriptionStatus: 'active',
    })
  })

  it('uses subscription status as authoritative over legacy booleans', () => {
    expect(
      readSubscriptionMetadata({
        publicMetadata: {
          isMember: true,
        },
        privateMetadata: {
          subscriptionStatus: 'canceled',
        },
      }),
    ).toEqual({
      isMember: false,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      supportTier: null,
      subscriptionStatus: 'canceled',
    })
  })
})

describe('readPublicSubscriptionMetadata', () => {
  it('returns only the public access state', () => {
    expect(
      readPublicSubscriptionMetadata({
        isMember: true,
        stripeCustomerId: 'cus_123',
        subscriptionStatus: 'active',
      }),
    ).toEqual({
      isMember: true,
    })
  })
})
