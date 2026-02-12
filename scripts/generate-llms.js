#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

// Get current file directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || '',
        date: data.datetime || data.date || new Date().toISOString(),
        category: data.category || 'Geral',
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: data.featured || false,
      }
    })
    .filter((post) => {
      const postDate = new Date(post.date)
      return postDate <= today
    })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Group posts by category
 */
function groupPostsByCategory(posts) {
  const categories = {}
  
  posts.forEach(post => {
    const category = post.category
    if (!categories[category]) {
      categories[category] = []
    }
    categories[category].push(post)
  })

  return categories
}

/**
 * Get category description based on category name
 */
function getCategoryDescription(categoryName) {
  const descriptions = {
    'Geral': 'Conteúdo geral sobre autismo e comunidade',
    'Educação': 'Recursos educacionais e materiais didáticos sobre autismo',
    'Dicas': 'Dicas práticas para o dia a dia com crianças autistas',
    'Relatos': 'Experiências e histórias reais da comunidade',
    'Direitos': 'Informações sobre direitos e políticas de inclusão',
    'Saúde': 'Orientações sobre saúde e bem-estar no espectro autista',
    'Terapias': 'Informações sobre diferentes abordagens terapêuticas',
    'Comunicação': 'Estratégias e métodos de comunicação alternativa'
  }

  return descriptions[categoryName] || 'Conteúdo relacionado ao autismo e inclusão'
}

/**
 * Truncate text to specified length with ellipsis
 */
function truncateText(text, maxLength = 200) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Generate LLMs.txt content
 */
function generateLLMsContent() {
  const posts = getAllPosts()
  const categorizedPosts = groupPostsByCategory(posts)
  
  console.log(`Found ${posts.length} posts in ${Object.keys(categorizedPosts).length} categories`)
  
  const llmsContent = []
  
  // Header
  llmsContent.push('# Vivências Azuis')
  llmsContent.push('')
  llmsContent.push('> Blog dedicado à comunidade do autismo, oferecendo apoio, conhecimento e recursos para famílias, educadores e pessoas no espectro autista. Nosso espaço digital promove inclusão, compartilha experiências reais e fornece ferramentas práticas para uma jornada mais acolhedora e informada no universo do autismo.')
  llmsContent.push('')

  // About section
  llmsContent.push('## Sobre o Vivências Azuis')
  llmsContent.push('')
  llmsContent.push('- [Página Inicial](https://www.vivenciasazuis.com.br/) — Portal principal com conteúdo destacado e navegação para todas as seções do site.')
  llmsContent.push('- [Sobre Nós](https://www.vivenciasazuis.com.br/sobre) — Conheça nossa missão de dar voz, visibilidade e suporte a cada trajetória dentro do espectro autista.')
  llmsContent.push('- [Contato](https://www.vivenciasazuis.com.br/contato) — Entre em contato conosco para dúvidas, sugestões ou colaborações.')
  llmsContent.push('- [Blog](https://www.vivenciasazuis.com.br/blog) — Central de conteúdo com artigos, guias e recursos sobre autismo.')
  llmsContent.push('')

  // Sort categories with featured content first
  const sortedCategories = Object.keys(categorizedPosts).sort((a, b) => {
    // Put 'Geral' first if it exists (welcome content)
    if (a === 'Geral') return -1
    if (b === 'Geral') return 1
    
    // Then sort alphabetically
    return a.localeCompare(b)
  })

  // Content by category
  sortedCategories.forEach(categoryName => {
    const categoryPosts = categorizedPosts[categoryName]
    const categoryDescription = getCategoryDescription(categoryName)
    
    llmsContent.push(`## ${categoryName}`)
    llmsContent.push('')
    llmsContent.push(`> ${categoryDescription}`)
    llmsContent.push('')
    
    // Add category page link if not 'Geral'
    if (categoryName !== 'Geral') {
      const categorySlug = categoryName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      llmsContent.push(`- [Ver todos os posts de ${categoryName}](${BASE_URL}/blog?categoria=${categorySlug}) — Navegue por todo o conteúdo da categoria ${categoryName}.`)
      llmsContent.push('')
    }
    
    // List posts in this category
    categoryPosts.forEach(post => {
      const postUrl = `${BASE_URL}/blog/${post.slug}`
      const description = truncateText(post.excerpt || `Conteúdo sobre ${post.title.toLowerCase()}`)
      
      llmsContent.push(`- [${post.title}](${postUrl}) — ${description}`)
    })
    
    llmsContent.push('')
  })

  // Featured content section
  const featuredPosts = posts.filter(post => post.featured)
  if (featuredPosts.length > 0) {
    llmsContent.push('## Conteúdo em Destaque')
    llmsContent.push('')
    llmsContent.push('> Artigos e recursos especialmente importantes para a comunidade do autismo.')
    llmsContent.push('')
    
    featuredPosts.forEach(post => {
      const postUrl = `${BASE_URL}/blog/${post.slug}`
      const description = truncateText(post.excerpt || `Conteúdo em destaque sobre ${post.title.toLowerCase()}`)
      
      llmsContent.push(`- [${post.title}](${postUrl}) — ${description}`)
    })
    
    llmsContent.push('')
  }

  // Tags/Topics section
  const allTags = [...new Set(posts.flatMap(post => post.tags))].sort()
  if (allTags.length > 0) {
    llmsContent.push('## Principais Tópicos')
    llmsContent.push('')
    llmsContent.push('> Temas frequentemente abordados no blog para facilitar a navegação por assunto.')
    llmsContent.push('')
    
    const topicGroups = {
      'Comunicação': ['comunicação', 'ecolalia', 'pecs', 'fala'],
      'Educação': ['educação', 'escola', 'aprendizagem', 'métodos'],
      'Família': ['pais', 'família', 'cuidadores', 'irmãos'],
      'Desenvolvimento': ['desenvolvimento', 'habilidades', 'autonomia', 'social'],
      'Diagnóstico': ['diagnóstico', 'avaliação', 'níveis', 'características'],
      'Recursos': ['dicionário', 'guias', 'ferramentas', 'materiais']
    }
    
    Object.entries(topicGroups).forEach(([groupName, keywords]) => {
      const matchingTags = allTags.filter(tag => 
        keywords.some(keyword => 
          tag.toLowerCase().includes(keyword) || keyword.includes(tag.toLowerCase())
        )
      )
      
      if (matchingTags.length > 0) {
        llmsContent.push(`**${groupName}**: ${matchingTags.join(', ')}`)
      }
    })
    
    llmsContent.push('')
  }

  // Footer info
  llmsContent.push('---')
  llmsContent.push('')
  llmsContent.push('*Este arquivo LLMs.txt foi gerado automaticamente para ajudar inteligências artificiais a compreenderem melhor o conteúdo do Vivências Azuis. Para mais informações, visite [www.vivenciasazuis.com.br](https://www.vivenciasazuis.com.br)*')

  return llmsContent.join('\n')
}

/**
 * Main function
 */
function main() {
  try {
    console.log('🤖 Generating LLMs.txt...')
    
    const llmsContent = generateLLMsContent()
    const llmsPath = path.join(__dirname, '../public/llms.txt')
    
    fs.writeFileSync(llmsPath, llmsContent, 'utf8')
    
    console.log('✅ LLMs.txt generated successfully!')
    console.log(`📄 Saved to: ${llmsPath}`)
    console.log(`🔗 URL: ${BASE_URL}/llms.txt`)
    console.log('💡 This file helps AI systems understand your site content better.')
    
  } catch (error) {
    console.error('❌ Error generating LLMs.txt:', error)
    process.exit(1)
  }
}

// Run the main function
main()

export { generateLLMsContent, getAllPosts }
