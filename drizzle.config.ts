import { getDatabaseUrl, ENV } from './src/env_config/env'
import { defineConfig } from 'drizzle-kit'

console.log('ENV', ENV.DATABASE_URL)

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: getDatabaseUrl(),
  },
})
