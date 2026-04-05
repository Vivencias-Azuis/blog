import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { requireUser } from '@/lib/auth/auth'

vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(),
  currentUser: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

const authMock = vi.mocked(auth)
const currentUserMock = vi.mocked(currentUser)
const redirectMock = vi.mocked(redirect)

describe('requireUser', () => {
  beforeEach(() => {
    authMock.mockReset()
    currentUserMock.mockReset()
    redirectMock.mockReset()
    redirectMock.mockImplementation(() => {
      throw new Error('NEXT_REDIRECT')
    })
  })

  it('redirects unauthenticated users to sign in', async () => {
    authMock.mockResolvedValue({
      userId: null,
    } as Awaited<ReturnType<typeof auth>>)

    await expect(requireUser()).rejects.toThrow('NEXT_REDIRECT')

    expect(redirectMock).toHaveBeenCalledWith('/sign-in')
    expect(currentUserMock).not.toHaveBeenCalled()
  })

  it('redirects authenticated users when currentUser returns null', async () => {
    authMock.mockResolvedValue({
      userId: 'user_123',
    } as Awaited<ReturnType<typeof auth>>)
    currentUserMock.mockResolvedValue(null)

    await expect(requireUser()).rejects.toThrow('NEXT_REDIRECT')

    expect(redirectMock).toHaveBeenCalledWith('/sign-in')
  })

  it('returns the user id and current user for authenticated users', async () => {
    authMock.mockResolvedValue({
      userId: 'user_123',
    } as Awaited<ReturnType<typeof auth>>)
    currentUserMock.mockResolvedValue({
      id: 'user_123',
    } as Awaited<ReturnType<typeof currentUser>>)

    await expect(requireUser()).resolves.toEqual({
      userId: 'user_123',
      user: {
        id: 'user_123',
      },
    })

    expect(redirectMock).not.toHaveBeenCalled()
  })
})
