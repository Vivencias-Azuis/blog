import { currentUser } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  addFavorite,
  listFavoriteSlugs,
  normalizeFavoriteRows,
  removeFavorite,
} from '@/lib/account/favorites'
import { getDb } from '@/db/client'
import { userFavorites } from '@/db/schema'
import {
  getCurrentMemberAccess,
  isMemberFromMetadata,
} from '@/lib/account/member-access'

vi.mock('@clerk/nextjs/server', () => ({
  currentUser: vi.fn(),
}))

vi.mock('@/db/client', () => ({
  getDb: vi.fn(),
}))

vi.mock('drizzle-orm', async (importOriginal) => {
  const actual = await importOriginal<typeof import('drizzle-orm')>()

  return {
    ...actual,
    and: vi.fn((...args) => ({ kind: 'and', args })),
    eq: vi.fn((...args) => ({ kind: 'eq', args })),
  }
})

const currentUserMock = vi.mocked(currentUser)
const getDbMock = vi.mocked(getDb)
const andMock = vi.mocked(and)
const eqMock = vi.mocked(eq)

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

describe('normalizeFavoriteRows', () => {
  it('sorts favorites by most recent first', () => {
    const rows = [
      { postSlug: 'older', createdAt: '2026-04-01T10:00:00.000Z' },
      { postSlug: 'newer', createdAt: '2026-04-02T10:00:00.000Z' },
    ]

    expect(normalizeFavoriteRows(rows).map((row) => row.postSlug)).toEqual([
      'newer',
      'older',
    ])
  })
})

describe('favorites persistence helpers', () => {
  beforeEach(() => {
    getDbMock.mockReset()
    andMock.mockClear()
    eqMock.mockClear()
  })

  it('addFavorite ignores duplicates by using onConflictDoNothing', async () => {
    const onConflictDoNothing = vi.fn()
    const values = vi.fn(() => ({ onConflictDoNothing }))
    const insert = vi.fn(() => ({ values }))
    const db = { insert }

    getDbMock.mockReturnValue(db as ReturnType<typeof getDb>)

    await addFavorite('user_123', 'post-a')

    expect(insert).toHaveBeenCalledWith(userFavorites)
    expect(values).toHaveBeenCalledWith({
      clerkUserId: 'user_123',
      postSlug: 'post-a',
      createdAt: expect.any(String),
    })
    expect(onConflictDoNothing).toHaveBeenCalledTimes(1)
  })

  it('listFavoriteSlugs returns newest-first for one user', async () => {
    const rows = [
      { postSlug: 'older', createdAt: '2026-04-01T10:00:00.000Z' },
      { postSlug: 'newer', createdAt: '2026-04-02T10:00:00.000Z' },
    ]
    const orderBy = vi.fn(async () => rows)
    const where = vi.fn(() => ({ orderBy }))
    const from = vi.fn(() => ({ where }))
    const select = vi.fn(() => ({ from }))
    const db = { select }

    getDbMock.mockReturnValue(db as ReturnType<typeof getDb>)

    await expect(listFavoriteSlugs('user_123')).resolves.toEqual([
      { postSlug: 'newer', createdAt: '2026-04-02T10:00:00.000Z' },
      { postSlug: 'older', createdAt: '2026-04-01T10:00:00.000Z' },
    ])

    expect(select).toHaveBeenCalledWith({
      postSlug: userFavorites.postSlug,
      createdAt: userFavorites.createdAt,
    })
    expect(from).toHaveBeenCalledWith(userFavorites)
    expect(where).toHaveBeenCalledWith({ kind: 'eq', args: [userFavorites.clerkUserId, 'user_123'] })
    expect(orderBy).toHaveBeenCalledTimes(1)
  })

  it('removeFavorite scopes deletion to clerkUserId and postSlug', async () => {
    const where = vi.fn()
    const del = vi.fn(() => ({ where }))
    const db = { delete: del }

    getDbMock.mockReturnValue(db as ReturnType<typeof getDb>)

    await removeFavorite('user_123', 'post-a')

    expect(del).toHaveBeenCalledWith(userFavorites)
    expect(eqMock).toHaveBeenNthCalledWith(1, userFavorites.clerkUserId, 'user_123')
    expect(eqMock).toHaveBeenNthCalledWith(2, userFavorites.postSlug, 'post-a')
    expect(andMock).toHaveBeenCalledWith(
      { kind: 'eq', args: [userFavorites.clerkUserId, 'user_123'] },
      { kind: 'eq', args: [userFavorites.postSlug, 'post-a'] },
    )
    expect(where).toHaveBeenCalledWith({
      kind: 'and',
      args: [
        { kind: 'eq', args: [userFavorites.clerkUserId, 'user_123'] },
        { kind: 'eq', args: [userFavorites.postSlug, 'post-a'] },
      ],
    })
  })
})
