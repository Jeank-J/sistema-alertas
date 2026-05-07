# Build stage
FROM node:22-alpine as build

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

# Build de la aplicación React con Vite
RUN npm run build

# Production stage con nginx (más robusto)
FROM nginx:alpine

# Copiar archivos compilados
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración de nginx para SPA + proxy
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    client_max_body_size 10m; \
    \
    # Para React Router: todas las rutas van a index.html \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Proxy al backend (dentro de la red Docker) \
    location /api/ { \
        proxy_pass http://backend:5000/api/; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade $http_upgrade; \
        proxy_set_header Connection "upgrade"; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
        proxy_cache_bypass $http_upgrade; \
    } \
    \
    # Servir archivos estáticos con caché \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
