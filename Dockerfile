FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev


FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000

RUN apk add --no-cache tini
COPY --from=deps /app/node_modules ./node_modules

COPY . .
USER node

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD wget -qO- "http://127.0.0.1:${PORT}/" >/dev/null 2>&1 || exit 1
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "api/index"]
