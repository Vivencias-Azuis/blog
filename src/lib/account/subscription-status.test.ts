import { describe, expect, it } from 'vitest'
import {
  isMemberFromSubscriptionStatus,
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
        isMember: true,
        stripeCustomerId: 'cus_123',
        stripeSubscriptionId: 'sub_123',
        supportTier: 'fortalecer',
        subscriptionStatus: 'active',
      }),
    ).toEqual({
      isMember: true,
      stripeCustomerId: 'cus_123',
      stripeSubscriptionId: 'sub_123',
      supportTier: 'fortalecer',
      subscriptionStatus: 'active',
    })
  })
})
