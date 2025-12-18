import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

const BASE_URL = 'https://www.vivenciasazuis.com.br'

function getLastModified(datetime: string, updated?: string): Date {
  const candidate = updated || datetime
  const parsed = new Date(candidate)
  return Number.isNaN(parsed.getTime()) ? new Date(datetime) : parsed
}

function getChangeFrequency(lastModified: Date): 'weekly' | 'monthly' | 'yearly' {
  const days = Math.floor((Date.now() - lastModified.getTime()) / (1000 * 60 * 60 * 24))
  if (days <= 30) return 'weekly'
  if (days <= 180) return 'monthly'
  return 'yearly'
}

function getPriority(slug: string, lastModified: Date): number {
  const lowPrioritySlugs = new Set([
    'o-que-e-ecolalia',
    'a-sindrome-de-savant',
    'dicionario-para-pais-de-criancas-autistas',
  ])

  if (lowPrioritySlugs.has(slug)) return 0.6

  const hubSlugs = new Set([
    'melhor-plano-de-saude-para-autismo-guia-completo',
    'lei-berenice-piana-marco-legal-dos-direitos-dos-autistas-no-brasil',
    'aba-para-pais',
    'como-funciona-picture-exchange-communication-system-pecs',
  ])

  if (hubSlugs.has(slug)) return 0.9

  const days = Math.floor((Date.now() - lastModified.getTime()) / (1000 * 60 * 60 * 24))
  if (days <= 30) return 0.85
  if (days <= 180) return 0.8
  return 0.6
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all published posts
  const posts = getAllPosts()

  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Dynamic blog post pages
  const blogPosts = posts.map((post) => {
    const lastModified = getLastModified(post.datetime, post.updated)
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified,
      changeFrequency: getChangeFrequency(lastModified),
      priority: getPriority(post.slug, lastModified),
    }
  })

  return [...staticPages, ...blogPosts]
}
