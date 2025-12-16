import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

import { requestCategoryToFrontmatter, coerceFrontmatterCategory } from '@/lib/content-factory/categories'
import { validateRequest, suggestFix } from '@/lib/content-factory/guardrails'
import { getSystemPrompt, getUserPrompt } from '@/lib/content-factory/prompts'
import { FrontmatterCategory, GenerateRequestSchema, GeneratedContentSchema } from '@/lib/content-factory/types'
import { validateGeneratedContent } from '@/lib/content-factory/validator'

export const runtime = 'nodejs'

function getOpenAIClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
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

function normalizeFrontmatter(data: Record<string, unknown>, fallbackCategory: FrontmatterCategory) {
  const title = typeof data.title === 'string' ? data.title.trim() : ''
  const excerpt = typeof data.excerpt === 'string' ? data.excerpt.trim() : ''
  const author =
    typeof data.author === 'string' && data.author.trim().length > 0 ? data.author.trim() : 'Vivências Azuis'

  const tags = Array.isArray(data.tags)
    ? data.tags.map(String).map(t => t.trim()).filter(Boolean)
    : []

  const datetime =
    typeof data.datetime === 'string' && data.datetime.trim().length > 0
      ? data.datetime.trim()
      : typeof data.date === 'string' && data.date.trim().length > 0
        ? data.date.trim()
        : ''

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

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Missing OPENAI_API_KEY in environment (.env.local)' },
        { status: 500 }
      )
    }

    const existingPosts = await loadFewShotPosts()
    const systemPrompt = getSystemPrompt(existingPosts)
    const userPrompt = getUserPrompt(req)

    const model = process.env.OPENAI_CONTENT_MODEL || 'gpt-4.1-mini'
    const maxOutputTokens = Number(process.env.OPENAI_MAX_OUTPUT_TOKENS || 3500)

    const openai = getOpenAIClient()
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
      return NextResponse.json({ error: 'Empty model output' }, { status: 502 })
    }

    const parsed = matter(rawMdx)
    const fallbackCategory = requestCategoryToFrontmatter(req.category)
    const normalizedFrontmatter = normalizeFrontmatter(parsed.data as any, fallbackCategory)
    const normalizedMdx = matter.stringify(parsed.content, normalizedFrontmatter)

    const validations = validateGeneratedContent(normalizedMdx, req.mainKeyword)

    const outDir = path.join(process.cwd(), 'src', 'content', 'review-queue')
    await fs.mkdir(outDir, { recursive: true })

    const baseSlug =
      typeof normalizedFrontmatter.slug === 'string' && normalizedFrontmatter.slug.trim().length > 0
        ? slugify(normalizedFrontmatter.slug)
        : slugify(req.topic)

    const filename = await getUniqueFilename(outDir, baseSlug)
    const savedTo = `/src/content/review-queue/${filename}`

    await fs.writeFile(path.join(outDir, filename), normalizedMdx, 'utf8')

    const result = {
      frontmatter: normalizedFrontmatter,
      content: normalizedMdx,
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

    const schemaCheck = GeneratedContentSchema.safeParse(result)
    if (!schemaCheck.success) {
      return NextResponse.json(
        { error: 'Generated content schema mismatch', details: schemaCheck.error.errors },
        { status: 500 }
      )
    }

    return NextResponse.json(schemaCheck.data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Unexpected error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    )
  }
}
