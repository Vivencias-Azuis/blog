import { auth } from '@clerk/nextjs/server'

import { listFavoriteSlugs, resolveFavoritePostSlugs } from '@/lib/account/favorites'
import Link from 'next/link'
import { getFeaturedPosts } from '@/lib/posts'
import EditorialPostRow from './EditorialPostRow'

export default async function FeaturedPosts() {
  const featuredPosts = getFeaturedPosts()
  const { userId } = await auth()
  const favoriteItems = userId ? await listFavoriteSlugs(userId) : []
  const favoriteSlugs = new Set(resolveFavoritePostSlugs(favoriteItems).canonicalSlugs)

  if (featuredPosts.length === 0) {
    return (
      <section className="border-b border-rule bg-paper">
        <div className="container-custom py-16 md:py-20">
          <div className="border-b border-ink/15 pb-6">
            <p className="eyebrow">Seleção editorial</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">Por onde começar</h2>
          </div>
          <p className="mt-8 max-w-[52ch] font-serif text-lg leading-relaxed text-ink-soft">
            Os primeiros guias estão em preparação. Enquanto isso, o índice completo
            do blog já está disponível.
          </p>
          <Link href="/blog" className="btn-line mt-8">
            Ver o índice do blog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="border-b border-rule bg-paper">
      <div className="container-custom py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-ink/15 pb-6">
          <div>
            <p className="eyebrow">Seleção editorial</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">Por onde começar</h2>
          </div>
          <Link href="/blog" className="link-rule">
            Ver todos os guias
          </Link>
        </div>

        <div>
          {featuredPosts.map((post, index) => (
            <EditorialPostRow
              key={post.slug}
              post={post}
              position={index}
              initialFavorited={favoriteSlugs.has(post.slug)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
