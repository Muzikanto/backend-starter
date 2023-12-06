FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY . .
RUN npm install -S
RUN npm run build

FROM node:alpine AS runner
WORKDIR /app

# Don't run production as root
#RUN addgroup --system --gid 1001 nodejs
#RUN adduser --system --uid 1001 nestjs
#USER nestjs

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/nest-cli.json .
COPY --from=builder /app/apps/gateway/.env ./apps/gateway/
COPY --from=builder /app/apps/worker/.env ./apps/worker/
