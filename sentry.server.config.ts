import * as Sentry from '@sentry/nuxt'
import dotenv from 'dotenv'

// Only run `init` when process.env.SENTRY_DSN is available.
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: 'https://d9484096c62b81c05c57446949d10ebf@o4504724126302208.ingest.us.sentry.io/4510195874136064'
  })
}

dotenv.config()

Sentry.init({
  dsn: process.env.SENTRY_DSN,
})
