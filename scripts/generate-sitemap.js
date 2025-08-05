#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get current file directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Import the posts utility
const postsUtilPath = path.join(__dirname, '../src/lib/posts.ts')

// Since we're in JS, we'll implement the basic post reading ourselves
import matter from 'gray-matter'

const BASE_URL = 'https://www.vivenciasazuis.com.br'
const POSTS_DIR = path.join(__dirname, '../src/content/posts')

/**
 * Get all blog posts with their metadata
 */
function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    return []
  }

  const fileNames = fs.readdirSync(POSTS_DIR)
  const today = new Date()
  today.setHours(23, 59, 59, 999)

  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(POSTS_DIR, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      const stats = fs.statSync(fullPath)

      return {
        slug,
        title: data.title || slug,
        date: data.date || stats.mtime.toISOString(),
        category: data.category || 'Geral',
        lastModified: stats.mtime.toISOString(),
      }
    })
    .filter((post) => {
      const postDate = new Date(post.date)
      return postDate <= today
    })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get unique categories from all posts
 */
function getCategories(posts) {
  const categories = new Set()
  posts.forEach(post => {
    if (post.category && post.category !== 'Geral') {
      categories.add(post.category.toLowerCase())
    }
  })
  return Array.from(categories)
}

/**
 * Get file modification date for static pages
 */
function getPageLastModified(pagePath) {
  try {
    const fullPath = path.join(__dirname, '../src/app', pagePath)
    let targetFile = path.join(fullPath, 'page.tsx')
    
    // If page.tsx doesn't exist, try looking for other files
    if (!fs.existsSync(targetFile)) {
      targetFile = path.join(fullPath, 'layout.tsx')
    }
    
    if (fs.existsSync(targetFile)) {
      const stats = fs.statSync(targetFile)
      return stats.mtime.toISOString()
    }
  } catch (error) {
    console.warn(`Could not get modification date for ${pagePath}:`, error.message)
  }
  
  return new Date().toISOString()
}

/**
 * Generate sitemap XML
 */
function generateSitemap() {
  const posts = getAllPosts()
  const categories = getCategories(posts)
  
  console.log(`Found ${posts.length} posts and ${categories.length} categories`)
  
  const sitemap = []
  
  // XML header
  sitemap.push('<?xml version="1.0" encoding="UTF-8"?>')
  sitemap.push('<urlset')
  sitemap.push('      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
  sitemap.push('      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"')
  sitemap.push('      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9')
  sitemap.push('            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">')
  sitemap.push('<!-- Generated automatically by generate-sitemap.js -->')
  sitemap.push('')
  
  // Static pages
  const staticPages = [
    { path: '', priority: '1.00', changefreq: 'weekly' }, // Homepage
    { path: 'blog', priority: '0.90', changefreq: 'daily' }, // Blog index
    { path: 'sobre', priority: '0.80', changefreq: 'monthly' }, // About
    { path: 'contato', priority: '0.80', changefreq: 'monthly' }, // Contact
  ]
  
  staticPages.forEach(page => {
    const lastmod = getPageLastModified(page.path || '.')
    sitemap.push('<url>')
    sitemap.push(`  <loc>${BASE_URL}/${page.path}</loc>`)
    sitemap.push(`  <lastmod>${lastmod}</lastmod>`)
    sitemap.push(`  <priority>${page.priority}</priority>`)
    sitemap.push(`  <changefreq>${page.changefreq}</changefreq>`)
    sitemap.push('</url>')
  })
  
  // Blog category pages
  categories.forEach(category => {
    const lastmod = new Date().toISOString() // Categories change when posts are added
    sitemap.push('<url>')
    sitemap.push(`  <loc>${BASE_URL}/blog?categoria=${category}</loc>`)
    sitemap.push(`  <lastmod>${lastmod}</lastmod>`)
    sitemap.push(`  <priority>0.70</priority>`)
    sitemap.push(`  <changefreq>weekly</changefreq>`)
    sitemap.push('</url>')
  })
  
  // Blog posts
  posts.forEach(post => {
    sitemap.push('<url>')
    sitemap.push(`  <loc>${BASE_URL}/blog/${post.slug}</loc>`)
    sitemap.push(`  <lastmod>${post.lastModified}</lastmod>`)
    sitemap.push(`  <priority>0.80</priority>`)
    sitemap.push(`  <changefreq>monthly</changefreq>`)
    sitemap.push('</url>')
  })
  
  sitemap.push('')
  sitemap.push('</urlset>')
  
  return sitemap.join('\n')
}

/**
 * Main function
 */
function main() {
  try {
    console.log('🚀 Generating sitemap...')
    
    const sitemapContent = generateSitemap()
    const sitemapPath = path.join(__dirname, '../sitemap.xml')
    
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8')
    
    console.log('✅ Sitemap generated successfully!')
    console.log(`📄 Saved to: ${sitemapPath}`)
    console.log(`🔗 URL: ${BASE_URL}/sitemap.xml`)
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
    process.exit(1)
  }
}

// Run the main function
main()

export { generateSitemap, getAllPosts }