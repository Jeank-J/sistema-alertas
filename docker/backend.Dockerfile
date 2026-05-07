# Usamos la versión exacta solicitada
FROM node:22-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero para aprovechar la caché
COPY backend/package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código del backend
COPY backend/ .

# Exponemos el puerto definido en tu .env
EXPOSE 5000

# Comando para arrancar el servidor
CMD ["node", "server.js"]