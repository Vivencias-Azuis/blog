import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  datetime: string
  author: string
  category: string
  tags: string[]
  featured?: boolean
  readingTime: string
}

export interface Post extends PostMeta {
  content: string
}

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

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
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const stats = readingTime(content)

      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || '',
        datetime: data.datetime || data.date || new Date().toISOString(),
        author: data.author || 'Vivências Azuis',
        category: data.category || 'Geral',
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: data.featured || false,
        readingTime: stats.text,
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
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const stats = readingTime(content)

    const post = {
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || '',
      datetime: data.datetime || data.date || new Date().toISOString(),
      author: data.author || 'Vivências Azuis',
      category: data.category || 'Geral',
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: data.featured || false,
      readingTime: stats.text,
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