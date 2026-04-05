import Link from 'next/link'
import type { ReactNode } from 'react'

interface AccountShellProps {
  title: string
  description: string
  children: ReactNode
}

const links = [
  { href: '/minha-area', label: 'Visao geral' },
  { href: '/minha-area/perfil', label: 'Perfil' },
  { href: '/minha-area/favoritos', label: 'Favoritos' },
  { href: '/minha-area/materiais', label: 'Materiais' },
  { href: '/minha-area/assinatura', label: 'Assinatura' },
]

export default function AccountShell({
  title,
  description,
  children,
}: AccountShellProps) {
  return (
    <section className="bg-page">
      <div className="container-custom py-16">
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="rounded-block border border-sand-200 bg-surface p-4 shadow-card">
            <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
              Minha area
            </p>
            <nav className="space-y-2" aria-label="Navegacao da conta">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-pill px-4 py-3 text-sm font-semibold text-sand-700 transition-colors hover:bg-brand-soft hover:text-link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>

          <div className="space-y-6">
            <header className="rounded-block border border-sand-200 bg-surface p-6 shadow-card md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-dark">
                Area autenticada
              </p>
              <h1 className="mt-3 text-3xl font-bold text-sand-900 md:text-4xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-sand-700 md:text-lg">
                {description}
              </p>
            </header>

            <div>{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
