#!/usr/bin/env node

import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const ROOT_DIR = process.cwd()
const POSTS_DIR = path.join(ROOT_DIR, 'src/content/posts')
const SRC_DIR = path.join(ROOT_DIR, 'src')
const BASE_URL = 'https://www.vivenciasazuis.com.br'

const CANONICAL_POST_REDIRECTS = {
  'melhor-plano-de-saude-para-autismo-guia-completo': 'melhores-planos-de-saude-para-criancas-com-autismo',
  'melhor-plano-de-saude-para-crianca-autista-checklist-2026': 'melhores-planos-de-saude-para-criancas-com-autismo',
  'qual-plano-de-saude-cobre-terapia-aba-2026': 'qual-plano-de-saude-cobre-terapia-aba-autismo',
  'comunicacao-nao-verbal-autismo-o-que-fazer-guia-2026': 'crianca-autista-nao-fala-passo-a-passo-2026',
  'psicologia-aba-como-funciona-na-pratica-2026': 'aba-para-pais',
  'lei-berenice-piana-atualizada-2026-pdf-e-direitos': 'lei-berenice-piana-marco-legal-dos-direitos-dos-autistas-no-brasil',
  'como-conseguir-vaga-hospitais-clinicas-gratuitas-tea': 'hospitais-e-clinicas-gratuitas-para-autistas-no-br',
}

const STATIC_ROUTES = new Set([
  '/',
  '/blog',
  '/sobre',
  '/lojinha',
  '/contato',
  '/apoie',
  '/metodologia-editorial',
  '/politica-de-privacidade',
  '/termos-de-uso',
])

const NEXT_CONFIG_REDIRECTS = {
  '/blog/CIPTEA-carteira-de-identificacao-da-pessoa-com-transtorno-do-espectro-autista': '/blog/ciptea-carteira-identificacao-pessoa-tea',
  '/blog/ciptea-carteira-de-identificacao-da-pessoa-com-transtorno-do-espectro-autista': '/blog/ciptea-carteira-identificacao-pessoa-tea',
  '/blog/Guia-Completo-Tudo-que-os-Pais-de-Autistas-de-Primeira-Viagem-Precisam-Saber': '/blog/guia-completo-pais-autistas-primeira-viagem',
  '/blog/Guia-Computistas-de-Primeira-Viagem-Precisam-Saber': '/blog/guia-completo-pais-autistas-primeira-viagem',
  '/blog/guia-completo-tudo-que-os-pais-de-autistas-de-primeira-viagem-precisam-saber': '/blog/guia-completo-pais-autistas-primeira-viagem',
  '/blog/Gratuidades-Autistas-Garantidas-por-Lei-no-Brasil': '/blog/gratuidades-autistas-garantidas-lei-brasil',
  '/blog/gratuidades-autistas-garantidas-por-lei-no-brasil': '/blog/gratuidades-autistas-garantidas-lei-brasil',
  '/blog/comunicação-aumentativa-e-alternativa-caa': '/blog/comunicacao-aumentativa-e-alternativa-caa',
  '/blog/autism': '/blog',
  '/blog/qual-plano-de-saude-cobre-tratamento-para-autismo': '/blog/melhores-planos-de-saude-para-criancas-com-autismo',
  ...Object.fromEntries(
    Object.entries(CANONICAL_POST_REDIRECTS).map(([source, destination]) => [
      `/blog/${source}`,
      `/blog/${destination}`,
    ]),
  ),
}

async function walkFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await walkFiles(fullPath))
      continue
    }

    if (/\.(tsx|ts|mdx|jsx|js)$/.test(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

function extractInternalLinks(content) {
  const links = new Set()

  const markdownLinks = content.matchAll(/\[[^\]]*\]\((\/[^)\s#?]+)[^)]*\)/g)
  for (const match of markdownLinks) {
    links.add(match[1].split('#')[0])
  }

  const hrefLinks = content.matchAll(/href=["'](\/[^"'#?]+)["']/g)
  for (const match of hrefLinks) {
    links.add(match[1].split('#')[0])
  }

  return [...links]
}

function isStaticAsset(route) {
  return (
    route.startsWith('/images/')
    || route.startsWith('/_next/')
    || /\.(?:png|jpe?g|webp|gif|svg|ico|woff2?|txt|xml|js|css)$/i.test(route)
  )
}

function resolveRoute(route) {
  if (isStaticAsset(route)) {
    return { ok: true, resolved: route }
  }

  if (NEXT_CONFIG_REDIRECTS[route]) {
    return resolveRoute(NEXT_CONFIG_REDIRECTS[route])
  }

  if (STATIC_ROUTES.has(route)) {
    return { ok: true, resolved: route }
  }

  if (route.startsWith('/blog?')) {
    return { ok: true, resolved: route }
  }

  if (route.startsWith('/autores/')) {
    return { ok: true, resolved: route }
  }

  const blogMatch = route.match(/^\/blog\/([^/]+)$/)
  if (blogMatch) {
    const slug = blogMatch[1]
    if (publishedSlugs.has(slug)) {
      return { ok: true, resolved: route }
    }

    const canonical = CANONICAL_POST_REDIRECTS[slug]
    if (canonical && publishedSlugs.has(canonical)) {
      return { ok: true, resolved: `/blog/${canonical}`, redirectedFrom: route }
    }

    return { ok: false, resolved: route }
  }

  return { ok: false, resolved: route }
}

let publishedSlugs = new Set()

async function loadPublishedSlugs() {
  const files = (await readdir(POSTS_DIR)).filter((file) => file.endsWith('.mdx'))
  const today = new Date()
  today.setHours(23, 59, 59, 999)

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '')
    if (slug in CANONICAL_POST_REDIRECTS) continue

    const content = await readFile(path.join(POSTS_DIR, file), 'utf8')
    const { data } = matter(content)
    const postDate = new Date(data.datetime || data.date || new Date().toISOString())
    if (postDate <= today) {
      publishedSlugs.add(slug)
    }
  }
}

async function main() {
  await loadPublishedSlugs()

  const sourceFiles = await walkFiles(SRC_DIR)
  const publicFiles = [
    path.join(ROOT_DIR, 'public/llms.txt'),
    path.join(ROOT_DIR, 'public/robots.txt'),
  ]

  const issues = []

  for (const filePath of [...sourceFiles, ...publicFiles]) {
    const content = await readFile(filePath, 'utf8')
    const links = extractInternalLinks(content)

    for (const link of links) {
      const result = resolveRoute(link)
      if (!result.ok) {
        issues.push({
          file: path.relative(ROOT_DIR, filePath),
          link,
        })
      }
    }
  }

  if (issues.length === 0) {
    console.log('✅ Nenhum link interno quebrado encontrado.')
    return
  }

  console.log(`⚠️  ${issues.length} link(s) interno(s) potencialmente quebrado(s):`)
  for (const issue of issues) {
    console.log(`- ${issue.file}: ${issue.link}`)
  }

  process.exitCode = 1
}

main().catch((error) => {
  console.error('❌ Erro ao auditar links internos:', error)
  process.exit(1)
})