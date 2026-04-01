import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { normalizeSlug } from '@/lib/posts'

export interface AffiliateProduct {
  id: string
  title: string
  href: string
  merchant: string
  description: string
  sourcePostSlug: string
  sourcePostTitle: string
  sourcePostExcerpt: string
  sourcePostCoverImage?: string
  category: string
}

const postsDirectory = path.join(process.cwd(), 'src/content/posts')
const affiliateLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g
const affiliateHosts = new Set([
  'lojamundoautista.com.br',
  'mercadolivre.com',
  'www.mercadolivre.com',
  'shopee.com.br',
  'www.shopee.com.br',
  'hotmart.com',
  'www.hotmart.com',
  'amazon.com.br',
  'www.amazon.com.br',
  'amzn.to',
])

function inferMerchant(hostname: string): string {
  if (hostname.includes('mercadolivre')) return 'Mercado Livre'
  if (hostname.includes('shopee')) return 'Shopee'
  if (hostname.includes('hotmart')) return 'Hotmart'
  if (hostname.includes('amazon') || hostname.includes('amzn.to')) return 'Amazon'
  if (hostname.includes('lojamundoautista')) return 'Mundo Autista'
  return hostname.replace(/^www\./, '')
}

function isAffiliateUrl(rawUrl: string): boolean {
  try {
    const url = new URL(rawUrl)
    if (url.searchParams.has('lm')) return true
    if ((url.searchParams.get('utm_source') || '').toLowerCase() === 'affiliate') return true
    if (url.hostname.includes('mercadolivre') && url.pathname.startsWith('/sec/')) return true
    return affiliateHosts.has(url.hostname)
  } catch {
    return false
  }
}

function cleanHeading(rawHeading: string): string {
  return rawHeading
    .replace(/^#+\s*/, '')
    .replace(/^\d+\.\s*/, '')
    .replace(/\s*[-–:].*$/, '')
    .trim()
}

function findNearestHeading(content: string, index: number): string | null {
  const lines = content.slice(0, index).split('\n').reverse()

  for (const line of lines) {
    if (/^#{2,3}\s+/.test(line.trim())) {
      return cleanHeading(line.trim())
    }
  }

  return null
}

function normalizeTitle(label: string, heading: string | null, merchant: string): string {
  const cleanedLabel = label
    .replace(/^visite\s+a\s+loja\s+/i, '')
    .replace(/^visite\s+/i, '')
    .replace(/^comece explorando a\s+/i, '')
    .replace(/^ver\s+/i, '')
    .replace(/\s+com desconto por aqui$/i, '')
    .replace(new RegExp(`\\s+no\\s+${merchant}$`, 'i'), '')
    .trim()

  if (heading && heading.length > 2) return heading
  return cleanedLabel || merchant
}

function buildDescription(heading: string | null, excerpt: string, merchant: string): string {
  if (heading) {
    return `${heading} selecionado no blog e reunido aqui para facilitar a compra em ${merchant}.`
  }

  return excerpt
}

export function getAffiliateProducts(): AffiliateProduct[] {
  if (!fs.existsSync(postsDirectory)) return []

  const today = new Date()
  today.setHours(23, 59, 59, 999)

  const items = new Map<string, AffiliateProduct>()

  for (const fileName of fs.readdirSync(postsDirectory).filter((entry) => entry.endsWith('.mdx'))) {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const datetime = data.datetime || data.date || new Date().toISOString()

    if (new Date(datetime) > today) continue

    let match: RegExpExecArray | null
    while ((match = affiliateLinkPattern.exec(content)) !== null) {
      const [, label, href] = match
      if (!isAffiliateUrl(href) || items.has(href)) continue

      const hostname = new URL(href).hostname
      const merchant = inferMerchant(hostname)
      const heading = findNearestHeading(content, match.index)
      const sourcePostSlug = normalizeSlug(fileName)

      items.set(href, {
        id: `${sourcePostSlug}-${items.size + 1}`,
        title: normalizeTitle(label, heading, merchant),
        href,
        merchant,
        description: buildDescription(heading, data.excerpt || '', merchant),
        sourcePostSlug,
        sourcePostTitle: data.title || sourcePostSlug,
        sourcePostExcerpt: data.excerpt || '',
        sourcePostCoverImage: data.coverImage || data.image || undefined,
        category: data.category || 'Geral',
      })
    }
  }

  return Array.from(items.values()).sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
}
