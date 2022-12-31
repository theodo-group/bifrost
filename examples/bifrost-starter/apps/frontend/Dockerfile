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
RUN turbo prune --scope='@bifrost-starter/frontend' --docker

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
  pnpm build --scope='@bifrost-starter/frontend' && \
  rm -rf **/src **/.turbo node_modules **/node_modules


FROM node:hydrogen-alpine3.16 AS runner
RUN apk add --no-cache dumb-init
WORKDIR /app
ENV NODE_ENV production

# Don't run production as root
RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs


# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nextjs /app/apps/frontend/public /app/apps/frontend/public
COPY --from=installer --chown=nextjs:nextjs /app/apps/frontend/.next/standalone ./
COPY --from=installer --chown=nextjs:nextjs /app/apps/frontend/.next/static /app/apps/frontend/.next/static
# handling runtime env var clientside
COPY --chown=nextjs:nextjs apps/frontend/gen_env.sh /app/apps/frontend/gen_env.sh
COPY --chown=nextjs:nextjs apps/frontend/.env.* /app/apps/frontend/


USER nextjs
# COPY --from=installer --chown=nestjs:nestjs /app .
ENV APP_ENV production
ENV PORT 3000
EXPOSE 3000

CMD cd /app/apps/frontend && /app/apps/frontend/gen_env.sh $APP_ENV && \
  dumb-init node /app/apps/frontend/server.js



