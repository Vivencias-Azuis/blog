import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { addFavorite, listFavoriteSlugs } from '@/lib/account/favorites'

const payloadSchema = z.object({
  postSlug: z.string().min(1),
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

  const payload = payloadSchema.parse(await request.json())
  await addFavorite(userId, payload.postSlug)

  return NextResponse.json({ ok: true }, { status: 201 })
}
