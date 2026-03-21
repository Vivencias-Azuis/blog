import { PostMeta } from '@/lib/posts'
import { generateCanonicalUrl } from '@/lib/metadata'

type AuthorKind = 'person' | 'organization'

export interface AuthorProfile {
  slug: string
  name: string
  kind: AuthorKind
  role: string
  bio: string
  expertise: string[]
}

const AUTHOR_ALIASES: Record<string, string> = {
  'equipe vivencias azuis': 'equipe-vivencias-azuis',
  'equipe vivências azuis': 'equipe-vivencias-azuis',
  'vivencias azuis': 'equipe-vivencias-azuis',
  'vivências azuis': 'equipe-vivencias-azuis',
  'matheus nunes': 'matheus-nunes',
}

export const AUTHOR_PROFILES: Record<string, AuthorProfile> = {
  'equipe-vivencias-azuis': {
    slug: 'equipe-vivencias-azuis',
    name: 'Equipe Vivências Azuis',
    kind: 'organization',
    role: 'Redação e curadoria editorial',
    bio: 'Equipe responsável pela apuração, organização e atualização dos conteúdos do Vivências Azuis com foco em linguagem clara, utilidade prática e fontes públicas confiáveis.',
    expertise: ['autismo', 'direitos', 'planos de saúde', 'educação inclusiva'],
  },
  'matheus-nunes': {
    slug: 'matheus-nunes',
    name: 'Matheus Nunes',
    kind: 'person',
    role: 'Editor e estrategista de conteúdo',
    bio: 'Responsável por pautas, revisão estrutural e atualização de conteúdos estratégicos do portal, com foco em clareza, intenção de busca e utilidade para famílias.',
    expertise: ['estratégia editorial', 'SEO', 'conteúdo para famílias', 'arquitetura de informação'],
  },
}

export interface PostTrustSignals {
  author: AuthorProfile
  authorUrl: string
  reviewedBy: string
  reviewLabel: string
  disclaimer: string
  methodologyUrl: string
  isSensitiveTopic: boolean
}

function normalizeAuthorKey(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function normalizeAuthorName(authorName: string): string {
  const normalized = normalizeAuthorKey(authorName)
  const slug = AUTHOR_ALIASES[normalized]

  if (!slug) {
    return authorName.trim()
  }

  return AUTHOR_PROFILES[slug].name
}

export function getAuthorProfile(authorName: string): AuthorProfile {
  const normalized = normalizeAuthorKey(authorName)
  const slug = AUTHOR_ALIASES[normalized] || 'equipe-vivencias-azuis'

  return AUTHOR_PROFILES[slug]
}

export function getAllAuthorProfiles(): AuthorProfile[] {
  return Object.values(AUTHOR_PROFILES)
}

function isSensitiveCategory(category: string) {
  const normalized = category.trim().toLowerCase()
  return ['direitos', 'saude', 'saúde', 'educacao', 'educação'].includes(normalized)
}

export function getPostTrustSignals(post: Pick<PostMeta, 'author' | 'category' | 'updated' | 'datetime'>): PostTrustSignals {
  const author = getAuthorProfile(post.author)
  const isSensitiveTopic = isSensitiveCategory(post.category)

  return {
    author,
    authorUrl: generateCanonicalUrl(`/autores/${author.slug}`),
    reviewedBy: 'Equipe editorial Vivências Azuis',
    reviewLabel: isSensitiveTopic ? 'Revisão editorial reforçada para tema sensível' : 'Revisão editorial interna',
    disclaimer: isSensitiveTopic
      ? 'Este conteúdo tem finalidade informativa e não substitui orientação médica, terapêutica ou jurídica individual.'
      : 'Este conteúdo tem finalidade informativa e deve ser usado como apoio inicial de pesquisa.',
    methodologyUrl: generateCanonicalUrl('/metodologia-editorial'),
    isSensitiveTopic,
  }
}
