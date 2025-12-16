#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import OpenAI from 'openai'
import { z } from 'zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.join(__dirname, '..')
const POSTS_DIR = path.join(ROOT_DIR, 'src', 'content', 'posts')
const OUT_DIR = path.join(ROOT_DIR, 'src', 'content', 'review-queue')
const ENV_LOCAL_PATH = path.join(ROOT_DIR, '.env.local')

const RequestSchema = z.object({
  type: z.enum([
    'comparativo',
    'guia-pratico',
    'pain-point',
    'explicativo',
    'lista',
    'tendencia',
    'local',
  ]),
  topic: z.string().min(3).max(100),
  keywords: z.array(z.string()).min(1).max(10),
  mainKeyword: z.string().min(3).max(120),
  outline: z.array(z.string()).min(3),
  category: z.enum(['direitos', 'educacao', 'saude', 'comunicacao', 'geral']),
  minimumWords: z.number().int().min(300).optional(),
  includeExamples: z.boolean().optional(),
  includeFAQ: z.boolean().optional(),
  includeTable: z.boolean().optional(),
  style: z
    .object({
      tone: z.enum(['formal', 'conversacional', 'amigável']).optional(),
      language: z.enum(['pt-BR', 'pt-PT']).optional(),
      includeEmojis: z.boolean().optional(),
    })
    .optional(),
  rules: z.array(z.string()).optional(),
})

function usage() {
  console.log(`Uso:
  node scripts/generate-content.js --input ./request.json

Env:
  OPENAI_API_KEY=...
  OPENAI_CONTENT_MODEL=gpt-4.1-mini (opcional)
  OPENAI_MAX_OUTPUT_TOKENS=3500 (opcional)
`)
}

function loadEnvLocal() {
  if (!fs.existsSync(ENV_LOCAL_PATH)) return
  const raw = fs.readFileSync(ENV_LOCAL_PATH, 'utf8')
  const lines = raw.split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    let value = trimmed.slice(idx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

function parseArgs(argv) {
  const args = { input: '' }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--input') args.input = argv[i + 1] || ''
    if (a === '-h' || a === '--help') args.help = true
  }
  return args
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function requestCategoryToFrontmatter(category) {
  const map = {
    direitos: 'Direitos',
    educacao: 'Educação',
    saude: 'Saúde',
    comunicacao: 'Comunicação',
    geral: 'Geral',
  }
  return map[category] || 'Geral'
}

function coerceFrontmatterCategory(value, fallback) {
  if (typeof value !== 'string') return fallback
  const normalized = value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const map = {
    direitos: 'Direitos',
    educacao: 'Educação',
    saude: 'Saúde',
    comunicacao: 'Comunicação',
    geral: 'Geral',
  }

  return map[normalized] || fallback
}

function loadFewShotPosts() {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx')).slice(0, 3)
  return files.map(f => fs.readFileSync(path.join(POSTS_DIR, f), 'utf8'))
}

function buildSystemPrompt(existingPosts) {
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

function buildUserPrompt(req) {
  const category = requestCategoryToFrontmatter(req.category)
  const minWordsByType = {
    comparativo: 2000,
    'guia-pratico': 1800,
    'pain-point': 1500,
    explicativo: 1500,
    lista: 1500,
    tendencia: 1500,
    local: 1200,
  }
  const minimumWords = Math.max(req.minimumWords || 0, minWordsByType[req.type] || 1500)

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
- Incluir exemplos práticos: ${req.includeExamples === false ? 'NÃO' : 'SIM'}
- Incluir emojis: ${req.style?.includeEmojis ? 'SIM' : 'NÃO'} (não use emojis no title/H1)

REQUISITOS:
- Mínimo ${minimumWords} palavras
- Incluir FAQ: ${req.includeFAQ === false ? 'NÃO' : 'SIM'}
- Incluir tabela: ${req.includeTable === false ? 'NÃO' : 'SIM'}
- Incluir "Resumo rápido" no topo

REGRAS ADICIONAIS:
${req.rules?.map(r => `- ${r}`).join('\n') || '(nenhuma regra adicional)'}

Gere o artigo completo com frontmatter YAML válido.
`
}

function normalizeFrontmatter(data, fallbackCategory) {
  const title = typeof data.title === 'string' ? data.title.trim() : ''
  const excerpt = typeof data.excerpt === 'string' ? data.excerpt.trim() : ''
  const author =
    typeof data.author === 'string' && data.author.trim().length > 0
      ? data.author.trim()
      : 'Vivências Azuis'

  const tags = Array.isArray(data.tags)
    ? data.tags.map(String).map(t => t.trim()).filter(Boolean)
    : []

  const datetime =
    typeof data.datetime === 'string' && data.datetime.trim().length > 0
      ? data.datetime.trim()
      : typeof data.date === 'string' && data.date.trim().length > 0
        ? data.date.trim()
        : new Date().toISOString()

  const category = coerceFrontmatterCategory(data.category, fallbackCategory)
  const featured = typeof data.featured === 'boolean' ? data.featured : undefined
  const slug = typeof data.slug === 'string' && data.slug.trim().length > 0 ? slugify(data.slug) : undefined

  return {
    title,
    excerpt,
    datetime,
    author,
    category,
    tags,
    featured,
    slug,
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function uniqueFilename(dir, baseSlug) {
  const candidate = `${baseSlug}.mdx`
  if (!fs.existsSync(path.join(dir, candidate))) return candidate
  for (let i = 2; i < 100; i++) {
    const next = `${baseSlug}-${i}.mdx`
    if (!fs.existsSync(path.join(dir, next))) return next
  }
  return `${baseSlug}-${Date.now()}.mdx`
}

async function main() {
  loadEnvLocal()

  const args = parseArgs(process.argv.slice(2))
  if (args.help || !args.input) {
    usage()
    process.exit(args.help ? 0 : 1)
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('Falta OPENAI_API_KEY no ambiente (use .env.local ou export OPENAI_API_KEY=...)')
    process.exit(1)
  }

  const inputPath = path.isAbsolute(args.input) ? args.input : path.join(process.cwd(), args.input)
  const raw = fs.readFileSync(inputPath, 'utf8')
  const json = JSON.parse(raw)
  const req = RequestSchema.parse(json)

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const systemPrompt = buildSystemPrompt(loadFewShotPosts())
  const userPrompt = buildUserPrompt(req)

  const model = process.env.OPENAI_CONTENT_MODEL || 'gpt-4.1-mini'
  const maxOutputTokens = Number(process.env.OPENAI_MAX_OUTPUT_TOKENS || 3500)

  const resp = await openai.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.4,
    max_tokens: Number.isFinite(maxOutputTokens) ? maxOutputTokens : 3500,
  })

  const rawMdx = resp.choices?.[0]?.message?.content || ''
  if (!rawMdx) {
    console.error('Modelo retornou output vazio')
    process.exit(1)
  }

  const parsed = matter(rawMdx)
  const fallbackCategory = requestCategoryToFrontmatter(req.category)
  const fm = normalizeFrontmatter(parsed.data, fallbackCategory)
  const mdx = matter.stringify(parsed.content, fm)

  ensureDir(OUT_DIR)

  const baseSlug = fm.slug ? slugify(fm.slug) : slugify(req.topic)
  const filename = uniqueFilename(OUT_DIR, baseSlug)
  const outPath = path.join(OUT_DIR, filename)
  fs.writeFileSync(outPath, mdx, 'utf8')

  console.log(JSON.stringify({ savedTo: outPath, filename, frontmatter: fm }, null, 2))
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
