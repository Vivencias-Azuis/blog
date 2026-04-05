import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import { removeFavorite } from '@/lib/account/favorites'
import { parseFavoriteSlug } from '@/lib/account/favorite-slug'

interface RouteContext {
  params: Promise<{ slug: string }>
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params

  const parsedSlug = parseFavoriteSlug(slug)

  if (!parsedSlug.success) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 422 })
  }

  await removeFavorite(userId, parsedSlug.data)

  return NextResponse.json({ ok: true })
}
