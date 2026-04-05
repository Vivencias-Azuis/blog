import { and, desc, eq } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { userFavorites } from '@/db/schema'
import { getCanonicalPostSlug } from '@/lib/canonical-posts'
import { getPostBySlug, normalizeSlug } from '@/lib/posts'

export function normalizeFavoriteRows<T extends { createdAt: string }>(rows: T[]) {
  return [...rows].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function resolveFavoritePostSlug(storedSlug: string) {
  const normalizedSlug = normalizeSlug(storedSlug)
  const canonicalSlug = getCanonicalPostSlug(normalizedSlug) ?? normalizedSlug
  const post = getPostBySlug(canonicalSlug)

  return post?.slug ?? null
}

export function resolveFavoritePostSlugs<T extends { postSlug: string }>(items: T[]) {
  const canonicalSlugs: string[] = []
  const seen = new Set<string>()
  let unresolvedCount = 0

  for (const item of items) {
    const resolvedSlug = resolveFavoritePostSlug(item.postSlug)

    if (!resolvedSlug) {
      unresolvedCount += 1
      continue
    }

    if (seen.has(resolvedSlug)) {
      continue
    }

    seen.add(resolvedSlug)
    canonicalSlugs.push(resolvedSlug)
  }

  return {
    canonicalSlugs,
    unresolvedCount,
  }
}

export async function listFavoriteSlugs(clerkUserId: string) {
  const db = getDb()

  const rows = await db
    .select({
      postSlug: userFavorites.postSlug,
      createdAt: userFavorites.createdAt,
    })
    .from(userFavorites)
    .where(eq(userFavorites.clerkUserId, clerkUserId))
    .orderBy(desc(userFavorites.createdAt))

  return normalizeFavoriteRows(rows)
}

export async function addFavorite(clerkUserId: string, postSlug: string) {
  const db = getDb()

  await db
    .insert(userFavorites)
    .values({
      clerkUserId,
      postSlug,
      createdAt: new Date().toISOString(),
    })
    .onConflictDoNothing()
}

export async function removeFavorite(clerkUserId: string, postSlug: string) {
  const db = getDb()

  await db
    .delete(userFavorites)
    .where(and(eq(userFavorites.clerkUserId, clerkUserId), eq(userFavorites.postSlug, postSlug)))
}
