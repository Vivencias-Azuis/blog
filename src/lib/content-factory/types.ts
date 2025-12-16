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

export const RequestCategorySchema = z.enum([
  'direitos',
  'educacao',
  'saude',
  'comunicacao',
  'geral',
])

export type RequestCategory = z.infer<typeof RequestCategorySchema>

export const FrontmatterCategorySchema = z.enum([
  'Direitos',
  'Educação',
  'Saúde',
  'Comunicação',
  'Geral',
])

export type FrontmatterCategory = z.infer<typeof FrontmatterCategorySchema>

export const GenerateRequestSchema = z.object({
  type: ContentTypeSchema,
  topic: z.string().min(3).max(100),
  keywords: z.array(z.string()).min(1).max(10),
  mainKeyword: z.string().min(3).max(120),
  outline: z.array(z.string()).min(3),
  category: RequestCategorySchema,
  minimumWords: z.number().int().min(300).default(2000),
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
    title: z.string().min(1),
    excerpt: z.string().min(1),
    category: FrontmatterCategorySchema,
    tags: z.array(z.string()).default([]),
    datetime: z.string().min(1),
    author: z.string().min(1),
    featured: z.boolean().optional(),
    slug: z.string().optional(),
  }),
  content: z.string(),
  filename: z.string(),
  savedTo: z.string(),
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

