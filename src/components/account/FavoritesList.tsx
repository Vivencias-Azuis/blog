import Link from 'next/link'

import FavoriteToggleButton from '@/components/account/FavoriteToggleButton'
import type { PostMeta } from '@/lib/posts'

interface FavoritesListProps {
  posts: PostMeta[]
}

export default function FavoritesList({ posts }: FavoritesListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-block border border-dashed border-sand-300 bg-surface p-6 shadow-card">
        <p className="text-sand-700">Voce ainda nao salvou nenhum post.</p>
        <Link
          href="/blog"
          className="mt-4 inline-flex rounded-pill border border-sand-300 px-4 py-3 text-sm font-semibold text-sand-700 transition-colors hover:border-brand/50 hover:text-link"
        >
          Explorar o blog
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="rounded-card border border-sand-200 bg-surface p-5 shadow-card"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
                {post.category}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-sand-900">{post.title}</h2>
              <p className="mt-2 text-sand-700">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-sand-600">
                <span>{post.author}</span>
                <span>{post.readingTime}</span>
              </div>
            </div>

            <FavoriteToggleButton postSlug={post.slug} initialFavorited />
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="mt-4 inline-flex rounded-pill border border-sand-300 px-4 py-3 text-sm font-semibold text-sand-700 transition-colors hover:border-brand/50 hover:text-link"
          >
            Ler post
          </Link>
        </article>
      ))}
    </div>
  )
}
