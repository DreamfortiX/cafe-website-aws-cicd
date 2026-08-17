# Cafe Project — Docker Files کی تفصیل (اردو)

یہ دستاویز اس پروجیکٹ میں موجود Docker فائلوں کی وضاحت کرتی ہے۔ ان فائلوں کا مقصد Cafe ایپ (Client + Server + MongoDB) کو ہلکے (lightweight) اور منظم طریقے سے چلانا ہے۔

---

## Docker Files کی فہرست

| فائل | مقام |
|------|------|
| `Dockerfile` | `client/Dockerfile` |
| `Dockerfile` | `server/Dockerfile` |
| `docker-compose.yml` | پروجیکٹ کی root directory |
| `.dockerignore` | `client/.dockerignore` |
| `.dockerignore` | `server/.dockerignore` |
| `nginx.conf` | `client/nginx.conf` |

---

## 1. Client Dockerfile (`client/Dockerfile`)

یہ فائل React client کو build کرتی ہے اور پھر nginx سے serve کرتی ہے۔

### Build Stage (پہلا مرحلہ)

```dockerfile
FROM node:18-alpine AS build
```
**مقصد:** Node.js 18 کا ہلکا (Alpine Linux) image استعمال کریں۔ `AS build` اس stage کو نام دیتا ہے تاکہ بعد میں اس سے files لیں۔

```dockerfile
WORKDIR /app
```
**مقصد:** container کے اندر `/app` فولڈر کام کی جگہ بنائیں۔

```dockerfile
ENV GENERATE_SOURCEMAP=false \
    CI=true
```
**مقصد:**
- `GENERATE_SOURCEMAP=false` — source maps نہ بنائیں، build چھوٹی رہے گی۔
- `CI=true` — non-interactive build کے لیے، warnings کو errors نہ سمجھا جائے۔

```dockerfile
COPY package*.json ./
RUN npm ci
```
**مقصد:** پہلے صرف `package.json` اور `package-lock.json` copy کریں، پھر `npm ci` سے dependencies install کریں۔ یہ Docker cache بہتر بناتا ہے۔

```dockerfile
COPY jsconfig.json ./
COPY public ./public
COPY src ./src
```
**مقصد:** صرف ضروری فائلیں copy کریں (پورا فولڈر نہیں)، تاکہ image ہلکی رہے۔

```dockerfile
RUN npm run build
```
**مقصد:** React production build بنائیں؛ output `build/` فولڈر میں آتی ہے۔

### Production Stage (دوسرا مرحلہ)

```dockerfile
FROM nginx:alpine
```
**مقصد:** نیا ہلکا nginx image لیں (Node.js runtime کی ضرورت نہیں، صرف static files serve کرنی ہیں)۔

```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
```
**مقصد:**
- nginx configuration set کریں۔
- `--from=build` پہلے stage کی build files یہاں copy کرتا ہے۔

```dockerfile
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
**مقصد:**
- `EXPOSE 80` — port 80 بتاتا ہے۔
- `CMD` — container start پر nginx foreground میں چلائیں۔

---

## 2. Server Dockerfile (`server/Dockerfile`)

یہ فائل Express backend server کے لیے ہے۔

### Dependencies Stage

```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache python3 make g++
```
**مقصد:** `bcrypt` جیسے native packages compile کرنے کے لیے build tools install کریں۔

```dockerfile
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
```
**مقصد:**
- production dependencies install کریں (`--omit=dev`)۔
- `npm cache clean` سے image size کم کریں۔

### Runtime Stage

```dockerfile
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
```
**مقصد:** صاف (clean) Alpine image میں server چلائیں؛ production mode set کریں۔

```dockerfile
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY index.js ./
COPY controllers ./controllers
COPY middleware ./middleware
COPY models ./models
COPY routes ./routes
COPY services ./services
COPY public ./public
```
**مقصد:** deps stage سے `node_modules` لیں اور صرف ضروری server code copy کریں (extra files نہیں)۔

```dockerfile
EXPOSE 6001
CMD ["node", "index.js"]
```
**مقصد:**
- Server port `6001` expose کریں۔
- `node index.js` سے server start کریں (production میں `nodemon` نہیں)۔

---

## 3. docker-compose.yml

یہ فائل تینوں services (client, server, mongo) کو ایک ساتھ چلاتی ہے۔

### Client Service

```yaml
client:
  build:
    context: ./client
    dockerfile: Dockerfile
  ports:
    - "3000:80"
  depends_on:
    server:
      condition: service_started
  restart: unless-stopped
```

| Setting | مقصد |
|--------|------|
| `build.context` | client folder سے image build کریں |
| `ports: "3000:80"` | host پر `3000` → container میں nginx `80` |
| `depends_on` | server start ہونے کے بعد client چلے |
| `restart: unless-stopped` | crash پر خود restart ہو |

### Server Service

```yaml
server:
  build:
    context: ./server
    dockerfile: Dockerfile
  ports:
    - "6001:6001"
  environment:
    NODE_ENV: production
    PORT: 6001
    MONGO_URI: mongodb://mongo:27017/cafe
  depends_on:
    mongo:
      condition: service_healthy
  restart: unless-stopped
```

| Setting | مقصد |
|--------|------|
| `PORT: 6001` | server کا port |
| `MONGO_URI` | MongoDB connection string |
| `depends_on.mongo.condition: service_healthy` | MongoDB ready ہونے کے بعد server start ہو |

### Mongo Service

```yaml
mongo:
  image: mongo:7
  ports:
    - "27017:27017"
  volumes:
    - mongo_data:/data/db
  healthcheck:
    test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
    interval: 10s
    timeout: 5s
    retries: 5
  restart: unless-stopped

volumes:
  mongo_data:
```

| Setting | مقصد |
|--------|------|
| `image: mongo:7` | MongoDB کا official image |
| `volumes` | data مستقل (persistent) رہے |
| `healthcheck` | MongoDB چal رہا ہے یا نہیں، check کریں |
| `mongo_data` | named volume — container delete پر بھی data محفوظ |

---

## 4. Client `.dockerignore` (`client/.dockerignore`)

Docker build کے وقت یہ فائلیں/فولڈرز copy **نہیں** ہوں گے:

| Entry | مقصد |
|-------|------|
| `node_modules/` | host dependencies image میں نہ جائیں |
| `build/` | پرانی build copy نہ ہو (~549 MB بچتی ہے) |
| `.env` | secrets image میں نہ جائیں |
| `.git/` | git history کی ضرورت نہیں |
| `Dockerfile`, `docker-compose*.yml` | build context میں extra files نہ ہوں |

---

## 5. Server `.dockerignore` (`server/.dockerignore`)

| Entry | مقصد |
|-------|------|
| `node_modules/` | container میں fresh install ہو |
| `.env` | secrets image میں نہ جائیں |
| `vercel.json` | deployment config Docker build میں ضروری نہیں |

---

## 6. Nginx Config (`client/nginx.conf`)

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

| Command / Line | مقصد |
|----------------|------|
| `listen 80` | port 80 پر requests سنیں |
| `root` | React build files کی location |
| `index index.html` | default page |
| `try_files ... /index.html` | React Router URLs refresh پر بھی کام کریں (SPA support) |

---

## 7. Docker چلانے کے Commands

```bash
# تمام services build + start
docker compose up --build

# background میں چلانا
docker compose up --build -d

# services بند کرنا
docker compose down
```

### URLs

| Service | URL |
|---------|-----|
| Client | http://localhost:3000 |
| Server | http://localhost:6001 |
| MongoDB | localhost:27017 |

---

## خلاصہ (Summary)

- **Client:** multi-stage build — پہلے React build، پھر nginx سے serve (ہلکی image)۔
- **Server:** multi-stage build — dependencies الگ stage میں، runtime image صاف۔
- **docker-compose:** client + server + mongo ایک command سے چلائیں۔
- **`.dockerignore`:** build context چھوٹا رکھیں، secrets اور extra files exclude کریں۔
