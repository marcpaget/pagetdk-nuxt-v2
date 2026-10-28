import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    // Use @nuxt/test-utils environment for full Nuxt context in unit tests
    environment: 'nuxt',

    // Only include unit/component tests here — E2E lives in playwright.config.ts
    include: ['tests/unit/**/*.{test,spec}.{ts,js}'],

    // Optional: set up global test helpers
    globals: true,

    // Increase timeout for Nuxt environment spin-up if needed
    testTimeout: 20_000,
  },
})
