import { existsSync, readFileSync } from 'node:fs'
import { defineConfig } from 'drizzle-kit'

function loadLocalEnvFile() {
  const path = '.env.local'

  if (!existsSync(path)) {
    return
  }

  const content = readFileSync(path, 'utf8')

  for (const line of content.split('\n')) {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const separatorIndex = trimmed.indexOf('=')

    if (separatorIndex === -1) {
      continue
    }

    const key = trimmed.slice(0, separatorIndex)
    const value = trimmed.slice(separatorIndex + 1)

    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

loadLocalEnvFile()

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required for Drizzle config.')
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: process.env.DATABASE_URL.startsWith('file:')
    ? {
        url: process.env.DATABASE_URL,
      }
    : {
        url: process.env.DATABASE_URL,
        token: process.env.TURSO_AUTH_TOKEN,
      },
})
