import { clerkClient } from '@clerk/nextjs/server'
import type Stripe from 'stripe'
import { isMemberFromSubscriptionStatus } from '@/lib/account/subscription-status'
import type { SupportTierSlug } from '@/lib/support/config'

interface ClerkSubscriptionMetadataInput {
  stripeCustomerId?: string | null
  stripeSubscriptionId?: string | null
  subscriptionStatus: string | null
  tierSlug: SupportTierSlug | null
}

export function buildClerkSubscriptionPublicMetadata({
  subscriptionStatus,
  tierSlug,
}: Pick<ClerkSubscriptionMetadataInput, 'subscriptionStatus' | 'tierSlug'>) {
  return {
    isMember: isMemberFromSubscriptionStatus(subscriptionStatus),
    supportTier: tierSlug,
  }
}

export function buildClerkSubscriptionPrivateMetadata({
  stripeCustomerId = null,
  stripeSubscriptionId = null,
  subscriptionStatus,
  tierSlug,
}: ClerkSubscriptionMetadataInput) {
  return {
    stripeCustomerId,
    stripeSubscriptionId,
    subscriptionStatus,
    supportTier: tierSlug,
  }
}

export async function updateClerkMembershipMetadata({
  clerkUserId,
  stripeCustomerId,
  stripeSubscriptionId,
  subscriptionStatus,
  tierSlug,
}: ClerkSubscriptionMetadataInput & { clerkUserId: string }) {
  const client = await clerkClient()

  await client.users.updateUserMetadata(clerkUserId, {
    publicMetadata: buildClerkSubscriptionPublicMetadata({
      subscriptionStatus,
      tierSlug,
    }),
    privateMetadata: buildClerkSubscriptionPrivateMetadata({
      stripeCustomerId,
      stripeSubscriptionId,
      subscriptionStatus,
      tierSlug,
    }),
  })
}

export function getClerkUserIdFromStripeObject(
  object:
    | Pick<Stripe.Checkout.Session, 'metadata' | 'client_reference_id'>
    | Pick<Stripe.Subscription, 'metadata'>,
) {
  if ('metadata' in object && typeof object.metadata?.clerkUserId === 'string') {
    return object.metadata.clerkUserId
  }

  if (
    'client_reference_id' in object &&
    typeof object.client_reference_id === 'string'
  ) {
    return object.client_reference_id
  }

  return null
}
