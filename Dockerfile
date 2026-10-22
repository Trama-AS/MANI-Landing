# Multi-stage build for React + Vite SPA
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# URL de MANI-Flutter Web del ambiente; Vite la incrusta en el bundle al compilar.
# Vacía: la landing usa el respaldo de src/config/flutterWebUrl.js (mismo host, puerto 8080).
ARG VITE_FLUTTER_WEB_URL=""
ENV VITE_FLUTTER_WEB_URL=${VITE_FLUTTER_WEB_URL}
RUN npm run build

# Stage 2: Serve via Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
