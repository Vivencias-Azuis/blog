import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

let database: ReturnType<typeof drizzle> | null = null

function getLibsqlClientConfig() {
  const filePath = process.env.DATABASE_PATH?.trim()
  const url = filePath
    ? filePath.startsWith('file:')
      ? filePath
      : `file:${filePath}`
    : process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL

  if (!url) {
    throw new Error(
      'DATABASE_PATH, DATABASE_URL or TURSO_DATABASE_URL is not configured.',
    )
  }

  if (url.startsWith('file:') || url === ':memory:') {
    return { url }
  }

  return {
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  }
}

export function getDb() {
  if (database) {
    return database
  }

  const client = createClient(getLibsqlClientConfig())

  database = drizzle(client)
  return database
}
