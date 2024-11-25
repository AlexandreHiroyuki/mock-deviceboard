import { Secret } from 'jsonwebtoken'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      DB_HOST: string
      DB_PORT: number
      DB_NAME: string
      DB_USERNAME: string
      DB_PASSWORD: string
      CLIENT_ORIGIN: string
      DATABASE_URL: string
      JWT_SECRET: Secret
    }
  }
}

export {}
