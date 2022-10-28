FROM node:gallium-alpine3.14 AS pnpm-installed
ARG PNPM_VERSION=7.14.0
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /app

FROM pnpm-installed AS builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
RUN pnpm install --frozen-lockfile --filter frontend
COPY apps/frontend/. ./apps/frontend/
RUN cd apps/frontend/ && pnpm build


# Production image, copy all the files and run next
FROM node:gallium-alpine3.14@sha256:889139aa824c8b9dd29938eecfd300d51fc2e984f9cd03df391bcfbe9cf10b53 AS runner
RUN apk add --no-cache dumb-init
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/apps/frontend/next.config.js ./apps/frontend/next.config.js
COPY --from=builder /app/apps/frontend/package.json ./apps/frontend/package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# copied at root because we are using monorepo setup with outputFileTracingRoot
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
# static and public files could be pushed to a CDN directly instead of serving them from nextjs.
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public

# handling runtime env var clientside
COPY --chown=nextjs:nodejs apps/frontend/gen_env.sh ./apps/frontend/
COPY --chown=nextjs:nodejs apps/frontend/.env.* ./apps/frontend/

USER nextjs

EXPOSE 80
ENV PORT 80
ENV APP_ENV staging
# dumb-init is used to properly handle the process signals (like interrupt)
CMD cd /app/apps/frontend && ./gen_env.sh $APP_ENV && dumb-init node server.js
