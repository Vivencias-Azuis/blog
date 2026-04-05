import Link from 'next/link'

interface AccountOverviewCardsProps {
  isMember: boolean
}

const cards = [
  {
    href: '/minha-area/perfil',
    title: 'Perfil',
    body: 'Revise seus dados de acesso e a pagina nativa do Clerk.',
    cta: 'Abrir perfil',
  },
  {
    href: '/minha-area/assinatura',
    title: 'Assinatura',
    body: 'Veja o estado do acesso e o caminho para apoiar o projeto.',
    cta: 'Ver assinatura',
  },
] as const

export default function AccountOverviewCards({
  isMember,
}: AccountOverviewCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-block border border-sand-200 bg-surface p-5 shadow-card md:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark">
          Status atual
        </p>
        <h2 className="mt-3 text-xl font-semibold text-sand-900">
          {isMember ? 'Membro com acesso liberado' : 'Conta gratuita ativa'}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-sand-700">
          {isMember
            ? 'Seu acesso exclusivo foi identificado na conta.'
            : 'A conta esta pronta para navegação e pode ser atualizada depois.'}
        </p>
      </div>

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
