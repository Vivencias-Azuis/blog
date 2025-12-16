import matter from 'gray-matter'

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export interface ValidationResult {
  passed: string[]
  warnings: string[]
  errors: string[]
  readyToPublish: boolean
  metadata?: {
    wordCount: number
    h1Count: number
    tableCount: number
    faqCount: number
    keywordDensity: number
  }
}

export function validateGeneratedContent(mdxContent: string, mainKeyword: string): ValidationResult {
  const passed: string[] = []
  const warnings: string[] = []
  const errors: string[] = []

  try {
    const { data, content } = matter(mdxContent)

    const hasDatetime = Boolean(data.datetime || data.date)
    if (!data.title || !data.excerpt || !data.category || !hasDatetime) {
      errors.push('Frontmatter incompleto (faltam title, excerpt, category ou datetime)')
    } else {
      passed.push('Frontmatter válido')
      if (!data.datetime && data.date) {
        warnings.push('Frontmatter usa `date` (legado). Prefira `datetime` com timezone.')
      }
    }

    const excerpt = String(data.excerpt || '')
    if (excerpt.length && (excerpt.length < 120 || excerpt.length > 180)) {
      warnings.push(`Excerpt fora do ideal (120-180 chars): ${excerpt.length}`)
    }

    const title = String(data.title || '')
    if (title.length > 70) {
      warnings.push(`Title muito longo (>70 chars): ${title.length}`)
    }

    const h1Matches = content.match(/^# /gm) || []
    if (h1Matches.length === 0) {
      errors.push('Falta H1 (# Título) no conteúdo')
    } else if (h1Matches.length > 1) {
      warnings.push(`Múltiplos H1 encontrados (${h1Matches.length}). Recomendado apenas 1.`)
    } else {
      passed.push('H1 presente')
    }

    const hasResume = content.includes('## Resumo rápido')
    if (!hasResume) warnings.push('Falta "## Resumo rápido" no início')
    else passed.push('Resumo rápido presente')

    const hasFAQ = content.includes('## Perguntas frequentes')
    if (!hasFAQ) warnings.push('Falta "## Perguntas frequentes"')
    else passed.push('FAQ presente')

    const jsonLdMatch = content.match(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/
    )
    if (jsonLdMatch) {
      try {
        JSON.parse(jsonLdMatch[1])
        passed.push('JSON-LD válido')
      } catch {
        errors.push('JSON-LD presente mas inválido (parse error)')
      }
    } else if (hasFAQ) {
      warnings.push('FAQ presente, mas nenhum JSON-LD encontrado')
    }

    const contentLower = content.toLowerCase()
    const keywordLower = mainKeyword.toLowerCase()
    const keywordMatches = (contentLower.match(new RegExp(escapeRegExp(keywordLower), 'g')) || [])
      .length
    const contentWords = content.split(/\s+/).filter(Boolean).length
    const density = contentWords ? (keywordMatches / contentWords) * 100 : 0

    if (density < 1) warnings.push(`Keyword density muito baixa (${density.toFixed(2)}%).`)
    else if (density > 5) warnings.push(`Keyword density alta (${density.toFixed(2)}%).`)
    else passed.push(`Keyword density OK (${density.toFixed(2)}%)`)

    const wordCount = contentWords
    if (wordCount < 800) errors.push(`Conteúdo muito curto (${wordCount} palavras).`)
    else passed.push(`Comprimento ok (${wordCount} palavras)`)

    const unsafeHtmlMatch = content.match(/<(?!script)[^>]*>/)
    if (unsafeHtmlMatch) warnings.push('Detectadas tags HTML fora de <script>. Verifique/evite.')

    const hasLinkSection = content.includes('## Leia também')
    if (!hasLinkSection) warnings.push('Falta seção "## Leia também" para internal linking')
    else passed.push('Seção de links internos presente')

    const metadata = {
      wordCount,
      h1Count: h1Matches.length,
      tableCount: (content.match(/^\|/gm) || []).length > 0 ? 1 : 0,
      faqCount: (content.match(/^### /gm) || []).length,
      keywordDensity: parseFloat(density.toFixed(2)),
    }

    return { passed, warnings, errors, readyToPublish: errors.length === 0, metadata }
  } catch (error) {
    errors.push(`Erro ao parsear conteúdo: ${error instanceof Error ? error.message : 'Unknown'}`)
    return { passed, warnings, errors, readyToPublish: false }
  }
}
