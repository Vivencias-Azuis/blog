import Link from 'next/link'

type ArticleCardVariant = 'default' | 'featured' | 'compact'

interface ArticleCardProps {
  title: string
  excerpt: string
  href: string
  category?: string
  author?: string
  datetime?: string
  readingTime?: string
  tags?: string[]
  featured?: boolean
  variant?: ArticleCardVariant
}

export default function ArticleCard({
  title,
  excerpt,
  href,
  category,
  author,
  datetime,
  readingTime,
  tags,
  featured,
  variant = 'default',
}: ArticleCardProps) {
  const isFeatured = variant === 'featured'
  const isCompact = variant === 'compact'

  return (
    <article className="group h-full">
      <div
        className={`relative h-full rounded-card border border-sand-200 bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-pop ${
          isFeatured ? 'p-6 md:p-8' : 'p-5'
        }`}
      >
        {(featured || isFeatured) && (
          <span className="inline-flex items-center rounded-pill bg-brand-soft px-3 py-1 text-xs font-semibold text-sand-900">
            Destaque
          </span>
        )}

        {category && (
          <div className="mt-3">
            <span className="inline-flex items-center rounded-pill bg-sand-200 px-3 py-1 text-xs font-semibold text-sand-800">
              {category}
            </span>
          </div>
        )}

        <h3
          className={`mt-4 font-sans font-semibold text-sand-900 transition-colors duration-200 group-hover:text-link ${
            isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}
        >
          <Link href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
            {title}
          </Link>
        </h3>

        {!isCompact && (
          <p className="mt-3 text-sm leading-relaxed text-sand-700 md:text-base">
            {excerpt}
          </p>
        )}

        {!!tags?.length && !isCompact && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-pill bg-sand-100 px-3 py-1 text-xs font-medium text-sand-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-sand-600">
          <div className="flex items-center gap-2">
            {author && <span className="font-medium text-sand-700">{author}</span>}
            {datetime && <span>{datetime}</span>}
          </div>
          {readingTime && <span className="font-medium">{readingTime}</span>}
        </div>

        <div className="mt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-link transition-colors duration-200 hover:text-link-hover"
            aria-label={`Ler mais: ${title}`}
          >
            Ler mais
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
