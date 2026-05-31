import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  // E2E tests live here; unit tests are handled by vitest.config.ts
  testDir: './tests/e2e',
  testMatch: '**/*.{test,spec}.{ts,js}',

  // Retry once on CI to reduce flakiness
  retries: process.env.CI ? 1 : 0,

  // Run tests in parallel (set to 1 if your server can't handle concurrent load)
  workers: process.env.CI ? 2 : undefined,

  // Reporter: HTML for CI artifact upload, line for local dev
  reporter: process.env.CI ? [['html', { open: 'never' }], ['github']] : 'line',

  use: {
    // @nuxt/test-utils spins up the dev/preview server automatically
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Let @nuxt/test-utils handle the server via the `setup` fixture in your tests.
  // If you prefer a global server, uncomment below:
  //
  // webServer: {
  //   command: 'npm run preview',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
