import type { Metadata } from 'next'

import AccountShell from '@/components/account/AccountShell'
import FavoritesList from '@/components/account/FavoritesList'
import { listFavoriteSlugs } from '@/lib/account/favorites'
import { requireUser } from '@/lib/auth/auth'
import { generatePageMetadata } from '@/lib/metadata'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = generatePageMetadata({
  title: 'Favoritos',
  description: 'Posts salvos para revisitar na sua area.',
  path: '/minha-area/favoritos',
  keywords: ['favoritos', 'posts salvos', 'minha area'],
})

export default async function FavoritosPage() {
  const { userId } = await requireUser()
  const items = await listFavoriteSlugs(userId)
  const postsBySlug = new Map(getAllPosts().map((post) => [post.slug, post]))
  const posts = items
    .map((item) => postsBySlug.get(item.postSlug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post))

  return (
    <AccountShell
      title="Favoritos"
      description="Seus posts salvos ficam aqui para voce retomar quando quiser."
    >
      <FavoritesList posts={posts} />
    </AccountShell>
  )
}
