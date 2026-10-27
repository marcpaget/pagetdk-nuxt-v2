// This file extends the Nuxt runtime configuration types to include the `sentry` property.
import '@nuxt/schema';

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    sentry: {
      dsn: string;
    };
  }
}