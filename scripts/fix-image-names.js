#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import { createHash } from 'crypto'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const postsDirectory = path.join(__dirname, '../src/content/posts')
const imagesDirectory = path.join(__dirname, '../public/images/posts')

// Regex para encontrar URLs de imagens externas
const imageUrlRegex = /https?:\/\/[^\s\)]+\.(jpg|jpeg|png|gif|webp|svg)/gi
const localImageRegex = /\/images\/posts\/[^\s\)]+\.(jpg|jpeg|png|gif|webp|svg)/gi

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

// Função para obter URLs originais do git
function getOriginalUrlsFromGit(filePath) {
  try {
    const relativePath = path.relative(path.dirname(__dirname), filePath)
    const gitContent = execSync(`git show HEAD:"${relativePath}"`, { encoding: 'utf-8', cwd: path.dirname(__dirname) })
    const originalUrls = new Set()
    
    // Extrair todas as URLs de imagens do conteúdo original
    const matches = gitContent.matchAll(imageUrlRegex)
    for (const match of matches) {
      originalUrls.add(match[0])
    }
    
    // Também verificar no frontmatter
    try {
      const { data } = matter(gitContent)
      if (data.coverImage && imageUrlRegex.test(data.coverImage)) {
        originalUrls.add(data.coverImage)
      }
    } catch (e) {
      // Ignorar erros de parsing
    }
    
    return Array.from(originalUrls)
  } catch (error) {
    // Se não houver no git, retornar vazio
    return []
  }
}

// Função para processar um post
async function processPost(fileName) {
  const slug = fileName.replace(/\.mdx$/, '')
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  const { data, content } = matter(fileContents)
  
  // Encontrar todas as URLs de imagens externas no conteúdo atual
  const currentImageUrls = new Set()
  const contentMatches = content.matchAll(imageUrlRegex)
  for (const match of contentMatches) {
    currentImageUrls.add(match[0])
  }
  
  // Encontrar referências locais antigas
  const localImageRefs = new Set()
  const localMatches = content.matchAll(localImageRegex)
  for (const match of localMatches) {
    localImageRefs.add(match[0])
  }
  
  // Se houver referências locais, tentar obter URLs originais do git
  let originalUrls = []
  if (localImageRefs.size > 0) {
    originalUrls = getOriginalUrlsFromGit(fullPath)
  }
  
  // Se não encontrou URLs originais no git, usar as URLs externas encontradas
  const imageUrls = originalUrls.length > 0 ? originalUrls : Array.from(currentImageUrls)
  
  // Buscar no frontmatter (coverImage)
  if (data.coverImage && imageUrlRegex.test(data.coverImage)) {
    imageUrls.push(data.coverImage)
  }
  
  if (imageUrls.length === 0 && localImageRefs.size === 0) {
    return { slug, updated: false, images: [] }
  }
  
  console.log(`\n📄 Processando: ${slug}`)
  if (imageUrls.length > 0) {
    console.log(`   Encontradas ${imageUrls.length} URL(s) original(is)`)
  }
  if (localImageRefs.size > 0) {
    console.log(`   Encontradas ${localImageRefs.size} referência(s) local(is) antiga(s)`)
  }
  
  let updatedContent = content
  let updatedData = { ...data }
  const downloadedImages = []
  const urlToLocalMap = new Map()
  
  // Processar cada URL original
  for (const imageUrl of imageUrls) {
    const filename = getImageFilename(imageUrl, slug)
    const localPath = path.join(imagesDirectory, filename)
    const publicPath = `/images/posts/${filename}`
    
    urlToLocalMap.set(imageUrl, publicPath)
    
    // Verificar se a imagem já foi baixada
    if (fs.existsSync(localPath)) {
      console.log(`   ✓ Imagem já existe: ${filename}`)
    } else {
      console.log(`   ⬇️  Baixando: ${imageUrl.substring(0, 80)}...`)
      const success = await downloadImage(imageUrl, localPath)
      if (!success) {
        console.log(`   ✗ Falha ao baixar`)
        continue
      }
      console.log(`   ✓ Salvo: ${filename}`)
    }
    
    downloadedImages.push({ original: imageUrl, local: publicPath, filename })
  }
  
  // Se temos URLs originais do git, vamos mapear as referências locais antigas
  // Para isso, precisamos ver a ordem das imagens no conteúdo original
  if (originalUrls.length > 0 && localImageRefs.size > 0) {
    try {
      const relativePath = path.relative(path.dirname(__dirname), fullPath)
      const gitContent = execSync(`git show HEAD:"${relativePath}"`, { encoding: 'utf-8', cwd: path.dirname(__dirname) })
      const { content: originalContent } = matter(gitContent)
      
      // Extrair URLs na ordem que aparecem no conteúdo original
      const originalUrlOrder = []
      const originalMatches = originalContent.matchAll(imageUrlRegex)
      for (const match of originalMatches) {
        originalUrlOrder.push(match[0])
      }
      
      // Extrair referências locais na ordem que aparecem no conteúdo atual
      const localRefOrder = []
      const localMatches = updatedContent.matchAll(localImageRegex)
      for (const match of localMatches) {
        localRefOrder.push(match[0])
      }
      
      // Mapear cada referência local para a URL original correspondente (por ordem)
      for (let i = 0; i < localRefOrder.length && i < originalUrlOrder.length; i++) {
        const localRef = localRefOrder[i]
        const originalUrl = originalUrlOrder[i]
        if (urlToLocalMap.has(originalUrl)) {
          const newLocalPath = urlToLocalMap.get(originalUrl)
          updatedContent = updatedContent.replace(localRef, newLocalPath)
        }
      }
    } catch (error) {
      // Se falhar, substituir todas as referências locais pela primeira URL disponível
      console.log(`   ⚠️  Não foi possível mapear referências locais, usando primeira URL disponível`)
      if (urlToLocalMap.size > 0) {
        const firstLocalPath = Array.from(urlToLocalMap.values())[0]
        for (const localRef of localImageRefs) {
          updatedContent = updatedContent.replace(new RegExp(localRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), firstLocalPath)
        }
      }
    }
  } else if (localImageRefs.size > 0) {
    // Se não temos URLs originais, substituir todas pela primeira disponível
    if (urlToLocalMap.size > 0) {
      const firstLocalPath = Array.from(urlToLocalMap.values())[0]
      for (const localRef of localImageRefs) {
        updatedContent = updatedContent.replace(new RegExp(localRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), firstLocalPath)
      }
    }
  }
  
  // Substituir URLs externas no conteúdo (apenas se ainda existirem)
  for (const [imageUrl, publicPath] of urlToLocalMap.entries()) {
    if (updatedContent.includes(imageUrl)) {
      updatedContent = updatedContent.replace(new RegExp(imageUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), publicPath)
    }
    
    // Substituir no frontmatter se for coverImage
    if (data.coverImage === imageUrl) {
      updatedData.coverImage = publicPath
    }
  }
  
  // Atualizar arquivo se houver mudanças
  if (downloadedImages.length > 0 || localImageRefs.size > 0) {
    const frontmatter = matter.stringify(updatedContent, updatedData)
    fs.writeFileSync(fullPath, frontmatter, 'utf8')
    console.log(`   ✓ Post atualizado`)
    return { slug, updated: true, images: downloadedImages }
  }
  
  return { slug, updated: false, images: [] }
}

// Função principal
async function main() {
  console.log('🔍 Corrigindo nomes de imagens nos posts...\n')
  
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

