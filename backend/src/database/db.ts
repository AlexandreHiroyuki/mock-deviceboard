import dotenv from 'dotenv'
import * as drizzlePostgresJS from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

dotenv.config({
  path: '.env'
})

import { sql } from '@vercel/postgres'
import * as drizzlePostgresVercel from 'drizzle-orm/vercel-postgres'

const client = postgres(process.env.POSTGRES_URL, { prepare: false })
const connectionPostgresJS = drizzlePostgresJS.drizzle(client)

const connectionVercel = drizzlePostgresVercel.drizzle({ client: sql })

export const db =
  process.env.NODE_ENV === 'development'
    ? connectionPostgresJS
    : connectionVercel

// export const db = connectionPostgresJS
