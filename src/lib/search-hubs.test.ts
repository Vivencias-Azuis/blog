import { describe, expect, it } from 'vitest'
import { getAllPosts, getFeaturedPosts } from '@/lib/posts'
import {
  FOOTER_GUIDE_LINKS,
  HOME_FEATURED_SLUGS,
  SEARCH_HUB_SLUGS,
  getSitemapPriority,
} from '@/lib/search-hubs'

const ABA_VALOR = 'terapia-aba-valor-2026-preco-sessoes-e-reembolso'
const PLANOS = 'melhores-planos-de-saude-para-criancas-com-autismo'
const PECS = 'como-funciona-picture-exchange-communication-system-pecs'
const DICIONARIO = 'dicionario-para-pais-de-criancas-autistas'
const NIVEIS = 'niveis-de-suporte-no-tea-e-seu-papel-no-diagnostic'

describe('search hubs', () => {
  it('keeps the Search Console money pages as hubs', () => {
    expect(SEARCH_HUB_SLUGS).toEqual(expect.arrayContaining([ABA_VALOR, PLANOS, PECS, DICIONARIO, NIVEIS]))
  })

  it('gives hub priority 0.9 even when the post is old', () => {
    const old = new Date('2025-08-03T12:00:00.000Z')
    const now = new Date('2026-10-01T12:00:00.000Z')

    expect(getSitemapPriority(ABA_VALOR, old, now)).toBe(0.9)
    expect(getSitemapPriority(DICIONARIO, old, now)).toBe(0.9)
    expect(getSitemapPriority(NIVEIS, old, now)).toBe(0.9)
  })

  it('does not treat the dictionary as a low-priority page', () => {
    const old = new Date('2025-08-03T12:00:00.000Z')
    const now = new Date('2026-10-01T12:00:00.000Z')

    expect(getSitemapPriority(DICIONARIO, old, now)).toBeGreaterThan(0.6)
  })

  it('features the three pages that used to bring clicks on the homepage', () => {
    expect([...HOME_FEATURED_SLUGS]).toEqual([ABA_VALOR, PLANOS, PECS])
  })

  it('puts those same pages in the footer so every URL points to them', () => {
    const hrefs = FOOTER_GUIDE_LINKS.map((link) => link.href)

    expect(hrefs).toEqual(
      expect.arrayContaining([
        `/blog/${ABA_VALOR}`,
        `/blog/${PLANOS}`,
        `/blog/${PECS}`,
        `/blog/${DICIONARIO}`,
        `/blog/${NIVEIS}`,
      ]),
    )
  })

  it('renders the money pages first in the homepage featured list', () => {
    expect(getFeaturedPosts().map((post) => post.slug)).toEqual([...HOME_FEATURED_SLUGS])
  })

  it('only lists published posts in hubs and footer', () => {
    const published = new Set(getAllPosts().map((post) => post.slug))

    for (const slug of SEARCH_HUB_SLUGS) {
      expect(published.has(slug), slug).toBe(true)
    }

    for (const link of FOOTER_GUIDE_LINKS) {
      expect(published.has(link.href.replace('/blog/', '')), link.href).toBe(true)
    }
  })
})
