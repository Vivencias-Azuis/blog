import { normalizeTaxonomyValue } from '@/lib/taxonomy'

export type AnalyticsPageType = 'home' | 'blog_index' | 'post' | 'institucional'
export type AnalyticsLeadType = 'newsletter' | 'ebook'
export type AnalyticsTrafficIntent = 'informational' | 'commercial' | 'mixed'
export type OperationalCluster = 'planos' | 'direitos' | 'terapias' | 'comunicacao' | 'rotina'

type ClusterInput = {
  slug?: string
  category?: string
  tags?: string[]
  pathname?: string
}

type EventContext = {
  pathname: string
  pageType?: AnalyticsPageType
  postSlug?: string
  postCategory?: string
  ctaId?: string
  ctaLocation?: string
  leadType?: AnalyticsLeadType
  trafficIntent?: AnalyticsTrafficIntent
  tags?: string[]
}

export const PRIORITY_PAGE_PATHS = [
  '/blog/melhores-planos-de-saude-para-criancas-com-autismo',
  '/blog/aba-para-pais',
  '/blog/niveis-de-suporte-no-tea-e-seu-papel-no-diagnostic',
  '/blog/lei-berenice-piana-marco-legal-dos-direitos-dos-autistas-no-brasil',
  '/blog/como-funciona-picture-exchange-communication-system-pecs',
] as const

export function inferPageType(pathname: string): AnalyticsPageType {
  if (pathname === '/') return 'home'
  if (pathname === '/blog') return 'blog_index'
  if (pathname.startsWith('/blog/')) return 'post'
  return 'institucional'
}

export function detectOperationalCluster({ slug = '', category = '', tags = [], pathname = '' }: ClusterInput): OperationalCluster {
  const normalizedPath = normalizeTaxonomyValue(pathname.replace(/\//g, ' '))
  const haystack = [slug, category, ...tags, normalizedPath].join(' ').toLowerCase()

  if (/(plano|unimed|amil|sulamerica|bradesco|reembolso|cobertura|ans)/.test(haystack)) return 'planos'
  if (/(lei|direito|bpc|loas|ciptea|beneficio|benefício|gratuidade|escola-publica|escola pública)/.test(haystack)) return 'direitos'
  if (/(aba|denver|floortime|fono|terapia|ocupacional|clinica|clínica|medicamento)/.test(haystack)) return 'terapias'
  if (/(pecs|caa|ecolalia|fala|nao-verbal|não-verbal|comunicacao|comunicação)/.test(haystack)) return 'comunicacao'
  return 'rotina'
}

export function inferTrafficIntent(pathname: string, explicitIntent?: AnalyticsTrafficIntent): AnalyticsTrafficIntent {
  if (explicitIntent) return explicitIntent

  const pageType = inferPageType(pathname)
  if (pageType === 'home' || pageType === 'blog_index') return 'mixed'

  const normalizedPath = normalizeTaxonomyValue(pathname)
  if (/(plano|cobertura|valor|preco|preço|comparativo|clinica|clínica)/.test(normalizedPath)) return 'commercial'
  return 'informational'
}

export function buildAnalyticsEventParams({
  pathname,
  pageType = inferPageType(pathname),
  postSlug,
  postCategory,
  ctaId,
  ctaLocation,
  leadType,
  trafficIntent,
  tags = [],
}: EventContext) {
  const contentCluster =
    pageType === 'post'
      ? detectOperationalCluster({
          slug: postSlug,
          category: postCategory,
          tags,
          pathname,
        })
      : undefined

  const resolvedTrafficIntent = inferTrafficIntent(pathname, trafficIntent)

  return {
    page_type: pageType,
    post_slug: postSlug,
    post_category: postCategory,
    cta_id: ctaId,
    cta_location: ctaLocation,
    lead_type: leadType,
    traffic_intent: resolvedTrafficIntent,
    content_cluster: contentCluster,
    location: pathname,
    slug: postSlug,
    category: postCategory,
    cta_name: ctaId,
  }
}
