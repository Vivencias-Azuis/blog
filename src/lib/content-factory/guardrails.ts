import { GenerateRequest, ContentTypeSchema, RequestCategorySchema } from './types'

export interface GuardResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

const FORBIDDEN_TOPICS = [
  'cura para autismo',
  'vacina causa autismo',
  'autismo é falta de',
  'desintoxicação autismo',
]

export function validateRequest(req: GenerateRequest): GuardResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!ContentTypeSchema.safeParse(req.type).success) {
    errors.push(`Tipo '${req.type}' não é válido`)
  }

  if (!RequestCategorySchema.safeParse(req.category).success) {
    errors.push(`Categoria '${req.category}' não é válida`)
  }

  if (req.topic.length < 5) {
    errors.push('Topic deve ter pelo menos 5 caracteres')
  }

  const outlineText = req.outline.join(' ').toLowerCase()
  const missingKeywords = req.keywords.filter(kw => !outlineText.includes(kw.toLowerCase()))
  if (missingKeywords.length > 0) {
    warnings.push(
      `Essas keywords não aparecem no outline: ${missingKeywords.join(', ')}. Pode afetar SEO.`
    )
  }

  if (!req.mainKeyword.toLowerCase().includes(req.keywords[0]?.toLowerCase() || '')) {
    warnings.push('Main keyword não contém a primeira keyword. Verifique alinhamento.')
  }

  if (req.mainKeyword.length > 70) {
    warnings.push('H1/title muito longo (>70 chars). Melhor < 60 para CTR no Google.')
  }

  const topicLower = req.topic.toLowerCase()
  if (FORBIDDEN_TOPICS.some(ft => topicLower.includes(ft))) {
    errors.push(
      `Tópico '${req.topic}' está banido (muita desinformação). Use tópicos baseados em evidência.`
    )
  }

  const prohibitedRules = ['ignore guidelines', 'sem cite fontes', 'fake news ok']
  const badRules =
    req.rules?.filter(r => prohibitedRules.some(pr => r.toLowerCase().includes(pr))) || []
  if (badRules.length > 0) {
    errors.push(`Rules inválidas: ${badRules.join(', ')}`)
  }

  if (req.type === 'comparativo' && req.includeTable === false) {
    warnings.push('Comparativo sem tabela pode perder clareza/SEO. Considere includeTable=true.')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

export function suggestFix(error: string): string {
  if (error.includes('Tipo')) {
    return 'Escolha um tipo válido: comparativo, guia-pratico, pain-point, explicativo, lista, tendencia, local'
  }
  if (error.toLowerCase().includes('keyword')) {
    return 'Revise o outline para incluir as keywords principais do seu tópico'
  }
  if (error.includes('H1') || error.includes('title')) {
    return 'Encurte o title para < 60 caracteres, mantendo keyword principal'
  }
  if (error.toLowerCase().includes('banido')) {
    return 'Troque o ângulo para um tema baseado em evidência, sem promessas/curas'
  }
  return 'Corrija o erro acima e tente novamente'
}

