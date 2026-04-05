import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import {
  addFavorite,
  canonicalizeFavoriteItems,
  listFavoriteSlugs,
} from '@/lib/account/favorites'
import { favoriteSlugSchema } from '@/lib/account/favorite-slug'
import { getCanonicalPostSlug } from '@/lib/canonical-posts'
import { getPostBySlug, normalizeSlug } from '@/lib/posts'

const payloadSchema = z.object({
  postSlug: favoriteSlugSchema,
})

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const items = canonicalizeFavoriteItems(await listFavoriteSlugs(userId))

  return NextResponse.json(items)
}

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed JSON' }, { status: 400 })
  }

  const payload = payloadSchema.safeParse(body)

  if (!payload.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: payload.error.flatten() },
      { status: 422 },
    )
  }

  const normalizedSlug = normalizeSlug(payload.data.postSlug)
  const canonicalSlug = getCanonicalPostSlug(normalizedSlug) ?? normalizedSlug
  const post = getPostBySlug(canonicalSlug)

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  await addFavorite(userId, post.slug)

  return NextResponse.json({ ok: true }, { status: 201 })
}
