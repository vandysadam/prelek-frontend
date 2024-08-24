# syntax = docker/dockerfile:experimental
# Build app
FROM public.ecr.aws/docker/library/node:16-alpine as builder
# Cache APK
RUN --mount=type=cache,target=/var/cache/apk ln -vs /var/cache/apk /etc/apk/cache && \
	apk add --no-cache libc6-compat
WORKDIR /build
COPY yarn.lock package.json ./
# Cache yarn
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install --frozen-lockfile
COPY . .
RUN yarn build
# RUN npm prune --production

FROM public.ecr.aws/docker/library/node:16-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 vultra
RUN yarn global add serve
USER vultra

# Copy needed files only
COPY --from=builder --chown=vultra:nodejs /build/.env ./.env
COPY --from=builder --chown=vultra:nodejs /build/node_modules ./node_modules
COPY --from=builder --chown=vultra:nodejs /build/package.json ./package.json
COPY --from=builder --chown=vultra:nodejs /build/dist ./dist

CMD npx serve -s ./dist -l tcp://0.0.0.0:${DOCKER_PORT:-3000}