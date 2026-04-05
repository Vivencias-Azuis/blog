import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

let database: ReturnType<typeof drizzle> | null = null

function getLibsqlClientConfig() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured.')
  }

  if (process.env.DATABASE_URL.startsWith('file:')) {
    return {
      url: process.env.DATABASE_URL,
    }
  }

  return {
    url: process.env.DATABASE_URL,
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
