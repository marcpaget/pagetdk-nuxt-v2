FROM node:22-bookworm-slim AS build

WORKDIR /app

# Native modules such as better-sqlite3 need a compiler toolchain in the build stage.
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ pkg-config \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json .npmrc ./

RUN npm ci --include=dev

COPY . .

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0

RUN npm run build

FROM node:22-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV PORT=3000

COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
