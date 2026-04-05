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
  const staleCount = items.length - posts.length

  return (
    <AccountShell
      title="Favoritos"
      description="Seus posts salvos ficam aqui para voce retomar quando quiser."
    >
      <div className="space-y-4">
        {staleCount > 0 ? (
          <div className="rounded-block border border-sand-200 bg-sand-100 p-4 text-sm text-sand-700 shadow-card">
            {staleCount === 1
              ? '1 favorito antigo nao aparece mais porque o post nao esta disponivel.'
              : `${staleCount} favoritos antigos nao aparecem mais porque esses posts nao estao disponiveis.`}
          </div>
        ) : null}
        <FavoritesList posts={posts} />
      </div>
    </AccountShell>
  )
}
