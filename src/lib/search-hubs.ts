export const SEARCH_HUB_SLUGS = [
  'terapia-aba-valor-2026-preco-sessoes-e-reembolso',
  'melhores-planos-de-saude-para-criancas-com-autismo',
  'como-funciona-picture-exchange-communication-system-pecs',
  'dicionario-para-pais-de-criancas-autistas',
  'niveis-de-suporte-no-tea-e-seu-papel-no-diagnostic',
  'checklist-primeira-consulta-autismo',
  'hospitais-e-clinicas-gratuitas-para-autistas-no-br',
  'aba-para-pais',
  'lei-berenice-piana-marco-legal-dos-direitos-dos-autistas-no-brasil',
  'hipersensibilidade-sensorial-autismo-guia-pratico-2026',
] as const

export const HOME_FEATURED_SLUGS = [
  'terapia-aba-valor-2026-preco-sessoes-e-reembolso',
  'melhores-planos-de-saude-para-criancas-com-autismo',
  'como-funciona-picture-exchange-communication-system-pecs',
] as const

export const FOOTER_GUIDE_LINKS = [
  { href: '/blog/terapia-aba-valor-2026-preco-sessoes-e-reembolso', label: 'Valor da terapia ABA' },
  { href: '/blog/melhores-planos-de-saude-para-criancas-com-autismo', label: 'Planos de saúde' },
  { href: '/blog/como-funciona-picture-exchange-communication-system-pecs', label: 'PECS' },
  { href: '/blog/niveis-de-suporte-no-tea-e-seu-papel-no-diagnostic', label: 'Níveis de suporte' },
  { href: '/blog/dicionario-para-pais-de-criancas-autistas', label: 'Dicionário do autismo' },
] as const

const LOW_PRIORITY_SLUGS = new Set(['o-que-e-ecolalia', 'a-sindrome-de-savant'])
const HUB_SLUGS = new Set<string>(SEARCH_HUB_SLUGS)

export function getSitemapPriority(slug: string, lastModified: Date, now = new Date()): number {
  if (LOW_PRIORITY_SLUGS.has(slug)) return 0.6
  if (HUB_SLUGS.has(slug)) return 0.9

  const days = Math.floor((now.getTime() - lastModified.getTime()) / (1000 * 60 * 60 * 24))
  if (days <= 30) return 0.85
  if (days <= 180) return 0.8
  return 0.6
}

export function getSitemapChangeFrequency(lastModified: Date, now = new Date()): 'weekly' | 'monthly' | 'yearly' {
  const days = Math.floor((now.getTime() - lastModified.getTime()) / (1000 * 60 * 60 * 24))
  if (days <= 30) return 'weekly'
  if (days <= 180) return 'monthly'
  return 'yearly'
}
