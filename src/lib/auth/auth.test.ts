import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { requireUser } from '@/lib/auth/auth'

vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

const authMock = vi.mocked(auth)
const redirectMock = vi.mocked(redirect)

describe('requireUser', () => {
  beforeEach(() => {
    authMock.mockReset()
    redirectMock.mockReset()
  })

  it('redirects unauthenticated users to sign in', async () => {
    authMock.mockResolvedValue({
      userId: null,
    } as Awaited<ReturnType<typeof auth>>)

    await requireUser()

    expect(redirectMock).toHaveBeenCalledWith('/sign-in')
  })

  it('returns the user id for authenticated users', async () => {
    authMock.mockResolvedValue({
      userId: 'user_123',
    } as Awaited<ReturnType<typeof auth>>)

    await expect(requireUser()).resolves.toEqual({
      userId: 'user_123',
    })

    expect(redirectMock).not.toHaveBeenCalled()
  })
})
