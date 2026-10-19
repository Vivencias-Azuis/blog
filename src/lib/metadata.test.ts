import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { generateCanonicalUrl, generatePageMetadata } from '@/lib/metadata'

const robotsTxt = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '../../public/robots.txt'),
  'utf8',
)

function robotsOf(path: string) {
  return generatePageMetadata({
    title: 'Pagina',
    description: 'Descricao de teste.',
    path,
  }).robots
}

describe('generateCanonicalUrl', () => {
  it('keeps a trailing slash on the homepage', () => {
    expect(generateCanonicalUrl('/')).toBe('https://www.vivenciasazuis.com.br/')
  })
})

describe('generatePageMetadata robots', () => {
  it('indexes public pages', () => {
    expect(robotsOf('/sobre')).toEqual(
      expect.objectContaining({ index: true, follow: true }),
    )
    expect(robotsOf('/blog')).toEqual(
      expect.objectContaining({ index: true, follow: true }),
    )
  })

  it('noindexes Clerk and account surfaces so they stop ranking', () => {
    for (const path of ['/sign-in', '/sign-up', '/minha-area', '/minha-area/favoritos']) {
      expect(robotsOf(path), path).toEqual(
        expect.objectContaining({ index: false, follow: true }),
      )
    }
  })
})

describe('robots.txt', () => {
  it('disallows sign-in, sign-up and minha-area', () => {
    expect(robotsTxt).toContain('Disallow: /sign-in')
    expect(robotsTxt).toContain('Disallow: /sign-up')
    expect(robotsTxt).toContain('Disallow: /minha-area')
  })
})
