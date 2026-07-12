# --- ETAPA 1: Construcción de la App ---
FROM node:22-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de gestión de paquetes
COPY package*.json ./

# Instalar dependencias limpias para producción
RUN npm ci

# Copiar el resto del código de la aplicación e-commerce
COPY . .

# Compilar la aplicación para producción (genera la carpeta 'dist')
RUN npm run build

# --- ETAPA 2: Servidor de Producción con Nginx ---
FROM nginx:1.25-alpine

# Copiar los archivos estáticos compilados desde la etapa anterior al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar una configuración personalizada de Nginx para manejar rutas de React (SPA)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Exponer el puerto estándar HTTP
EXPOSE 80

# Arrancar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]