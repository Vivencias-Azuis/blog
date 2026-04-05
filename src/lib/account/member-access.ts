import { currentUser } from '@clerk/nextjs/server'
import { readSubscriptionMetadata } from '@/lib/account/subscription-status'

export function isMemberFromMetadata(
  metadata: Record<string, unknown> | null | undefined,
) {
  return readSubscriptionMetadata(metadata).isMember
}

export async function getCurrentMemberAccess() {
  const user = await currentUser()
  return readSubscriptionMetadata(
    user?.publicMetadata as Record<string, unknown> | undefined,
  )
}
