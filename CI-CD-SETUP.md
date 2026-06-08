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
| `DOKPLOY_API_URL` | `https://<your-dokploy-domain>/api/application.deploy` |
| `DOKPLOY_API_TOKEN` | API token generated in your Dokploy profile |
| `DOKPLOY_APPLICATION_ID` | Application ID for the Dokploy app |

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

## 4. Dokploy — image + API deploy setup

1. Change the deployment type away from source/Nixpacks and set the application's **Docker Image** to:
   ```
   ghcr.io/<org>/<repo>:latest
   ```
2. If the package is private, add GHCR registry credentials in Dokploy.
3. In Dokploy, generate an API token from your profile settings.
4. Set `DOKPLOY_API_URL` to:
   ```
   https://<your-dokploy-domain>/api/application.deploy
   ```
5. Find the app's `applicationId` via Dokploy API or UI and save it as `DOKPLOY_APPLICATION_ID`.
6. Save the token as `DOKPLOY_API_TOKEN` in GitHub secrets.

Dokploy recommends the API method for external registries such as GHCR.

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
NUXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NUXT_PUBLIC_SUPABASE_KEY=<your-anon-or-publishable-key>
```

---

## 7. Health checks

The app exposes:

```
/health
```

Use that in Dokploy health checks so failed deployments can roll back automatically.

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
