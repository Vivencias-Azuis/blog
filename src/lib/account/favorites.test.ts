import { currentUser } from '@clerk/nextjs/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getCurrentMemberAccess,
  isMemberFromMetadata,
} from '@/lib/account/member-access'

vi.mock('@clerk/nextjs/server', () => ({
  currentUser: vi.fn(),
}))

const currentUserMock = vi.mocked(currentUser)

describe('isMemberFromMetadata', () => {
  it('returns true when public metadata marks the user as member', () => {
    expect(isMemberFromMetadata({ isMember: true })).toBe(true)
  })

  it('returns false for missing metadata', () => {
    expect(isMemberFromMetadata(undefined)).toBe(false)
  })
})

describe('getCurrentMemberAccess', () => {
  beforeEach(() => {
    currentUserMock.mockReset()
  })

  it('returns member access when the current user metadata marks the user as member', async () => {
    currentUserMock.mockResolvedValue({
      publicMetadata: {
        isMember: true,
      },
    } as Awaited<ReturnType<typeof currentUser>>)

    await expect(getCurrentMemberAccess()).resolves.toEqual({
      isMember: true,
    })
  })

  it('returns false when there is no current user', async () => {
    currentUserMock.mockResolvedValue(null)

    await expect(getCurrentMemberAccess()).resolves.toEqual({
      isMember: false,
    })
  })
})
