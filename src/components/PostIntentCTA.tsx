import Link from 'next/link'

type PostIntentCTAProps = {
  intent: 'informational' | 'commercial'
  placement: 'mid' | 'end'
  tone?: 'light' | 'dark'
}

type CtaAction = {
  href: string
  label: string
  ctaName: string
}

function getActions(intent: PostIntentCTAProps['intent'], placement: PostIntentCTAProps['placement']): CtaAction[] {
  if (intent === 'commercial') {
    return [
      {
        href: '/blog/melhor-plano-de-saude-para-autismo-guia-completo',
        label: 'Ver comparativo',
        ctaName: `post_${placement}_commercial_ver_comparativo`,
      },
      {
        href: '/contato',
        label: 'Falar com especialista',
        ctaName: `post_${placement}_commercial_falar_especialista`,
      },
    ]
  }

  return [
    {
      href: '/blog/checklist-primeira-consulta-autismo',
      label: 'Baixar checklist',
      ctaName: `post_${placement}_informational_baixar_checklist`,
    },
    {
      href: '/?ebook=1',
      label: 'Receber plano semanal',
      ctaName: `post_${placement}_informational_receber_plano_semanal`,
    },
  ]
}

export default function PostIntentCTA({ intent, placement, tone = 'light' }: PostIntentCTAProps) {
  const actions = getActions(intent, placement)
  const primaryClass =
    tone === 'dark'
      ? 'inline-flex items-center justify-center rounded-card bg-white px-6 py-3 text-sm font-semibold text-link hover:bg-brand-soft transition-colors'
      : 'inline-flex items-center justify-center rounded-card bg-link px-5 py-3 text-sm font-semibold text-white hover:bg-link-hover transition-colors'
  const secondaryClass =
    tone === 'dark'
      ? 'inline-flex items-center justify-center rounded-card border border-white/30 bg-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/30 transition-colors'
      : 'inline-flex items-center justify-center rounded-card border border-brand/40 bg-surface px-5 py-3 text-sm font-semibold text-sand-900 hover:bg-brand/10 transition-colors'

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Link href={actions[0].href} data-cta={actions[0].ctaName} className={primaryClass}>
        {actions[0].label}
      </Link>
      <Link href={actions[1].href} data-cta={actions[1].ctaName} className={secondaryClass}>
        {actions[1].label}
      </Link>
    </div>
  )
}
