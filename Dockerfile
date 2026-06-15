# Node 24 LTS — enthält node:sqlite stabil (keine nativen DB-Deps nötig)
FROM node:24-alpine AS base
RUN apk add --no-cache git

# Clone and install dependencies
FROM base AS deps
WORKDIR /app
ARG CACHEBUST=1
# Cache automatisch brechen, sobald sich main ändert (wichtig für Panel-Deploys
# ohne Build-Args): die Commit-Metadaten ändern sich bei jedem neuen Commit und
# invalidieren damit die folgende Clone-Schicht. CACHEBUST bleibt als manueller
# Override (docker build --build-arg CACHEBUST=$(date +%s)).
ADD https://api.github.com/repos/reilix/Vayve-Webseite/commits/main /tmp/commit.json
RUN echo "cachebust=${CACHEBUST}" && git clone https://github.com/reilix/Vayve-Webseite.git .
RUN npm install

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app ./
RUN npm run build

# Production runner
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
# DB-Datei + Uploads liegen im gemounteten Volume
ENV DATA_DIR=/app/data

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Persistentes Datenverzeichnis (frisches Named-Volume erbt diese Ownership)
RUN mkdir -p /app/data/uploads && chown -R nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
