type SupportTier = 'apoiar' | 'fortalecer' | 'sustentar' | null

export interface AccountSubscriptionMetadata {
  isMember: boolean
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  supportTier: SupportTier
  subscriptionStatus: string | null
}

export function isMemberFromSubscriptionStatus(
  status: string | null | undefined,
) {
  return status === 'active'
}

export function readSubscriptionMetadata(
  metadata: Record<string, unknown> | null | undefined,
): AccountSubscriptionMetadata {
  const subscriptionStatus =
    typeof metadata?.subscriptionStatus === 'string'
      ? metadata.subscriptionStatus
      : null

  return {
    isMember:
      metadata?.isMember === true ||
      isMemberFromSubscriptionStatus(subscriptionStatus),
    stripeCustomerId:
      typeof metadata?.stripeCustomerId === 'string'
        ? metadata.stripeCustomerId
        : null,
    stripeSubscriptionId:
      typeof metadata?.stripeSubscriptionId === 'string'
        ? metadata.stripeSubscriptionId
        : null,
    supportTier:
      metadata?.supportTier === 'apoiar' ||
      metadata?.supportTier === 'fortalecer' ||
      metadata?.supportTier === 'sustentar'
        ? metadata.supportTier
        : null,
    subscriptionStatus,
  }
}
