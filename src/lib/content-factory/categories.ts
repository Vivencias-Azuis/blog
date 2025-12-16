import { FrontmatterCategory, RequestCategory } from './types'

const REQUEST_TO_FRONTMATTER: Record<RequestCategory, FrontmatterCategory> = {
  direitos: 'Direitos',
  educacao: 'Educação',
  saude: 'Saúde',
  comunicacao: 'Comunicação',
  geral: 'Geral',
}

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function requestCategoryToFrontmatter(category: RequestCategory): FrontmatterCategory {
  return REQUEST_TO_FRONTMATTER[category]
}

export function coerceFrontmatterCategory(
  value: unknown,
  fallback: FrontmatterCategory
): FrontmatterCategory {
  if (typeof value !== 'string') return fallback

  const normalized = normalize(value)
  const candidates: Array<{ key: string; value: FrontmatterCategory }> = [
    { key: 'direitos', value: 'Direitos' },
    { key: 'educacao', value: 'Educação' },
    { key: 'saude', value: 'Saúde' },
    { key: 'comunicacao', value: 'Comunicação' },
    { key: 'geral', value: 'Geral' },
  ]

  const found = candidates.find(c => c.key === normalized)
  return found?.value || fallback
}
