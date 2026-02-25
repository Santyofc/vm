# ============================================================
# Dockerfile — citas-gestion-zonasurtech
# Multi-stage build para Next.js output: standalone
# VM Target: Ubuntu 24.04, Nginx Reverse Proxy → puerto 3000
# ============================================================

# ── STAGE 1: DEPS ─────────────────────────────────────────
# Instala dependencias con npm ci para builds deterministas
FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma/

# npm ci garantiza reproducibilidad exacta respecto al lockfile
RUN npm ci

# ── STAGE 2: BUILDER ──────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache openssl

# Copiar deps ya instaladas desde la stage anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generar Prisma Client antes del build
RUN npx prisma generate

# DATABASE_URL dummy: Next.js importa PrismaClient en build-time
# pero no ejecuta queries. Sin este valor el build falla al
# leer el constructor del cliente (Prisma feature quirk).
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"

RUN npm run build

# ── STAGE 3: RUNNER (producción) ──────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Seguridad: proceso bajo usuario no-root
RUN addgroup --system --gid 1001 nodejs \
    && adduser  --system --uid 1001 nextjs

# ── Copiar output standalone ──
# Next.js standalone empaqueta un server.js autocontenido con
# solo las dependencias necesarias para runtime.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public          ./public

# Prisma en runtime: binaries + schema para migrate deploy
COPY --from=builder --chown=nextjs:nodejs /app/prisma                    ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma      ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma      ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma       ./node_modules/prisma

USER nextjs

EXPOSE 3000

# migrate deploy aplica migraciones pendientes sin prompt.
# node server.js inicia el servidor standalone de Next.js.
CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node server.js"]
