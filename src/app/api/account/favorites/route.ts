import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { addFavorite, listFavoriteSlugs } from '@/lib/account/favorites'
import { favoriteSlugSchema } from '@/lib/account/favorite-slug'

const payloadSchema = z.object({
  postSlug: favoriteSlugSchema,
})

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const items = await listFavoriteSlugs(userId)

  return NextResponse.json({ items })
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

  await addFavorite(userId, payload.data.postSlug)

  return NextResponse.json({ ok: true }, { status: 201 })
}
