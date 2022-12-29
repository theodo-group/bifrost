FROM node:hydrogen-alpine3.16 AS pnpm-installed
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
ENV PNPM_HOME=/usr/local/.pnpm
ENV PATH="$PATH:/usr/local/.pnpm"
RUN corepack enable && corepack prepare pnpm@7.14.2 --activate

FROM pnpm-installed AS turbo-installed
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN pnpm add --global turbo
# Rebuild the source code only when needed
FROM turbo-installed AS builder
WORKDIR /app
COPY . .
RUN turbo prune --scope='@bifrost-starter/backend' --docker

# Add lockfile and package.json's of isolated subworkspace
FROM turbo-installed AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .

RUN HUSKY=0 pnpm install && \
  pnpm build --scope='@bifrost-starter/backend' && \
  rm -rf **/src **/.turbo node_modules **/node_modules && \
  pnpm install --production

FROM node:hydrogen-alpine3.16 AS runner
RUN apk add --no-cache dumb-init

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs
COPY --from=installer --chown=nestjs:nestjs /app .

CMD dumb-init node apps/backend/dist/main.js
