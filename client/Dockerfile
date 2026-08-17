FROM node:18-alpine AS build

WORKDIR /app

ENV GENERATE_SOURCEMAP=false \
    CI=true

COPY package*.json ./
RUN npm ci

COPY jsconfig.json ./
COPY public ./public
COPY src ./src

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
