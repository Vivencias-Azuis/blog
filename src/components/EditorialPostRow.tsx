import Link from 'next/link'

import FavoriteToggleButton from '@/components/account/FavoriteToggleButton'
import type { PostMeta } from '@/lib/posts'
import { formatReadingTime } from '@/lib/reading-time-label'

function formatPostDate(value: string) {
  if (!value) {
    return ''
  }

  return new Date(value).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

type EditorialPostRowProps = {
  post: PostMeta
  position: number
  initialFavorited?: boolean
  // Indice com dezenas de itens usa a variante compacta: sem resumo e com
  // respiro menor, para a lista continuar escaneavel em vez de virar um rolo.
  compact?: boolean
}

export default function EditorialPostRow({
  post,
  position,
  initialFavorited = false,
  compact = false,
}: EditorialPostRowProps) {
  const index = String(position + 1).padStart(2, '0')
  const formattedDate = formatPostDate(post.datetime || '')
  const readingLabel = formatReadingTime(post.readingTime || '')

  return (
    <article
      className={`relative grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-rule sm:grid-cols-[4rem_1fr] sm:gap-x-8 ${
        compact ? 'py-5' : 'py-8'
      }`}
    >
      <span aria-hidden="true" className="pt-1 font-display text-lg text-azul-mid sm:text-xl">
        {index}
      </span>

      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="eyebrow">{post.category}</span>
          {readingLabel ? (
            <>
              <span aria-hidden="true" className="h-3 w-px bg-rule-strong" />
              <span className="font-sans text-xs text-ink-mute">{readingLabel}</span>
            </>
          ) : null}
        </div>

        <h3
          className={`display mt-3 ${
            compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
          }`}
        >
          {/* Link esticado: mantem a linha inteira clicavel sem aninhar controles. */}
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        {compact ? null : (
          <p className="mt-3 max-w-[62ch] font-serif text-base leading-relaxed text-ink-soft">
            {post.excerpt}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p className="font-sans text-xs uppercase tracking-[0.14em] text-ink-mute">
            {post.author}
            {formattedDate ? ` · ${formattedDate}` : ''}
          </p>
          <div className="relative z-10">
            <FavoriteToggleButton
              postSlug={post.slug}
              initialFavorited={initialFavorited}
            />
          </div>
        </div>
      </div>
    </article>
  )
}
