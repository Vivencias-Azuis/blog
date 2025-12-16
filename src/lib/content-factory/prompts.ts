import { requestCategoryToFrontmatter } from './categories'
import { GenerateRequest } from './types'

export function getSystemPrompt(existingPosts: string[]): string {
  return `Você é um especialista em autismo e conteúdo SEO em português brasileiro.

IDENTIDADE:
- Você escreve para o blog "Vivências Azuis"
- Público: pais, educadores, profissionais de saúde
- Tom: empático, prático, baseado em evidência
- Você NÃO faz fake news, NÃO propõe "curas"
- Se houver qualquer incerteza, sinalize e peça revisão humana

FORMATO DO OUTPUT (OBRIGATÓRIO):
1) Frontmatter YAML (entre --- ---), com EXATAMENTE estas chaves:
   - title: string (sem emoji)
   - excerpt: string (150-160 caracteres)
   - datetime: ISO 8601 com timezone (ex.: 2025-12-14T10:00:00-03:00)
   - author: string (padrão: Vivências Azuis)
   - category: Direitos | Educação | Saúde | Comunicação | Geral
   - tags: array de strings
   - featured: boolean (opcional)
   - slug: string (opcional, kebab-case sem acentos)

2) Corpo em Markdown/MDX:
   - Um único H1 (#) igual ao title (sem emoji)
   - ## Resumo rápido (2-3 frases)
   - Seções com H2/H3
   - ## Tabela (se solicitado)
   - ## Perguntas frequentes (se solicitado)
   - <script type="application/ld+json">{...}</script> (se houver FAQ)
   - ## Leia também (2-4 links internos sugeridos; use URLs tipo /blog/slug)

REGRAS:
- Respeite neurodiversidade; evite linguagem capacitista
- Não invente números/estatísticas, leis ou estudos
- Se não souber fonte confiável, escreva a seção e marque como "revisar fontes"
- Evite HTML (exceto <script> do JSON-LD)

EXEMPLOS DE POSTS (para coerência de estilo):
${existingPosts
  .slice(0, 3)
  .map(
    (p, i) => `[Exemplo ${i + 1}]:
${p}
`
  )
  .join('\n---\n')}
`
}

export function getUserPrompt(req: GenerateRequest): string {
  const category = requestCategoryToFrontmatter(req.category)

  const minWordsByType: Record<GenerateRequest['type'], number> = {
    comparativo: 2000,
    'guia-pratico': 1800,
    'pain-point': 1500,
    explicativo: 1500,
    lista: 1500,
    tendencia: 1500,
    local: 1200,
  }

  const minimumWords = Math.max(req.minimumWords, minWordsByType[req.type])

  return `
Crie um artigo do tipo "${req.type}" com as seguintes especificações:

TEMA: ${req.topic}
KEYWORDS PRINCIPAIS: ${req.keywords.join(', ')}
MAIN KEYWORD (H1): ${req.mainKeyword}
CATEGORIA (frontmatter): ${category}

OUTLINE SUGERIDO:
${req.outline.map((h, i) => `${i + 1}. ${h}`).join('\n')}

ESTILO:
- Tom: ${req.style?.tone || 'amigável'}
- Idioma: ${req.style?.language || 'pt-BR'}
- Incluir exemplos práticos: ${req.includeExamples ? 'SIM' : 'NÃO'}
- Incluir emojis: ${req.style?.includeEmojis ? 'SIM' : 'NÃO'} (não use emojis no title/H1)

REQUISITOS:
- Mínimo ${minimumWords} palavras
- Incluir FAQ: ${req.includeFAQ ? 'SIM' : 'NÃO'}
- Incluir tabela: ${req.includeTable ? 'SIM' : 'NÃO'}
- Incluir "Resumo rápido" no topo

REGRAS ADICIONAIS:
${req.rules?.map(r => `- ${r}`).join('\n') || '(nenhuma regra adicional)'}

Gere o artigo completo com frontmatter YAML válido.
`
}

