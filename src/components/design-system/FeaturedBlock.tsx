import Link from 'next/link'

interface FeaturedBlockProps {
  label?: string
  title: string
  description?: string
  href: string
}

export default function FeaturedBlock({ label, title, description, href }: FeaturedBlockProps) {
  return (
    <section className="rounded-block border border-brand/30 bg-brand-soft p-6">
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
          {label}
        </span>
      )}
      <h3 className="mt-2 text-2xl font-semibold text-sand-900">
        <Link href={href} className="hover:text-link">
          {title}
        </Link>
      </h3>
      {description && <p className="mt-2 text-sm text-sand-700">{description}</p>}
      <div className="mt-4">
        <Link href={href} className="text-sm font-semibold text-link hover:text-link-hover">
          Saiba mais
        </Link>
      </div>
    </section>
  )
}
