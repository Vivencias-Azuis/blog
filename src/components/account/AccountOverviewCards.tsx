import Link from 'next/link'

const cards = [
  {
    href: '/minha-area/perfil',
    title: 'Perfil',
    body: 'Revise seus dados de acesso e a pagina nativa do Clerk.',
    cta: 'Abrir perfil',
  },
  {
    href: '/minha-area/favoritos',
    title: 'Favoritos',
    body: 'Revise os posts salvos quando a pagina estiver disponivel.',
    cta: 'Ver favoritos',
  },
  {
    href: '/minha-area/materiais',
    title: 'Materiais',
    body: 'Acesse os materiais abertos e exclusivos quando a pagina entrar no ar.',
    cta: 'Ver materiais',
  },
  {
    href: '/minha-area/assinatura',
    title: 'Assinatura',
    body: 'Veja o estado do acesso e o caminho para apoiar o projeto.',
    cta: 'Ver assinatura',
  },
] as const

export default function AccountOverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="rounded-block border border-sand-200 bg-surface p-5 shadow-card transition-transform hover:-translate-y-1 md:p-6"
        >
          <h2 className="text-xl font-semibold text-sand-900">{card.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-sand-700">{card.body}</p>
          <span className="mt-5 inline-flex rounded-pill bg-brand-soft px-3 py-1 text-xs font-semibold text-sand-900">
            {card.cta}
          </span>
        </Link>
      ))}
    </div>
  )
}
