import { serve } from '@hono/node-server'
import dotenv from 'dotenv'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { routes } from './routes.js'

dotenv.config({
  path: '.env'
})

const port = Number(process.env.PORT) || 3000

const app = new Hono()
app.use(logger())
app.use(
  '*',
  cors({
    origin: [String(process.env.CLIENT_ORIGIN)],
    allowHeaders: ['Content-Type', 'Authorization', 'UserId'],
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true
  })
)

app.route('/', routes)

serve({
  fetch: app.fetch,
  port
})

console.log('Server running...')
