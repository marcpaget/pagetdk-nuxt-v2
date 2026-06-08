# Nuxt CI/CD Pipeline - Setup Guide

## How the pipeline works

```
push / pull_request
        │
        ├─► unit-test  ──┐
        └─► e2e-test   ──┘
                           push to main/master/cicd-pipeline
                                      │
                                      └─► build-and-push (ghcr.io) ──► deploy-dokploy
```

Pull requests only run the test jobs. Docker images are only built on pushes to `main`, `master`, or `cicd-pipeline`.
The production image is built as `linux/arm64`, intended for Oracle ARM instances such as Ampere Altra.

---

## 1. Install required dev dependencies

```bash
npm install -D \
  @nuxt/test-utils \
  vitest \
  @vue/test-utils \
  happy-dom \
  @playwright/test \
  playwright
```

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "test:unit": "vitest run",
    "test:e2e":  "playwright test"
  }
}
```

---

## 2. GitHub Actions secrets & variables

Go to **Settings → Secrets and variables → Actions** in your GitHub repository.

### Secrets (encrypted)

| Secret name | Value |
|---|---|
| `DOKPLOY_WEBHOOK_URL` | Full webhook URL from Dokploy |

`GITHUB_TOKEN` is provided automatically — no setup needed for pushing to ghcr.io.

---

## 3. Make your Dokploy app use the ghcr.io image

Dokploy must be pointed at the Docker image that CI pushes, rather than building from source with Nixpacks on the VPS.

The image tag pushed by CI is:

```
ghcr.io/<your-github-org-or-user>/<repo-name>:latest
```

A SHA-pinned tag is also pushed on every run:

```
ghcr.io/<your-github-org-or-user>/<repo-name>:sha-<short-sha>
```

### Make the ghcr.io package public (easiest)

Go to **github.com → Packages → your image → Package settings → Change visibility → Public**.

If you keep it private, add a deploy token and configure it as a registry credential in Dokploy.

---

## 4. Dokploy — image + webhook setup

1. In Dokploy, open your application → **General** → **Deployments** → **Webhook**.
2. Copy the webhook URL shown there.
3. Change the deployment type away from source/Nixpacks and set the application's **Docker Image** to:
   ```
   ghcr.io/<org>/<repo>:latest
   ```
4. If the package is private, add GHCR registry credentials in Dokploy.
5. Save the URL as `DOKPLOY_WEBHOOK_URL` in GitHub.

Dokploy's webhook is triggered directly from the full URL in the workflow.

---

## 5. nuxt.config.ts — enable the test utils module

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    // other modules...
  ],

  // Required for @nuxt/test-utils to work in vitest
  // (automatically excluded from production builds)
})
```

> `@nuxt/test-utils` registers itself via `defineVitestConfig` in `vitest.config.ts` —
> no explicit `modules` entry is needed unless you use its Nuxt module features.

---

## 6. Environment variables for your Nuxt app

Set runtime secrets in Dokploy's **Environment** panel (not in `.env` files committed to git). Use `NUXT_` prefix for Nuxt runtime config:

```
NUXT_SECRET_KEY=...
NUXT_PUBLIC_API_BASE=https://api.example.com
```

---

## File layout

```
.
├── .github/
│   └── workflows/
│       └── ci.yml          ← GitHub Actions pipeline
├── tests/
│   ├── unit/
│   │   └── example.test.ts ← Vitest unit tests
│   └── e2e/
│       └── example.test.ts ← Playwright E2E tests
├── Dockerfile               ← Multi-stage production image
├── .dockerignore
├── vitest.config.ts         ← Vitest + @nuxt/test-utils config
└── playwright.config.ts     ← Playwright config
```
