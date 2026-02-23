# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.22

# Base stage: Installs shared dependencies
FROM node:${NODE_VERSION}-alpine AS base
ENV PNPM_HOME="/app/.pnpm"
ENV PNPM_STORE_PATH="/app/.pnpm-store"
ENV PATH="${PNPM_HOME}:${PATH}"

WORKDIR /app

# Set system user
RUN addgroup --system app && adduser --system app

# Base stage: Installs shared dependencies, uses pnpm cache
COPY package*.json .npmrc* pnpm-lock.yaml ./
RUN npm install -g pnpm@10
RUN pnpm config set store-dir "${PNPM_STORE_PATH}"

# Prod stage: Builds the final node_modules
FROM base AS prod-dep
RUN pnpm install --prod --frozen-lockfile

# Build stage: Builds the application
FROM base AS build
RUN pnpm install --frozen-lockfile
# Copy all source files
COPY . .
# Run the build command (compile typescript into javascript).
RUN pnpm run build

# Production runtime stage: Uses a minimal image to run the built app
FROM node:${NODE_VERSION}-alpine AS final
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system app && adduser --system app

# Copy production dependencies and built application
COPY --from=prod-dep --chown=app:app /app/node_modules ./node_modules
COPY --from=prod-dep --chown=app:app /app/.pnpm-store ./.pnpm-store
# Copy compiled JavaScript for running the app
COPY --from=build --chown=app:app /app/dist ./dist
COPY --from=build --chown=app:app /app/package*.json ./

# Switch to non-root user
USER app

# Expose port and start command
EXPOSE 5000
CMD ["sh", "-c", "npm run start"]
