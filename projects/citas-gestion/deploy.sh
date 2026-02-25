#!/bin/bash

# 1. Asegurar permisos del script
# chmod +x deploy.sh

echo "🚀 Iniciando despliegue de citas-gestion..."

# 2. Reconstruir la imagen sin caché para limpiar desajustes previos
echo "🔨 Construyendo imagen (v5.22.0)..."
docker compose -f docker-compose.prod.yml build --no-cache app

# 3. Reiniciar el servicio
echo "🔄 Reiniciando contenedores..."
docker compose -f docker-compose.prod.yml up -d app

# 4. Limpieza de imágenes huérfanas
echo "🧹 Limpiando imágenes antiguas..."
docker image prune -f

echo "✅ Despliegue completado con éxito."
