FROM node:18-slim AS builder
RUN apt-get update && apt-get install -y --no-install-recommends \
    libc6 curl wget \
    && rm -rf /var/lib/apt/lists/*
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .

RUN turbo prune --scope=web --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM node:18-slim AS installer
RUN apt-get update && apt-get install -y --no-install-recommends \
    libc6 curl wget \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Add build-time environment variables
ARG NEXT_PUBLIC_PLAUSIBLE_DOMAIN
ARG NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL
ENV NEXT_PUBLIC_PLAUSIBLE_DOMAIN=${NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
ENV NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL=${NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL}
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install
 
# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=web...
 
FROM node:18-slim AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Add build-time environment variables
ARG NEXT_PUBLIC_PLAUSIBLE_DOMAIN
ARG NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL
ENV NEXT_PUBLIC_PLAUSIBLE_DOMAIN=${NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
ENV NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL=${NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL}

 
CMD node apps/web/server.js -H 0.0.0.0