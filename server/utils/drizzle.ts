import { drizzle } from 'drizzle-orm/postgres-js'
import { createError } from 'h3'
import postgres from 'postgres'
import * as schema from '../../db/schema'

const clients = new Map<string, ReturnType<typeof createDb>>()

function createDb(connectionString: string) {
  const client = postgres(connectionString, {
    prepare: false,
    max: 1,
    idle_timeout: 20,
    connect_timeout: 30,
    onnotice: () => {},
  })

  return (drizzle as any)({
    client,
    // The installed RC type omits `schema` on the object overload, but the runtime supports it.
    schema,
  })
}

export function useDrizzle() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'DATABASE_URL is not configured.',
    })
  }

  let db = clients.get(databaseUrl)

  if (!db) {
    db = createDb(databaseUrl)
    clients.set(databaseUrl, db)
  }

  return db
}
