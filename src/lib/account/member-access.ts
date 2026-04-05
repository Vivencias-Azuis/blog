import { currentUser } from '@clerk/nextjs/server'
import {
  readPublicSubscriptionMetadata,
} from '@/lib/account/subscription-status'

export function isMemberFromMetadata(
  metadata: Record<string, unknown> | null | undefined,
) {
  return readPublicSubscriptionMetadata(metadata).isMember
}

export async function getCurrentMemberAccess() {
  const user = await currentUser()
  return readPublicSubscriptionMetadata(
    user?.publicMetadata as Record<string, unknown> | undefined,
  )
}
