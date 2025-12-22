import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  datetime: string
  updated?: string
  author: string
  category: string
  tags: string[]
  featured?: boolean
  readingTime: string
  coverImage?: string
}

export interface Post extends PostMeta {
  content: string
}

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export function normalizeSlug(rawSlug: string): string {
  const withoutExtension = rawSlug.replace(/\.mdx$/i, '')

  let decoded = withoutExtension
  try {
    decoded = decodeURIComponent(withoutExtension)
  } catch {
    decoded = withoutExtension
  }

  return decoded
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function getAllPosts(): PostMeta[] {
  // Verifica se o diretório existe
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const today = new Date()
  today.setHours(23, 59, 59, 999) // Set to end of today to include today's posts

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = normalizeSlug(fileName)
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const stats = readingTime(content)

      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || '',
        datetime: data.datetime || data.date || new Date().toISOString(),
        updated: data.updated || undefined,
        author: data.author || 'Vivências Azuis',
        category: data.category || 'Geral',
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: data.featured || false,
        readingTime: stats.text,
        coverImage: data.coverImage || data.image || undefined,
      } as PostMeta
    })
    .filter((post) => {
      // Filter out posts with future dates
      const postDate = new Date(post.datetime)
      return postDate <= today
    })

  return allPostsData.sort((a, b) => (new Date(b.datetime).getTime() - new Date(a.datetime).getTime()))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const normalizedSlug = normalizeSlug(slug)
    const fullPath = path.join(postsDirectory, `${normalizedSlug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const stats = readingTime(content)

    const post = {
      slug: normalizedSlug,
      title: data.title || normalizedSlug,
      excerpt: data.excerpt || '',
      datetime: data.datetime || data.date || new Date().toISOString(),
      updated: data.updated || undefined,
      author: data.author || 'Vivências Azuis',
      category: data.category || 'Geral',
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: data.featured || false,
      readingTime: stats.text,
      coverImage: data.coverImage || data.image || undefined,
      content,
    }

    // Check if post date is in the future
    const today = new Date()
    today.setHours(23, 59, 59, 999) // Set to end of today to include today's posts
    const postDate = new Date(post.datetime)
    
    if (postDate > today) {
      return null // Return null for future posts, which will trigger 404
    }

    return post
  } catch (error) {
    return null
  }
}

export function getFeaturedPosts(): PostMeta[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.featured).slice(0, 3)
}

export function getPostsByCategory(category: string): PostMeta[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase())
}

export function getPostsByTag(tag: string): PostMeta[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => 
    Array.isArray(post.tags) && post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  )
}

export function getRelatedPosts(currentPostSlug: string, limit: number = 3): PostMeta[] {
  const allPosts = getAllPosts()
  const currentPost = allPosts.find(post => post.slug === currentPostSlug)
  
  if (!currentPost) {
    return []
  }

  // Filter out the current post
  const otherPosts = allPosts.filter(post => post.slug !== currentPostSlug)
  
  // Score posts based on similarity
  const scoredPosts = otherPosts.map(post => {
    let score = 0
    
    // Same category gets higher score
    if (post.category.toLowerCase() === currentPost.category.toLowerCase()) {
      score += 3
    }
    
    // Shared tags get points
    if (Array.isArray(post.tags) && Array.isArray(currentPost.tags)) {
      const sharedTags = post.tags.filter(tag => 
        currentPost.tags.some(currentTag => 
          currentTag.toLowerCase() === tag.toLowerCase()
        )
      )
      score += sharedTags.length * 2
    }
    
    // Recent posts get slight preference
    const currentDate = new Date(currentPost.datetime)
    const postDate = new Date(post.datetime)
    const daysDiff = Math.abs(currentDate.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)
    
    if (daysDiff <= 30) {
      score += 1
    }
    
    return { post, score }
  })
  
  // Sort by score (descending) and return top posts
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)
}
