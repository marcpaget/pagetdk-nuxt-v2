# ─── Stage 1: Install dependencies ───────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Install only production + dev deps for the build
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# ─── Stage 2: Build the Nuxt app ──────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Optional: expose a build-time public env var (set in CI via --build-arg)
ARG NUXT_PUBLIC_APP_VERSION=unknown
ENV NUXT_PUBLIC_APP_VERSION=$NUXT_PUBLIC_APP_VERSION

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ─── Stage 3: Production runner ───────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Nuxt listens on 3000 by default; Coolify/Dokploy will map this to their port
EXPOSE 3000

# Copy only the built output — no source code, no dev deps
COPY --from=builder /app/.output ./

# Run as a non-root user for security
RUN addgroup --system nuxt && adduser --system --ingroup nuxt nuxt
USER nuxt

CMD ["node", "server/index.mjs"]
