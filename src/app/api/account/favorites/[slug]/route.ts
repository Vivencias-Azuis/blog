import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import { removeFavorite } from '@/lib/account/favorites'

interface RouteContext {
  params: Promise<{ slug: string }>
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  await removeFavorite(userId, slug)

  return NextResponse.json({ ok: true })
}
