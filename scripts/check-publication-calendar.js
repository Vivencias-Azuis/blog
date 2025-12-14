#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const CALENDAR_PATH = path.join(process.cwd(), 'docs/publication-calendar.md')
const POSTS_DIR = path.join(process.cwd(), 'src/content/posts')

function fileExists(slug) {
  return fs.existsSync(path.join(POSTS_DIR, `${slug}.mdx`))
}

function updateCalendar(md) {
  const begin = '<!-- CALENDAR:BEGIN -->'
  const end = '<!-- CALENDAR:END -->'

  const start = md.indexOf(begin)
  const finish = md.indexOf(end)
  if (start === -1 || finish === -1 || finish <= start) {
    throw new Error('Calendar markers not found in docs/publication-calendar.md')
  }

  const before = md.slice(0, start + begin.length)
  const body = md.slice(start + begin.length, finish)
  const after = md.slice(finish)

  const updatedBody = body
    .split('\n')
    .map((line) => {
      if (!line.trim().startsWith('|')) return line
      if (line.includes('|---')) return line
      if (line.includes('| Data |')) return line

      const parts = line.split('|').map((p) => p.trim())
      // parts[0] and last are empty because line starts/ends with |
      // Columns: Data, Dia, Categoria, Keyword, Título, Slug, Criado, Publicado
      const slug = parts[6]
      if (!slug || slug === 'Slug') return line

      const created = fileExists(slug) ? '[x]' : '[ ]'
      parts[7] = created

      return `| ${parts.slice(1, -1).join(' | ')} |`
    })
    .join('\n')

  return `${before}${updatedBody}${after}`
}

function main() {
  const original = fs.readFileSync(CALENDAR_PATH, 'utf8')
  const updated = updateCalendar(original)

  if (updated !== original) {
    fs.writeFileSync(CALENDAR_PATH, updated, 'utf8')
    console.log('✅ Updated docs/publication-calendar.md (Criado column)')
  } else {
    console.log('ℹ️  No changes needed (Criado column already up to date)')
  }
}

main()

