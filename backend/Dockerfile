# syntax=docker/dockerfile:1.2
FROM node:18-alpine

WORKDIR /usr/src/app

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copiar archivos de dependencias y hacer la instalación
COPY package*.json ./
RUN npm ci

# Copiar el código fuente
COPY . .

EXPOSE 3001

CMD ["node", "--max-old-space-size=2048", "index.js"]
