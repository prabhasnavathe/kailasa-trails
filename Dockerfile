# Production Dockerfile for Kailasa Trails
FROM node:20-slim AS builder
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 1. Install dependencies (including patches)
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install

# 2. Build the application
COPY . .
ENV NODE_ENV=production
RUN pnpm run build

# -----------------
# Production Runner
# -----------------
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy node_modules and built code from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/data ./data
COPY --from=builder /app/client/public ./client/public
COPY --from=builder /app/package.json ./package.json

# Ensure data and uploads directories exist
RUN mkdir -p /app/data /app/dist/public/uploads /app/client/public/uploads

EXPOSE 3000

CMD ["node", "dist/index.js"]
