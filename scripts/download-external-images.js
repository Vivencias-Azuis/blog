#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'
import { parseFrontmatter, stringifyFrontmatter } from './lib/frontmatter.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const postsDirectory = path.join(__dirname, '../src/content/posts')
const imagesDirectory = path.join(__dirname, '../public/images/posts')

// Criar diretório de imagens se não existir
if (!fs.existsSync(imagesDirectory)) {
  fs.mkdirSync(imagesDirectory, { recursive: true })
}

// Regex para encontrar URLs de imagens externas
const imageUrlRegex = /https?:\/\/[^\s\)]+\.(jpg|jpeg|png|gif|webp|svg)/gi

// Função para extrair nome do arquivo da URL
function getImageFilename(url, slug) {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const ext = path.extname(pathname) || '.png'
    
    // Criar hash único da URL completa usando MD5
    const hash = createHash('md5').update(url).digest('hex').slice(0, 12)
    
    // Tentar extrair nome do arquivo original da URL
    const originalFilename = path.basename(pathname, ext)
    if (originalFilename && originalFilename.length > 0 && originalFilename !== 'image') {
      // Limpar nome do arquivo original (remover caracteres especiais)
      const cleanName = originalFilename
        .replace(/[^a-zA-Z0-9-_]/g, '-')
        .slice(0, 30)
      return `${slug}-${cleanName}-${hash}${ext}`
    }
    
    return `${slug}-${hash}${ext}`
  } catch (error) {
    // Fallback: usar hash MD5 da URL
    const hash = createHash('md5').update(url).digest('hex').slice(0, 12)
    return `${slug}-${hash}.png`
  }
}

// Função para baixar imagem
async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    fs.writeFileSync(filepath, buffer)
    return true
  } catch (error) {
    console.error(`Erro ao baixar ${url}:`, error.message)
    return false
  }
}

// Função para processar um post
async function processPost(fileName) {
  const slug = fileName.replace(/\.mdx$/, '')
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  const { data, content } = parseFrontmatter(fileContents)
  
  // Encontrar todas as URLs de imagens externas
  const imageUrls = new Set()
  
  // Buscar no conteúdo
  const contentMatches = content.matchAll(imageUrlRegex)
  for (const match of contentMatches) {
    imageUrls.add(match[0])
  }
  
  // Buscar no frontmatter (coverImage)
  if (data.coverImage && imageUrlRegex.test(data.coverImage)) {
    imageUrls.add(data.coverImage)
  }
  
  if (imageUrls.size === 0) {
    return { slug, updated: false, images: [] }
  }
  
  console.log(`\n📄 Processando: ${slug}`)
  console.log(`   Encontradas ${imageUrls.size} imagem(ns) externa(s)`)
  
  let updatedContent = content
  let updatedData = { ...data }
  const downloadedImages = []
  
  // Processar cada imagem
  for (const imageUrl of imageUrls) {
    const filename = getImageFilename(imageUrl, slug)
    const localPath = path.join(imagesDirectory, filename)
    const publicPath = `/images/posts/${filename}`
    
    // Verificar se a imagem já foi baixada
    if (fs.existsSync(localPath)) {
      console.log(`   ✓ Imagem já existe: ${filename}`)
    } else {
      console.log(`   ⬇️  Baixando: ${imageUrl}`)
      const success = await downloadImage(imageUrl, localPath)
      if (!success) {
        console.log(`   ✗ Falha ao baixar: ${imageUrl}`)
        continue
      }
      console.log(`   ✓ Salvo: ${filename}`)
    }
    
    downloadedImages.push({ original: imageUrl, local: publicPath, filename })
    
    // Substituir no conteúdo
    updatedContent = updatedContent.replace(new RegExp(imageUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), publicPath)
    
    // Substituir no frontmatter se for coverImage
    if (data.coverImage === imageUrl) {
      updatedData.coverImage = publicPath
    }
  }
  
  // Atualizar arquivo se houver mudanças
  if (downloadedImages.length > 0) {
    const frontmatter = stringifyFrontmatter(updatedContent, updatedData)
    fs.writeFileSync(fullPath, frontmatter, 'utf8')
    console.log(`   ✓ Post atualizado`)
    return { slug, updated: true, images: downloadedImages }
  }
  
  return { slug, updated: false, images: [] }
}

// Função principal
async function main() {
  console.log('🔍 Procurando imagens externas nos posts...\n')
  
  if (!fs.existsSync(postsDirectory)) {
    console.error(`❌ Diretório de posts não encontrado: ${postsDirectory}`)
    process.exit(1)
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.mdx'))
  
  if (fileNames.length === 0) {
    console.log('❌ Nenhum arquivo MDX encontrado')
    process.exit(0)
  }
  
  console.log(`📚 Encontrados ${fileNames.length} post(s)\n`)
  
  const results = []
  
  for (const fileName of fileNames) {
    try {
      const result = await processPost(fileName)
      results.push(result)
    } catch (error) {
      console.error(`❌ Erro ao processar ${fileName}:`, error.message)
      results.push({ slug: fileName, updated: false, error: error.message })
    }
  }
  
  // Resumo
  console.log('\n' + '='.repeat(60))
  console.log('📊 RESUMO')
  console.log('='.repeat(60))
  
  const updated = results.filter(r => r.updated).length
  const totalImages = results.reduce((sum, r) => sum + (r.images?.length || 0), 0)
  
  console.log(`\n✅ Posts atualizados: ${updated}/${fileNames.length}`)
  console.log(`🖼️  Imagens baixadas: ${totalImages}`)
  
  if (updated > 0) {
    console.log('\n📝 Posts atualizados:')
    results
      .filter(r => r.updated)
      .forEach(r => {
        console.log(`   - ${r.slug} (${r.images.length} imagem(ns))`)
      })
  }
  
  console.log('\n✨ Processo concluído!')
}

main().catch(error => {
  console.error('❌ Erro fatal:', error)
  process.exit(1)
})
