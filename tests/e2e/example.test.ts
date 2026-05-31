import { createPage, setup } from '@nuxt/test-utils/e2e'
import { expect, test } from '@playwright/test'

// @nuxt/test-utils automatically builds and starts your Nuxt app for E2E tests.
// `setup()` must be called once per file at the top level.
await setup({
  // rootDir points at the project root relative to this test file
  rootDir: '../../',
  browser: true,
})

test('homepage loads and has expected title', async () => {
  const page = await createPage('/')
  await expect(page).toHaveTitle(/Nuxt/) // replace with your actual title
})

test('navigation works', async () => {
  const page = await createPage('/')
  // Example: check that an <a> link navigates correctly
  // const link = page.getByRole('link', { name: 'About' })
  // await link.click()
  // await expect(page).toHaveURL('/about')
  expect(true).toBe(true) // placeholder — replace with real assertions
})
