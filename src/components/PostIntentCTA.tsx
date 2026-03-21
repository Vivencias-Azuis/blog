import Link from 'next/link'
import { PostMeta } from '@/lib/posts'

type PostIntentCTAProps = {
  intent: 'informational' | 'commercial'
  placement: 'mid' | 'end'
  tone?: 'light' | 'dark'
  post: Pick<PostMeta, 'slug' | 'category' | 'tags' | 'title'>
}

type CtaAction = {
  href: string
  label: string
  ctaName: string
}

type PostCluster = 'planos' | 'direitos' | 'terapias' | 'comunicacao' | 'geral'

function detectCluster(post: Pick<PostMeta, 'slug' | 'category' | 'tags'>): PostCluster {
  const haystack = [post.slug, post.category, ...post.tags].join(' ').toLowerCase()

  if (/(plano|unimed|amil|sulamerica|bradesco|reembolso|cobertura|ans)/.test(haystack)) return 'planos'
  if (/(lei|direito|bpc|loas|ciptea|beneficio|benefício|gratuidade|escola-publica|escola pública)/.test(haystack)) return 'direitos'
  if (/(aba|denver|floortime|fono|terapia|ocupacional|clinica|clínica|medicamento)/.test(haystack)) return 'terapias'
  if (/(pecs|caa|ecolalia|fala|nao-verbal|não-verbal|comunicacao|comunicação)/.test(haystack)) return 'comunicacao'
  return 'geral'
}

function getActions(
  intent: PostIntentCTAProps['intent'],
  placement: PostIntentCTAProps['placement'],
  post: Pick<PostMeta, 'slug' | 'category' | 'tags' | 'title'>
): CtaAction[] {
  const cluster = detectCluster(post)
  const contactQuery = `/contato?origem=post&cluster=${cluster}&slug=${encodeURIComponent(post.slug)}&titulo=${encodeURIComponent(post.title)}`

  if (cluster === 'planos') {
    return [
      {
        href: '/blog/melhores-planos-de-saude-para-criancas-com-autismo',
        label: 'Ver comparativo de planos',
        ctaName: `post_${placement}_planos_ver_comparativo`,
      },
      {
        href: `${contactQuery}&assunto=colaboracao`,
        label: 'Tirar dúvida sobre cobertura',
        ctaName: `post_${placement}_planos_tirar_duvida`,
      },
    ]
  }

  if (cluster === 'direitos') {
    return [
      {
        href: '/blog/documentos-essenciais-familias-pessoas-autistas-laudos-relatorios-beneficios',
        label: 'Ver guia de documentos',
        ctaName: `post_${placement}_direitos_ver_documentos`,
      },
      {
        href: `${contactQuery}&assunto=duvida`,
        label: 'Enviar dúvida sobre direitos',
        ctaName: `post_${placement}_direitos_enviar_duvida`,
      },
    ]
  }

  if (cluster === 'terapias') {
    return [
      {
        href: '/blog/como-escolher-clinica-de-autismo-criterios-sinais-alerta',
        label: 'Ver critérios para escolher clínica',
        ctaName: `post_${placement}_terapias_ver_criterios`,
      },
      {
        href: `${contactQuery}&assunto=duvida`,
        label: 'Enviar dúvida sobre terapias',
        ctaName: `post_${placement}_terapias_enviar_duvida`,
      },
    ]
  }

  if (cluster === 'comunicacao') {
    return [
      {
        href: '/blog/como-funciona-picture-exchange-communication-system-pecs',
        label: 'Ver guia de comunicação funcional',
        ctaName: `post_${placement}_comunicacao_ver_guia`,
      },
      {
        href: `${contactQuery}&assunto=sugestao`,
        label: 'Pedir conteúdo para seu caso',
        ctaName: `post_${placement}_comunicacao_pedir_conteudo`,
      },
    ]
  }

  if (intent === 'commercial') {
    return [
      {
        href: '/blog/melhores-planos-de-saude-para-criancas-com-autismo',
        label: 'Ver comparativo',
        ctaName: `post_${placement}_commercial_ver_comparativo`,
      },
      {
        href: `${contactQuery}&assunto=duvida`,
        label: 'Falar com a equipe',
        ctaName: `post_${placement}_commercial_falar_equipe`,
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

export default function PostIntentCTA({ intent, placement, tone = 'light', post }: PostIntentCTAProps) {
  const actions = getActions(intent, placement, post)
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
