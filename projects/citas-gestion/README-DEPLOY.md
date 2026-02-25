# 🚀 README-DEPLOY.md — Guía de Despliegue en VM de Producción

## Gestor de Citas SaaS · citas-gestion-zonasurtech

---

## Prerequisitos en la VM

Asegúrate de tener instalados los siguientes paquetes:

```bash
# 1. Instalar Docker Engine (Ubuntu 22.04+)
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release

sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 2. Agregar tu usuario al grupo docker (para no usar sudo)
sudo usermod -aG docker $USER
newgrp docker
```

---

## Paso 1: Subir el proyecto a la VM

### Opción A — Con `scp` (desde tu máquina local con Windows PowerShell)

```powershell
# Comprimir proyecto (excluye node_modules y .next)
# Ejecuta en tu PC local:
scp -r "C:\Users\Dev Profile\Desktop\Gestor de citas\citas-gestion-zonasurtech" user@TU_IP_DE_VM:/opt/apps/
```

### Opción B — Con `git` (recomendado)

```bash
# En la VM:
mkdir -p /opt/apps
cd /opt/apps
git clone https://github.com/TU_USUARIO/citas-gestion-zonasurtech.git
cd citas-gestion-zonasurtech
```

---

## Paso 2: Configurar Variables de Entorno

```bash
# En la VM, dentro del directorio del proyecto:
cd /opt/apps/citas-gestion-zonasurtech

# Copiar la plantilla y editarla con tus valores reales
cp .env.example .env.production

# Editar el archivo con nano (o vim, a tu gusto)
nano .env.production
```

**Variables críticas que DEBES cambiar:**

| Variable                | Descripción                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| `POSTGRES_PASSWORD`     | Contraseña segura para PostgreSQL                                       |
| `DATABASE_URL`          | Debe coincidir con `POSTGRES_USER`, `POSTGRES_PASSWORD` y `POSTGRES_DB` |
| `NEXTAUTH_SECRET`       | Ejecuta `openssl rand -base64 32` para generar uno                      |
| `NEXTAUTH_URL`          | URL pública de tu app, ej: `https://citas.zonasurtech.online`           |
| `STRIPE_API_KEY`        | Tu clave secreta de Stripe (producción: `sk_live_...`)                  |
| `STRIPE_WEBHOOK_SECRET` | Desde el dashboard de Stripe → Webhooks                                 |
| `RESEND_API_KEY`        | Desde tu cuenta de Resend                                               |

---

## Paso 3: Construir y Levantar los Contenedores

```bash
# En el directorio del proyecto:
cd /opt/apps/citas-gestion-zonasurtech

# Construir la imagen (puede tardar 3-5 minutos en la primera vez)
docker compose -f docker-compose.prod.yml build --no-cache

# Levantar en background
docker compose -f docker-compose.prod.yml up -d

# Verificar que ambos contenedores están corriendo
docker compose -f docker-compose.prod.yml ps
```

**Salida esperada:**

```
NAME                 STATUS          PORTS
citas_app_prod       healthy         127.0.0.1:3000->3000/tcp
citas_db_prod        healthy         5432/tcp
```

---

## Paso 4: Verificar los Logs

```bash
# Ver logs en tiempo real de la app
docker compose -f docker-compose.prod.yml logs -f app

# Ver logs de la base de datos
docker compose -f docker-compose.prod.yml logs -f db

# Ver las últimas 50 líneas
docker compose -f docker-compose.prod.yml logs --tail=50 app
```

---

## Paso 5: Ejecutar el Seeder (Datos Iniciales) — OPCIONAL

> ⚠️ **Solo en primera instalación.** Esto crea el SUPERADMIN y datos de ejemplo.

```bash
# Ejecutar el seed dentro del contenedor de la app
docker compose -f docker-compose.prod.yml exec app node_modules/.bin/prisma db seed
```

**Credenciales del SUPERADMIN creado por el seed:**

- **Email:** `admin@zonasurtech.online`
- **Contraseña:** `AdminSanty123!` ← **¡Cámbiala después del primer login!**

---

## Configuración de Nginx (Reverse Proxy)

El archivo `nginx.conf` ya está en el repositorio. Asegúrate de que Nginx
apunte al puerto `3000` de `127.0.0.1`:

```bash
# Instalar Nginx si no está instalado
sudo apt-get install -y nginx

# Copiar tu configuración
sudo cp nginx.conf /etc/nginx/sites-available/citas-gestion
sudo ln -s /etc/nginx/sites-available/citas-gestion /etc/nginx/sites-enabled/

# Verificar configuración y recargar
sudo nginx -t
sudo systemctl reload nginx
```

---

## Comandos de Mantenimiento Útiles

```bash
# Detener todos los contenedores del proyecto
docker compose -f docker-compose.prod.yml down

# Detener Y eliminar volúmenes (¡BORRA LA BASE DE DATOS!)
docker compose -f docker-compose.prod.yml down -v

# Reiniciar solo la app (sin rebuild)
docker compose -f docker-compose.prod.yml restart app

# Actualizar la app (nuevo deploy)
git pull origin main
docker compose -f docker-compose.prod.yml build app --no-cache
docker compose -f docker-compose.prod.yml up -d --no-deps app

# Conectarse a la base de datos PostgreSQL directamente
docker compose -f docker-compose.prod.yml exec db psql -U citas_user -d citas_db

# Ejecutar una migración manualmente
docker compose -f docker-compose.prod.yml exec app node_modules/.bin/prisma migrate deploy

# Ver el estado de las migraciones
docker compose -f docker-compose.prod.yml exec app node_modules/.bin/prisma migrate status
```

---

## Configuración de Stripe Webhooks

1. Ve a [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Haz clic en **"Add endpoint"**
3. URL del endpoint: `https://citas.zonasurtech.online/api/stripe/webhook`
4. Eventos a escuchar:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copia el **Signing Secret** (`whsec_...`) y agrégalo a `.env.production` como `STRIPE_WEBHOOK_SECRET`

---

## Troubleshooting

### La app no arranca (error en logs)

```bash
# Ver error completo de la app
docker compose -f docker-compose.prod.yml logs app | grep -i error
```

### La DB no puede conectarse

```bash
# Verificar que la DB está healthy
docker compose -f docker-compose.prod.yml ps db
# Si no está healthy, ver sus logs:
docker compose -f docker-compose.prod.yml logs db
```

### Error "prisma migrate deploy" falla

```bash
# Verificar conectividad entre app y db
docker compose -f docker-compose.prod.yml exec app node_modules/.bin/prisma db pull
```
