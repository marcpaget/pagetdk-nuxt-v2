import * as Sentry from '@sentry/nuxt';
import { useRuntimeConfig } from '#imports';

Sentry.init({
  // If set up, you can use your runtime config here
  dsn: ((useRuntimeConfig().public as unknown) as { sentry: { dsn: string } }).sentry.dsn,
});
