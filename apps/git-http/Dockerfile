FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json ./
COPY apps/git-http/package.json ./apps/git-http/
RUN npm install --workspace=@deluxe/git-http --omit=dev

FROM node:22-alpine
RUN apk add --no-cache git
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY apps/git-http/package.json ./apps/git-http/
COPY apps/git-http/src ./apps/git-http/src
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "apps/git-http/src/index.js"]
