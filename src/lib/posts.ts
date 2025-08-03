import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
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
        date: data.date || new Date().toISOString(),
        author: data.author || 'Vivências Azuis',
        category: data.category || 'Geral',
        tags: data.tags || [],
        featured: data.featured || false,
        readingTime: stats.text,
      } as PostMeta
    })

  return allPostsData.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const stats = readingTime(content)

    return {
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Vivências Azuis',
      category: data.category || 'Geral',
      tags: data.tags || [],
      featured: data.featured || false,
      readingTime: stats.text,
      content,
    }
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
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  )
}