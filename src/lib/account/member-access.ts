import { currentUser } from '@clerk/nextjs/server'

export function isMemberFromMetadata(
  metadata: Record<string, unknown> | null | undefined,
) {
  return metadata?.['isMember'] === true
}

export async function getCurrentMemberAccess() {
  const user = await currentUser()

  return {
    isMember: isMemberFromMetadata(
      user?.publicMetadata as Record<string, unknown> | undefined,
    ),
  }
}
