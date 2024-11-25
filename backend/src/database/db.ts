import { neon } from '@neondatabase/serverless'
import dotenv from 'dotenv'
import * as drizzlePostgresVercel from 'drizzle-orm/neon-http'
import * as drizzlePostgresJS from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

dotenv.config({
  path: '.env'
})

const client = postgres(process.env.DATABASE_URL, { prepare: false })
const connectionPostgresJS = drizzlePostgresJS.drizzle(client)

const sql = neon(process.env.DATABASE_URL!)
const connectionVercel = drizzlePostgresVercel.drizzle({ client: sql })

export const db =
  process.env.NODE_ENV === 'development'
    ? connectionPostgresJS
    : connectionVercel

// export const db = connectionPostgresJS
