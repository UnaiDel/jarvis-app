# frontend/Dockerfile

FROM node:18-alpine

WORKDIR /usr/src/app
# Establecer compatibilidad con OpenSSL
ENV NODE_OPTIONS=--openssl-legacy-provider
# Copiar los archivos de dependencias de Node.js
COPY package*.json ./

# Instalar dependencias (incluyendo Axios)
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto para el frontend
EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "run", "dev"]
