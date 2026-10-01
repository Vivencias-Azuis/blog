import type { MetadataRoute } from 'next'
import { getAllAuthorProfiles } from '@/lib/editorial'
import { getAllPosts } from '@/lib/posts'
import { getSitemapChangeFrequency, getSitemapPriority } from '@/lib/search-hubs'

const BASE_URL = 'https://www.vivenciasazuis.com.br'

function getLastModified(datetime: string, updated?: string): Date {
  const candidate = updated || datetime
  const parsed = new Date(candidate)
  return Number.isNaN(parsed.getTime()) ? new Date(datetime) : parsed
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
    {
      url: `${BASE_URL}/apoie`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/metodologia-editorial`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/termos-de-uso`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ]

  const authorPages = getAllAuthorProfiles().map((author) => ({
    url: `${BASE_URL}/autores/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  // Dynamic blog post pages
  const blogPosts = posts.map((post) => {
    const lastModified = getLastModified(post.datetime, post.updated)
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified,
      changeFrequency: getSitemapChangeFrequency(lastModified),
      priority: getSitemapPriority(post.slug, lastModified),
    }
  })

  return [...staticPages, ...authorPages, ...blogPosts]
}
