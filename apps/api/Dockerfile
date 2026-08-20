FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json ./
COPY apps/api/package.json ./apps/api/
RUN npm install --workspace=@deluxe/api --omit=dev

FROM node:22-alpine
RUN apk add --no-cache git
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/api/src ./apps/api/src
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "apps/api/src/index.js"]
