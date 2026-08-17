FROM node:18-alpine AS deps

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY index.js ./
COPY controllers ./controllers
COPY middleware ./middleware
COPY models ./models
COPY routes ./routes
COPY services ./services
COPY public ./public

EXPOSE 6001

CMD ["node", "index.js"]
