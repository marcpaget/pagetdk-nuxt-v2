FROM node:22-bookworm-slim AS build

WORKDIR /app

# Native modules such as better-sqlite3 need a compiler toolchain in the build stage.
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ pkg-config \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json .npmrc ./

RUN npm ci --include=dev
# The v13 linux-arm64 prebuild requires glibc 2.38, while Bookworm ships 2.36.
# Remove it before rebuilding so better-sqlite3 loads the Bookworm-compatible addon.
RUN rm node_modules/better-sqlite3/prebuilds/linux-arm64.node \
  && npm rebuild better-sqlite3 --build-from-source

COPY . .

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0

RUN npm run build
RUN npm prune --omit=dev
RUN node -e "const Database = require('better-sqlite3'); new Database(':memory:').close()"

FROM node:22-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV PORT=3000

COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
