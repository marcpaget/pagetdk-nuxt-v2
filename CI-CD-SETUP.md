# Nuxt CI/CD Pipeline — Setup Guide

## How the pipeline works

```
push to main
     │
     ├─► unit-test  ──┐
     │                ├─► build-and-push (ghcr.io) ──► deploy-coolify
     └─► e2e-test  ──┘                               └─► deploy-dokploy
```

Pull requests only run the test jobs — no image is built and nothing is deployed.

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
| `COOLIFY_WEBHOOK_URL` | Full webhook URL from Coolify (includes the token as a query param **or** use the separate token header — see §4) |
| `COOLIFY_WEBHOOK_TOKEN` | Bearer token shown in Coolify's webhook settings |
| `DOKPLOY_WEBHOOK_URL` | Full webhook URL from Dokploy |
| `DOKPLOY_WEBHOOK_TOKEN` | Token shown in Dokploy's webhook settings |

`GITHUB_TOKEN` is provided automatically — no setup needed for pushing to ghcr.io.

### Repository variables (non-sensitive)

| Variable name | Value |
|---|---|
| `DEPLOY_TARGET` | `coolify`, `dokploy`, or `both` |

---

## 3. Make your Coolify/Dokploy app use the ghcr.io image

Both platforms need to be pointed at the Docker image that CI pushes, rather than building from source themselves.

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

If you keep it private, add a deploy token and configure it as a registry credential in Coolify/Dokploy.

---

## 4. Coolify — webhook setup

1. In Coolify, open your application → **Settings** → scroll to **Webhooks**.
2. Enable **"Deploy Webhook"** and copy the URL + token.
3. Set the application's **Build Pack** to **"Docker Image"** and enter the image name:
   ```
   ghcr.io/<org>/<repo>:latest
   ```
4. Save the URL as `COOLIFY_WEBHOOK_URL` and the token as `COOLIFY_WEBHOOK_TOKEN` in GitHub.

Coolify's redeploy webhook is a `GET` request authenticated via `Authorization: Bearer <token>` — the workflow already does this.

---

## 5. Dokploy — webhook setup

1. In Dokploy, open your application → **General** → **Deployments** → **Webhook**.
2. Copy the webhook URL and token shown there.
3. Set the application's **Docker Image** to:
   ```
   ghcr.io/<org>/<repo>:latest
   ```
4. Save the URL as `DOKPLOY_WEBHOOK_URL` and the token as `DOKPLOY_WEBHOOK_TOKEN` in GitHub.

Dokploy's webhook expects a `POST` with `x-dokploy-token` header — the workflow already does this.

---

## 6. nuxt.config.ts — enable the test utils module

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

## 7. Environment variables for your Nuxt app

Set runtime secrets in Coolify/Dokploy's **Environment** panel (not in `.env` files committed to git). Use `NUXT_` prefix for Nuxt runtime config:

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
