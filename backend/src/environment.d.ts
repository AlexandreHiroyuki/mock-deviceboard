import { PrivateKey } from 'jsonwebtoken'

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
      POSTGRES_URL: string
      JWT_SECRET: PrivateKey
    }
  }
}

export {}
