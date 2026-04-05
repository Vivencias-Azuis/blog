type SupportTier = 'apoiar' | 'fortalecer' | 'sustentar' | null

type MetadataRecord = Record<string, unknown> | null | undefined

export interface SubscriptionMetadataInput {
  publicMetadata?: MetadataRecord
  privateMetadata?: MetadataRecord
}

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

export interface AccountMemberAccess {
  isMember: boolean
}

function readString(value: unknown) {
  return typeof value === 'string' ? value : null
}

function readBoolean(value: unknown) {
  return value === true
}

function readSupportTier(metadata: MetadataRecord): SupportTier {
  const supportTier = metadata?.supportTier

  return supportTier === 'apoiar' ||
    supportTier === 'fortalecer' ||
    supportTier === 'sustentar'
    ? supportTier
    : null
}

function normalizeSubscriptionMetadata(
  publicMetadata: MetadataRecord,
  privateMetadata: MetadataRecord,
): AccountSubscriptionMetadata {
  const subscriptionStatus =
    readString(privateMetadata?.subscriptionStatus) ??
    readString(publicMetadata?.subscriptionStatus)

  const isMember = subscriptionStatus
    ? isMemberFromSubscriptionStatus(subscriptionStatus)
    : readBoolean(privateMetadata?.isMember) || readBoolean(publicMetadata?.isMember)

  return {
    isMember,
    stripeCustomerId: readString(privateMetadata?.stripeCustomerId),
    stripeSubscriptionId: readString(privateMetadata?.stripeSubscriptionId),
    supportTier: readSupportTier(privateMetadata) ?? readSupportTier(publicMetadata),
    subscriptionStatus,
  }
}

export function readSubscriptionMetadata(
  input: SubscriptionMetadataInput,
): AccountSubscriptionMetadata {
  return normalizeSubscriptionMetadata(
    input.publicMetadata,
    input.privateMetadata,
  )
}

export function readPublicSubscriptionMetadata(
  metadata: MetadataRecord,
): AccountMemberAccess {
  return {
    isMember: readBoolean(metadata?.isMember),
  }
}
