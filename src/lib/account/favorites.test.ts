import { currentUser } from '@clerk/nextjs/server'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import {
  getCurrentMemberAccess,
  isMemberFromMetadata,
} from '@/lib/account/member-access'

vi.mock('@clerk/nextjs/server', () => ({
  currentUser: vi.fn(),
}))

const currentUserMock = vi.mocked(currentUser)
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../')
const migrationDir = path.join(repoRoot, 'drizzle')

function createTempDb() {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'va-favorites-'))
  return {
    dir,
    dbPath: path.join(dir, 'favorites.sqlite'),
    dbUrl: `file:${path.join(dir, 'favorites.sqlite')}`,
  }
}

function applySqliteMigration(dbPath: string, migrationFile: string) {
  execFileSync('sqlite3', [dbPath], {
    input: readFileSync(path.join(migrationDir, migrationFile), 'utf8'),
  })
}

function prepareFreshDb() {
  const tempDb = createTempDb()

  applySqliteMigration(tempDb.dbPath, '0000_colorful_slayback.sql')
  applySqliteMigration(tempDb.dbPath, '0001_condemned_squirrel_girl.sql')

  return tempDb
}

async function loadFavoritesRuntime(dbUrl: string) {
  process.env.DATABASE_URL = dbUrl
  delete process.env.TURSO_AUTH_TOKEN
  vi.resetModules()

  const favorites = await import('@/lib/account/favorites')
  const { getDb } = await import('@/db/client')
  const { userFavorites } = await import('@/db/schema')

  return {
    ...favorites,
    getDb,
    userFavorites,
  }
}

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
  it('sorts favorites by most recent first', async () => {
    const { normalizeFavoriteRows } = await import('@/lib/account/favorites')

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

describe('favorites persistence', () => {
  afterEach(() => {
    vi.useRealTimers()
    delete process.env.DATABASE_URL
    delete process.env.TURSO_AUTH_TOKEN
    vi.resetModules()
  })

  it('addFavorite inserts row', async () => {
    const tempDb = prepareFreshDb()
    const { addFavorite, getDb, userFavorites } = await loadFavoritesRuntime(
      tempDb.dbUrl,
    )

    await addFavorite('user_123', 'post-a')

    const rows = await getDb().select().from(userFavorites)

    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({
      clerkUserId: 'user_123',
      postSlug: 'post-a',
    })
  })

  it('duplicate addFavorite is ignored by unique index', async () => {
    const tempDb = prepareFreshDb()
    const { addFavorite, getDb, userFavorites } = await loadFavoritesRuntime(
      tempDb.dbUrl,
    )

    await addFavorite('user_123', 'post-a')
    await addFavorite('user_123', 'post-a')

    const rows = await getDb().select().from(userFavorites)

    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({
      clerkUserId: 'user_123',
      postSlug: 'post-a',
    })
  })

  it('listFavoriteSlugs returns newest-first for one user', async () => {
    const tempDb = prepareFreshDb()
    const { addFavorite, listFavoriteSlugs } = await loadFavoritesRuntime(
      tempDb.dbUrl,
    )

    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-01T10:00:00.000Z'))
    await addFavorite('user_123', 'older')
    vi.setSystemTime(new Date('2026-04-02T10:00:00.000Z'))
    await addFavorite('user_123', 'newer')

    await expect(listFavoriteSlugs('user_123')).resolves.toEqual([
      { postSlug: 'newer', createdAt: '2026-04-02T10:00:00.000Z' },
      { postSlug: 'older', createdAt: '2026-04-01T10:00:00.000Z' },
    ])
  })

  it('removeFavorite only removes targeted clerkUserId and postSlug', async () => {
    const tempDb = prepareFreshDb()
    const { addFavorite, removeFavorite, getDb, userFavorites } =
      await loadFavoritesRuntime(tempDb.dbUrl)

    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-01T10:00:00.000Z'))
    await addFavorite('user_123', 'post-a')
    vi.setSystemTime(new Date('2026-04-02T10:00:00.000Z'))
    await addFavorite('user_123', 'post-b')
    vi.setSystemTime(new Date('2026-04-03T10:00:00.000Z'))
    await addFavorite('user_999', 'post-a')

    await removeFavorite('user_123', 'post-a')

    const rows = await getDb()
      .select()
      .from(userFavorites)
      .orderBy(userFavorites.clerkUserId, userFavorites.postSlug)

    expect(rows).toEqual([
      expect.objectContaining({
        clerkUserId: 'user_123',
        postSlug: 'post-b',
      }),
      expect.objectContaining({
        clerkUserId: 'user_999',
        postSlug: 'post-a',
      }),
    ])
  })
})
