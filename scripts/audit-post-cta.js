import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT_DIR = process.cwd()
const POSTS_DIR = path.join(ROOT_DIR, 'src/content/posts')
const POST_TEMPLATE = path.join(ROOT_DIR, 'src/app/blog/[slug]/page.tsx')
const ANALYTICS_FILE = path.join(ROOT_DIR, 'src/components/GoogleAnalytics.tsx')

function getSection(content, heading) {
  const headingRegex = new RegExp(`^##\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'm')
  const startMatch = headingRegex.exec(content)
  if (!startMatch) return null

  const start = startMatch.index + startMatch[0].length
  const tail = content.slice(start)
  const nextHeading = tail.search(/^##\s+/m)
  return nextHeading === -1 ? tail : tail.slice(0, nextHeading)
}

async function auditPostFiles() {
  const files = (await readdir(POSTS_DIR)).filter((file) => file.endsWith('.mdx'))
  const failures = []
  let postsUsingTemplateFallback = 0
  let postsWithInlineCtaSection = 0

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file)
    const content = await readFile(filePath, 'utf8')
    const ctaSection = getSection(content, 'Próximo passo (CTA)')

    if (!ctaSection) {
      postsUsingTemplateFallback += 1
      continue
    }
    postsWithInlineCtaSection += 1

    const links = ctaSection.match(/\[[^\]]+\]\([^)]+\)/g) || []
    if (links.length < 1) {
      failures.push(`${file}: seção "Próximo passo (CTA)" sem links`)
    }
  }

  return {
    total: files.length,
    failures,
    postsUsingTemplateFallback,
    postsWithInlineCtaSection,
  }
}

async function auditTemplateAndTracking() {
  const failures = []
  const template = await readFile(POST_TEMPLATE, 'utf8')
  const analytics = await readFile(ANALYTICS_FILE, 'utf8')

  if (!template.includes('<PostIntentCTA intent={intent} placement="mid" tone="light" />')) {
    failures.push('Template de post sem CTA de meio padronizado')
  }
  if (!template.includes('<PostIntentCTA intent={intent} placement="end" tone="dark" />')) {
    failures.push('Template de post sem CTA de fim padronizado')
  }
  if (!analytics.includes('if (!el.dataset.cta) return')) {
    failures.push('Tracking sem proteção de ruído (click_cta sem data-cta)')
  }

  return failures
}

async function main() {
  const postAudit = await auditPostFiles()
  const structuralFailures = await auditTemplateAndTracking()
  const allFailures = [...postAudit.failures, ...structuralFailures]

  console.log(`Posts auditados: ${postAudit.total}`)
  console.log(`Com seção inline de CTA: ${postAudit.postsWithInlineCtaSection}`)
  console.log(`Usando CTA padrão de template: ${postAudit.postsUsingTemplateFallback}`)
  if (allFailures.length === 0) {
    console.log('CTA audit: OK')
    return
  }

  console.error('CTA audit: FALHOU')
  for (const failure of allFailures) {
    console.error(`- ${failure}`)
  }
  process.exitCode = 1
}

main().catch((error) => {
  console.error('Falha ao executar auditoria de CTA')
  console.error(error)
  process.exitCode = 1
})
