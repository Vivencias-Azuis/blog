# Fábrica de Conteúdo Confiável — Codex (OpenAI) + Next.js

Automatizar criação de posts sem perder qualidade, com guardrails e validações antes de publicar.

## Arquitetura geral

1. **Request (Next.js)**: `POST /api/content/generate`
2. **Guardrails (pré-modelo)**: rejeita pedidos ruins antes de chamar o modelo
3. **Prompt (system + user)**: contexto estruturado + regras + exemplos (few-shot)
4. **Parsing do response**: extrair frontmatter + corpo MDX (+ JSON-LD opcional)
5. **Validação pós-geração**: estrutura, palavras, JSON-LD, densidade keyword, tags HTML
6. **Save / Queue**: salvar em `src/content/review-queue/` e revisar antes de mover para `src/content/posts/`

## Dependências

```bash
npm i openai zod
```

> `gray-matter` já existe neste repo e é usado para parsear frontmatter.

## Variáveis de ambiente

- `OPENAI_API_KEY`: obrigatório
- `OPENAI_CONTENT_MODEL`: opcional (ex.: `gpt-4.1-mini`)
- `OPENAI_MAX_OUTPUT_TOKENS`: opcional (ex.: `3500`)

## Observação sobre runtime (Next.js)

Se o endpoint salvar arquivo via `fs/promises`, garanta Node runtime no route:

```ts
export const runtime = 'nodejs'
```

## Estrutura sugerida de arquivos (neste repo)

- `src/lib/content-factory/types.ts`
- `src/lib/content-factory/guardrails.ts`
- `src/lib/content-factory/prompts.ts`
- `src/lib/content-factory/validator.ts`
- `src/app/api/content/generate/route.ts`

## Arquivo 1: `src/lib/content-factory/types.ts` (schemas)

```ts
import { z } from 'zod'

export const ContentTypeSchema = z.enum([
  'comparativo',
  'guia-pratico',
  'pain-point',
  'explicativo',
  'lista',
  'tendencia',
  'local',
])

export const CategorySchema = z.enum(['direitos', 'educacao', 'saude', 'comunicacao', 'geral'])

export const GenerateRequestSchema = z.object({
  type: ContentTypeSchema,
  topic: z.string().min(3).max(100),
  keywords: z.array(z.string()).min(1).max(10),
  mainKeyword: z.string(),
  outline: z.array(z.string()).min(3),
  category: CategorySchema,
  minimumWords: z.number().default(2000),
  includeExamples: z.boolean().default(true),
  includeFAQ: z.boolean().default(true),
  includeTable: z.boolean().default(true),
  style: z
    .object({
      tone: z.enum(['formal', 'conversacional', 'amigável']).default('amigável'),
      language: z.enum(['pt-BR', 'pt-PT']).default('pt-BR'),
      includeEmojis: z.boolean().default(false),
    })
    .optional(),
  rules: z.array(z.string()).optional(),
})

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>

export const GeneratedContentSchema = z.object({
  frontmatter: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: CategorySchema,
    tags: z.array(z.string()),
    datetime: z.string(), // ISO8601 com timezone (preferido neste repo)
    author: z.string(),
    featured: z.boolean().optional(),
  }),
  content: z.string(),
  filename: z.string(),
  savedTo: z.string().optional(),
  wordCount: z.number(),
  validations: z.object({
    passed: z.array(z.string()),
    warnings: z.array(z.string()),
    errors: z.array(z.string()),
    readyToPublish: z.boolean(),
  }),
  suggestedLinks: z
    .array(
      z.object({
        title: z.string(),
        url: z.string(),
        context: z.string(),
      })
    )
    .optional(),
})

export type GeneratedContent = z.infer<typeof GeneratedContentSchema>
```

## Arquivo 2: `src/lib/content-factory/guardrails.ts` (pré-validações)

```ts
import { GenerateRequest, ContentTypeSchema, CategorySchema } from './types'

export interface GuardResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export function validateRequest(req: GenerateRequest): GuardResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!ContentTypeSchema.safeParse(req.type).success) {
    errors.push(
      `Tipo '${req.type}' não é válido. Use: comparativo, guia-pratico, pain-point, etc.`
    )
  }

  if (!CategorySchema.safeParse(req.category).success) {
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
    warnings.push('Main keyword não contém primeira keyword. Verifique alinhamento.')
  }

  if (req.mainKeyword.length > 70) {
    warnings.push('H1 muito longo (>70 chars). Melhor < 60 para CTR no Google.')
  }

  const forbiddenTopics = [
    'cura para autismo',
    'vacina causa autismo',
    'autismo é falta de',
    'desintoxicação autismo',
  ]
  const isForbidden = forbiddenTopics.some(ft => req.topic.toLowerCase().includes(ft))
  if (isForbidden) {
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
  if (error.includes('H1')) {
    return 'Encurte o title para < 60 caracteres, mantendo keyword principal'
  }
  return 'Verifique o erro acima e corrija antes de tentar novamente'
}
```

## Arquivo 3: `src/lib/content-factory/prompts.ts` (prompts para Codex/OpenAI)

```ts
import { GenerateRequest } from './types'

export function getSystemPrompt(existingPosts: string[]): string {
  return `Você é um especialista em autismo e conteúdo SEO em português brasileiro.

IDENTIDADE:
- Você escreve para o blog "Vivências Azuis"
- Seu público: pais, educadores, profissionais de saúde
- Tom: empático, prático, baseado em evidência
- Você NÃO faz fake news, NÃO propõe "curas"
- Você SEMPRE sinaliza incerteza e cita fontes quando fizer claims médicas

FORMATO DO OUTPUT (OBRIGATÓRIO):
1) Frontmatter YAML (entre --- ---)
   - title: título otimizado SEO
   - excerpt: 150-160 caracteres
   - category: direitos | educacao | saude | comunicacao | geral
   - tags: lista de keywords
   - datetime: ISO 8601 com timezone
   - author: Vivências Azuis
2) Corpo em Markdown/MDX:
   - H1 único (#)
   - ## Resumo rápido (2-3 frases)
   - Seções com H2/H3
   - ## Tabela (se aplicável)
   - ## Perguntas frequentes (se aplicável)
   - <script type="application/ld+json">{...}</script> (se houver FAQ)
   - ## Leia também (links internos)

REGRAS:
- Respeite neurodiversidade; evite linguagem capacitista
- Evite HTML (exceto <script> do JSON-LD)
- Nunca invente números/estatísticas; se não souber, diga que não há consenso e peça revisão humana
- Se não souber uma fonte confiável, escreva a seção e marque como "revisar fontes" (sem inventar citação)

POSTS ANTERIORES (para coerência de estilo):
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
  return `
Crie um artigo do tipo "${req.type}" com as seguintes especificações:

TEMA: ${req.topic}
KEYWORDS PRINCIPAIS: ${req.keywords.join(', ')}
MAIN KEYWORD (H1): ${req.mainKeyword}
CATEGORIA: ${req.category}

OUTLINE SUGERIDO:
${req.outline.map((h, i) => `${i + 1}. ${h}`).join('\n')}

ESTILO:
- Tom: ${req.style?.tone || 'amigável'}
- Idioma: ${req.style?.language || 'pt-BR'}
- Incluir exemplos práticos: ${req.includeExamples ? 'SIM' : 'NÃO'}

REQUISITOS:
- Mínimo ${req.minimumWords} palavras
- Incluir FAQ: ${req.includeFAQ ? 'SIM' : 'NÃO'}
- Incluir tabela comparativa: ${req.includeTable ? 'SIM' : 'NÃO'}
- Incluir resumo rápido no topo

REGRAS ADICIONAIS:
${req.rules?.map(r => `- ${r}`).join('\n') || '(nenhuma regra adicional)'}

Gere o artigo completo com frontmatter YAML válido.
`
}
```

## Arquivo 4: `src/lib/content-factory/validator.ts` (validações pós-geração)

```ts
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
      passed.push('✓ Frontmatter válido')
      if (!data.datetime && data.date) {
        warnings.push('Frontmatter usa `date` (legado). Prefira `datetime` com timezone.')
      }
    }

    const h1Matches = content.match(/^# /gm) || []
    if (h1Matches.length === 0) {
      errors.push('Falta H1 (# Título) no conteúdo')
    } else if (h1Matches.length > 1) {
      warnings.push(`Múltiplos H1 encontrados (${h1Matches.length}). Recomendado apenas 1.`)
    } else {
      passed.push('✓ H1 único presente')
    }

    const hasResume = content.includes('## Resumo rápido')
    if (!hasResume) warnings.push('Falta "## Resumo rápido" no início')
    else passed.push('✓ Resumo rápido presente')

    const hasFAQ = content.includes('## Perguntas frequentes')
    if (!hasFAQ) warnings.push('Falta "## Perguntas frequentes"')
    else passed.push('✓ FAQ presente')

    const jsonLdMatch = content.match(
      /<script[^>]*type="application\\/ld\\+json"[^>]*>([\\s\\S]*?)<\\/script>/
    )
    if (jsonLdMatch) {
      try {
        JSON.parse(jsonLdMatch[1])
        passed.push('✓ JSON-LD válido')
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
    const contentWords = content.split(/\\s+/).filter(Boolean).length
    const density = contentWords ? (keywordMatches / contentWords) * 100 : 0

    if (density < 1) warnings.push(`Keyword density muito baixa (${density.toFixed(2)}%).`)
    else if (density > 5) warnings.push(`Keyword density alta (${density.toFixed(2)}%).`)
    else passed.push(`✓ Keyword density OK (${density.toFixed(2)}%)`)

    const wordCount = contentWords
    if (wordCount < 1500) errors.push(`Conteúdo muito curto (${wordCount} palavras). Mínimo: 1500`)
    else passed.push(`✓ Comprimento adequado (${wordCount} palavras)`)

    const unsafeHtmlMatch = content.match(/<(?!script)[^>]*>/)
    if (unsafeHtmlMatch) warnings.push('Detectadas tags HTML fora de <script>. Verifique/evite.')

    const hasLinkSection = content.includes('## Leia também')
    if (!hasLinkSection) warnings.push('Falta seção "## Leia também" para internal linking')
    else passed.push('✓ Seção de links internos presente')

    const metadata = {
      wordCount,
      h1Count: h1Matches.length,
      tableCount: (content.match(/^\\|/gm) || []).length > 0 ? 1 : 0,
      faqCount: (content.match(/^### /gm) || []).length,
      keywordDensity: parseFloat(density.toFixed(2)),
    }

    return { passed, warnings, errors, readyToPublish: errors.length === 0, metadata }
  } catch (error) {
    errors.push(`Erro ao parsear conteúdo: ${error instanceof Error ? error.message : 'Unknown'}`)
    return { passed, warnings, errors, readyToPublish: false }
  }
}
```

## Arquivo 5: `src/app/api/content/generate/route.ts` (endpoint Next.js)

```ts
import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'
import { GenerateRequestSchema, GeneratedContentSchema } from '@/lib/content-factory/types'
import { validateRequest, suggestFix } from '@/lib/content-factory/guardrails'
import { getSystemPrompt, getUserPrompt } from '@/lib/content-factory/prompts'
import { validateGeneratedContent } from '@/lib/content-factory/validator'
import matter from 'gray-matter'
import fs from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function getUniqueFilename(dir: string, baseSlug: string) {
  const candidate = `${baseSlug}.mdx`
  try {
    await fs.access(path.join(dir, candidate))
  } catch {
    return candidate
  }

  for (let i = 2; i < 100; i++) {
    const next = `${baseSlug}-${i}.mdx`
    try {
      await fs.access(path.join(dir, next))
    } catch {
      return next
    }
  }

  return `${baseSlug}-${Date.now()}.mdx`
}

async function loadFewShotPosts() {
  const postsDir = path.join(process.cwd(), 'src', 'content', 'posts')
  try {
    const entries = await fs.readdir(postsDir)
    const mdx = entries.filter(e => e.endsWith('.mdx')).slice(0, 3)
    const contents = await Promise.all(mdx.map(f => fs.readFile(path.join(postsDir, f), 'utf8')))
    return contents
  } catch {
    return []
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parseResult = GenerateRequestSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request schema', details: parseResult.error.errors },
        { status: 400 }
      )
    }

    const req = parseResult.data

    const guardResult = validateRequest(req)
    if (!guardResult.isValid) {
      return NextResponse.json(
        {
          error: 'Guardrails validation failed',
          errors: guardResult.errors,
          suggestions: guardResult.errors.map(suggestFix),
          warnings: guardResult.warnings,
        },
        { status: 400 }
      )
    }

    const existingPosts = await loadFewShotPosts()
    const systemPrompt = getSystemPrompt(existingPosts)
    const userPrompt = getUserPrompt(req)

    const model = process.env.OPENAI_CONTENT_MODEL || 'gpt-4.1-mini'
    const maxOutputTokens = Number(process.env.OPENAI_MAX_OUTPUT_TOKENS || 3500)

    const resp = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.4,
      max_tokens: maxOutputTokens,
    })

    const mdx = resp.choices?.[0]?.message?.content || ''
    if (!mdx) {
      return NextResponse.json({ error: 'Empty model output' }, { status: 502 })
    }

    const validations = validateGeneratedContent(mdx, req.mainKeyword)

    const outDir = path.join(process.cwd(), 'src', 'content', 'review-queue')
    await fs.mkdir(outDir, { recursive: true })

    const { data: fm } = matter(mdx)

    const baseSlug =
      typeof fm.slug === 'string' && fm.slug.trim().length > 0 ? slugify(fm.slug) : slugify(req.topic)

    const filename = await getUniqueFilename(outDir, baseSlug)
    const savedTo = `/src/content/review-queue/${filename}`

    const result = {
      frontmatter: {
        title: String(fm.title || ''),
        excerpt: String(fm.excerpt || ''),
        category: req.category,
        tags: Array.isArray(fm.tags) ? fm.tags.map(String) : req.keywords,
        datetime: String(fm.datetime || fm.date || ''),
        author: String(fm.author || 'Vivências Azuis'),
        featured: typeof fm.featured === 'boolean' ? fm.featured : undefined,
      },
      content: mdx,
      filename,
      savedTo,
      wordCount: validations.metadata?.wordCount || 0,
      validations: {
        passed: validations.passed,
        warnings: validations.warnings,
        errors: validations.errors,
        readyToPublish: validations.readyToPublish,
      },
    }

    const parsed = GeneratedContentSchema.safeParse(result)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Generated content schema mismatch', details: parsed.error.errors },
        { status: 500 }
      )
    }

    await fs.writeFile(path.join(outDir, filename), mdx, 'utf8')

    return NextResponse.json(parsed.data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Unexpected error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    )
  }
}
```

### Nota sobre frontmatter

O endpoint acima assume que o modelo devolve frontmatter YAML válido. Se faltar `title/excerpt/datetime`, o `GeneratedContentSchema` falha e você enxerga rapidamente que a geração não está pronta.

## Exemplos de uso (curl)

```bash
curl -X POST http://localhost:3000/api/content/generate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "comparativo",
    "topic": "ABA vs DIR Floortime",
    "keywords": ["ABA", "DIR", "Floortime", "terapia", "autismo"],
    "mainKeyword": "ABA vs DIR Floortime: Qual escolher [2025]",
    "outline": [
      "O que é ABA",
      "O que é DIR/Floortime",
      "Diferenças principais",
      "Para quem cada uma funciona melhor",
      "Custos no Brasil",
      "Como decidir com seu terapeuta"
    ],
    "category": "educacao",
    "minimumWords": 2200,
    "includeExamples": true,
    "includeFAQ": true,
    "includeTable": true,
    "rules": [
      "cite estudos científicos quando falar de eficácia",
      "não declare uma superior à outra",
      "inclua custos aproximados no Brasil (como faixa, sem chutar números exatos)"
    ]
  }'
```

## Fluxo humano: review & publish

1. Conferir em `src/content/review-queue/`
2. Revisar conteúdo (H1, resumo, FAQ, links, placeholders de fonte)
3. Ajustes menores
4. Mover para `src/content/posts/`
5. Rodar `npm run lint` e `npm run build` antes de publicar
