import Link from 'next/link'

interface CTAProps {
  title: string
  description?: string
  actionLabel: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'minimal'
}

export default function CTA({
  title,
  description,
  actionLabel,
  href,
  onClick,
  variant = 'primary',
}: CTAProps) {
  const baseClass = 'inline-flex items-center justify-center rounded-card px-5 py-3 text-sm font-semibold transition-colors duration-200'
  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-dark',
    secondary: 'bg-brand-soft text-sand-900 hover:bg-brand/20',
    minimal: 'bg-transparent text-link hover:text-link-hover',
  }

  const action = href ? (
    <Link href={href} className={`${baseClass} ${variants[variant]}`}>
      {actionLabel}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={`${baseClass} ${variants[variant]}`}>
      {actionLabel}
    </button>
  )

  return (
    <section className="rounded-block border border-sand-200 bg-surface p-6 shadow-card">
      <h3 className="text-xl font-semibold text-sand-900">{title}</h3>
      {description && <p className="mt-2 text-sm text-sand-700">{description}</p>}
      <div className="mt-4">{action}</div>
    </section>
  )
}
