# Dockerfile del backend
FROM node:18-alpine

WORKDIR /usr/src/app

# Establecer compatibilidad con OpenSSL
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias, incluyendo nodemon
RUN npm install --only=development

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3001

# Comando para iniciar la app en modo desarrollo
CMD ["npm", "run", "dev"]
