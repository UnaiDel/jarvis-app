# syntax=docker/dockerfile:1.2
FROM node:18-alpine

WORKDIR /usr/src/app

ENV NODE_OPTIONS=--openssl-legacy-provider

# Copiar archivos de dependencias y hacer la instalación
COPY package*.json ./
RUN npm ci

# Copiar el código fuente
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
