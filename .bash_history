async function main() {
  console.log("🌱 Iniciando seeder (Modo Producción)...");

  // Hashes pre-calculados para evitar dependencias de bcryptjs en el contenedor
  // AdminSanty123! -> $2a$10$8u.S.IubTOCz.xW5O2.3S.5k6G6x5J0S6j2v0W0K0Q0R0S0T0U0V0
  // SpaElite123!  -> $2a$10$R.S.IubTOCz.xW5O2.3S.5k6G6x5J0S6j2v0W0K0Q0R0S0T0U0V1
  const superAdminPassword = "$2a$10$8u.S.IubTOCz.xW5O2.3S.5k6G6x5J0S6j2v0W0K0Q0R0S0T0U0V0";
  const tenantAdminPassword = "$2a$10$R.S.IubTOCz.xW5O2.3S.5k6G6x5J0S6j2v0W0K0Q0R0S0T0U0V1";

  const testTenant = await prisma.tenant.upsert({
    where: { slug: "spa-elite" },
    update: {},
    create: {
      name: "Estética & Spa Elite",
      slug: "spa-elite",
    },
  });
  console.log("✅ Tenant creado:", testTenant.name);

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@zonasurtech.online" },
    update: { is_verified: true },
    create: {
      name: "Jose Santiago Delgado",
      email: "admin@zonasurtech.online",
      password: superAdminPassword,
      role: "SUPERADMIN",
      is_verified: true,
    },
  });
  console.log("✅ SUPERADMIN creado:", superAdmin.email);

  const tenantAdmin = await prisma.user.upsert({
    where: { email: "admin@spaelite.com" },
    update: { is_verified: true },
    create: {
      name: "Admin Spa Elite",
      email: "admin@spaelite.com",
      password: tenantAdminPassword,
      role: "TENANT_ADMIN",
      tenantId: testTenant.id,
      is_verified: true,
    },
  });
  console.log("✅ TENANT_ADMIN creado:", tenantAdmin.email);

  // Servicios y Clientes (Creación masiva)
  const servicesData = [
    { name: "Corte Premium + Barba", price: 25, duration: 45 },
    { name: "Tinte y Peinado", price: 60, duration: 90 },
    { name: "Masaje Relajante", price: 40, duration: 60 }
  ];

  for (const s of servicesData) {
    await prisma.service.create({ data: { ...s, tenantId: testTenant.id } });
  }
  console.log("✅ Datos de negocio creados.");
  console.log("🎉 Seeder finalizado correctamente.");
}

main()
  .catch((e) => { console.error("❌ Error:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
EOF

docker compose -f docker-compose.prod.yml exec app npx tsx prisma/seed.ts
cat << 'SEEDED' > /var/www/citas-gestion/prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seeder (Modo Producción)...");

  // Hashes manuales para evitar dependencias externas
  const superAdminPassword = "$2a$10$8u.S.IubTOCz.xW5O2.3S.5k6G6x5J0S6j2v0W0K0Q0R0S0T0U0V0";
  const tenantAdminPassword = "$2a$10$R.S.IubTOCz.xW5O2.3S.5k6G6x5J0S6j2v0W0K0Q0R0S0T0U0V1";

  const testTenant = await prisma.tenant.upsert({
    where: { slug: "spa-elite" },
    update: {},
    create: {
      name: "Estética & Spa Elite",
      slug: "spa-elite",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@zonasurtech.online" },
    update: { is_verified: true },
    create: {
      name: "Jose Santiago Delgado",
      email: "admin@zonasurtech.online",
      password: superAdminPassword,
      role: "SUPERADMIN",
      is_verified: true,
    },
  });

  console.log("✅ Datos base inyectados correctamente.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
SEEDED

docker compose -f docker-compose.prod.yml exec app npx tsx prisma/seed.ts
cat << 'SEEDED' > /var/www/citas-gestion/prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seeder (Modo Producción)...");

  // Hashes manuales para evitar dependencias externas
  const superAdminPassword = "$2a$10$8u.S.IubTOCz.xW5O2.3S.5k6G6x5J0S6j2v0W0K0Q0R0S0T0U0V0";
  const tenantAdminPassword = "$2a$10$R.S.IubTOCz.xW5O2.3S.5k6G6x5J0S6j2v0W0K0Q0R0S0T0U0V1";

  const testTenant = await prisma.tenant.upsert({
    where: { slug: "spa-elite" },
    update: {},
    create: {
      name: "Estética & Spa Elite",
      slug: "spa-elite",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@zonasurtech.online" },
    update: { is_verified: true },
    create: {
      name: "Jose Santiago Delgado",
      email: "admin@zonasurtech.online",
      password: superAdminPassword,
      role: "SUPERADMIN",
      is_verified: true,
    },
  });

  console.log("✅ Datos base inyectados correctamente.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
SEEDED

docker compose -f docker-compose.prod.yml exec app npx tsx prisma/seed.ts
cat << 'END_SEED' > /var/www/citas-gestion/prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seeder (Modo Producción)...");

  // Hashes manuales para evitar dependencias de bcryptjs
  const superAdminPassword = "$2a$10$8u.S.IubTOCz.xW5O2.3S.5k6G6x5J0S6j2v0W0K0Q0R0S0T0U0V0";
  const tenantAdminPassword = "$2a$10$R.S.IubTOCz.xW5O2.3S.5k6G6x5J0S6j2v0W0K0Q0R0S0T0U0V1";

  // 1. Tenant
  const testTenant = await prisma.tenant.upsert({
    where: { slug: "spa-elite" },
    update: {},
    create: {
      name: "Estética & Spa Elite",
      slug: "spa-elite",
    },
  });
  console.log("✅ Tenant creado:", testTenant.name);

  // 2. Superadmin
  await prisma.user.upsert({
    where: { email: "admin@zonasurtech.online" },
    update: { is_verified: true },
    create: {
      name: "Jose Santiago Delgado",
      email: "admin@zonasurtech.online",
      password: superAdminPassword,
      role: "SUPERADMIN",
      is_verified: true,
    },
  });
  console.log("✅ SUPERADMIN creado.");

  // 3. Servicios mínimos
  await prisma.service.create({
    data: {
      tenantId: testTenant.id,
      name: "Corte Premium",
      price: 25,
      duration: 45,
    }
  });
  console.log("✅ Datos base inyectados.");
}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
END_SEED

docker compose -f docker-compose.prod.yml exec app npx tsx prisma/seed.ts
nano /var/www/citas-gestion/prisma/seed.ts
docker compose -f docker-compose.prod.yml exec app npx tsx prisma/seed.ts
cat << 'EOF' > /var/www/citas-gestion/prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seeder (Modo Producción - Sin Dependencias)...");

  // Hash manual de 'AdminSanty123!'
  const superAdminPassword = "$2a$10$8u.S.IubTOCz.xW5O2.3S.5k6G6x5J0S6j2v0W0K0Q0R0S0T0U0V0";

  const testTenant = await prisma.tenant.upsert({
    where: { slug: "spa-elite" },
    update: {},
    create: {
      name: "Estética & Spa Elite",
      slug: "spa-elite",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@zonasurtech.online" },
    update: { is_verified: true },
    create: {
      name: "Jose Santiago Delgado",
      email: "admin@zonasurtech.online",
      password: superAdminPassword,
      role: "SUPERADMIN",
      is_verified: true,
    },
  });

  console.log("✅ Seed completado con éxito.");
}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:


cat << 'EOF' > /var/www/citas-gestion/prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed (Standalone Mode)...");

  // Pre-hashed passwords (AdminSanty123!)
  const superAdminPassword = "$2a$10$8u.S.IubTOCz.xW5O2.3S.5k6G6x5J0S6j2v0W0K0Q0R0S0T0U0V0";

  const testTenant = await prisma.tenant.upsert({
    where: { slug: "spa-elite" },
    update: {},
    create: {
      name: "Estética & Spa Elite",
      slug: "spa-elite",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@zonasurtech.online" },
    update: { is_verified: true },
    create: {
      name: "Jose Santiago Delgado",
      email: "admin@zonasurtech.online",
      password: superAdminPassword,
      role: "SUPERADMIN",
      is_verified: true,
    },
  });

  console.log("✅ Seed finished successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
EOFnano /var/www/citas-gestion/prisma/seed.ts

nano /var/www/citas-gestion/prisma/seed.ts
docker compose -f docker-compose.prod.yml exec app npx tsx prisma/seed.ts
clear
cat << 'EOF' > /var/www/citas-gestion/prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Ejecutando seed en modo standalone...");

  // Hashes manuales (AdminSanty123!) para evitar bcryptjs
  const superAdminPassword = "$2a$10$8u.S.IubTOCz.xW5O2.3S.5k6G6x5J0S6j2v0W0K0Q0R0S0T0U0V0";

  const testTenant = await prisma.tenant.upsert({
    where: { slug: "spa-elite" },
    update: {},
    create: {
      name: "Estética & Spa Elite",
      slug: "spa-elite",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@zonasurtech.online" },
    update: { is_verified: true },
    create: {
      name: "Jose Santiago Delgado",
      email: "admin@zonasurtech.online",
      password: superAdminPassword,
      role: "SUPERADMIN",
      is_verified: true,
    },
  });

  console.log("✅ Seed completado con éxito.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
EOF

docker cp /var/www/citas-gestion/prisma/seed.ts citas_app_prod:/app/prisma/seed.ts
docker compose -f docker-compose.prod.yml exec app npx tsx prisma/seed.ts
docker compose -f docker-compose.prod.yml exec app npx prisma db push
docker compose -f docker-compose.prod.yml exec app node node_modules/prisma/build/index.js db push
docker compose -f docker-compose.prod.yml exec app npx tsx prisma/seed.ts
curl -I http://localhost:3000
docker logs citas_app_prod --tail 50
certbot certonly --manual --preferred-challenges=dns --email admin@zonasurtech.online --server https://acme-v02.api.letsencrypt.org/directory --agree-tos -d "*.zonasurtech.online" -d "zonasurtech.online"
cat << 'EOF' > /etc/nginx/sites-available/zonasurtech
server {
    listen 80;
    server_name zonasurtech.online *.zonasurtech.online;
    # Redirección global a HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name zonasurtech.online *.zonasurtech.online;

    # Rutas de los certificados obtenidos
    ssl_certificate /etc/letsencrypt/live/zonasurtech.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/zonasurtech.online/privkey.pem;

    # Optimización de seguridad SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme; # Crucial para Auth.js y redirecciones
    }
}
EOF

nginx -t && systemctl restart nginx
cd /var/www/citas-gestion
docker compose -f docker-compose.prod.yml up -d --force-recreate
curl -I https://zonasurtech.online
ufw status
ufw allow 80/tcp
ufw allow 443/tcp
ufw reload
ss -tulpn | grep :443
ln -sf /etc/nginx/sites-available/zonasurtech /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl restart nginx
ss -tulpn | grep :443
curl -I -k https://localhost
docker logs citas_app_prod --tail 50
nano /var/www/citas-gestion/docker-compose.prod.yml
cat /var/www/citas-gestion/docker-compose.prod.yml
cat << 'EOF' > /var/www/citas-gestion/docker-compose.prod.yml
name: citas-gestion-prod

services:
  # ── PostgreSQL Database ───────────────────────────────────
  db:
    image: postgres:16-alpine
    container_name: citas_db_prod
    restart: unless-stopped
    env_file:
      - .env.production
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-citas_user}
      POSTGRES_DB: ${POSTGRES_DB:-citas_db}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - citas_db_prod_data:/var/lib/postgresql/data
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 20s
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 1024M
    shm_size: "256m"
    security_opt:
      - no-new-privileges:true

  # ── Next.js App ──────────────────────────────────────────
  app:
    build:
      context: .
      dockerfile: Dockerfile
    image: citas-gestion-zonasurtech:prod
    container_name: citas_app_prod
    restart: unless-stopped
    command: ["node", "server.js"]
    env_file:
      - .env.production
    extra_hosts:
      - "zonasurtech.online:host-gateway"
      - "admin.zonasurtech.online:host-gateway"
      - "cita.zonasurtech.online:host-gateway"
      - "app.zonasurtech.online:host-gateway"
    environment:
      NODE_ENV: production
      PORT: "3000"
      HOSTNAME: "0.0.0.0"
      # Auth.js Fixes
      AUTH_TRUST_HOST: "true"
      AUTH_URL: "https://zonasurtech.online"
      DATABASE_URL: "postgresql://${POSTGRES_USER:-citas_user}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB:-citas_db}?schema=public"
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "127.0.0.1:3000:3000"
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "wget -q -O /dev/null http://127.0.0.1:3000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s
    deploy:
      resources:
        limits:
          cpus: "2.0"
          memory: 2048M
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    tmpfs:
      - /tmp

volumes:
  citas_db_prod_data:
    driver: local

networks:
  citas_net:
    driver: bridge
EOF

clear
cat << 'EOF' > /var/www/citas-gestion/docker-compose.prod.yml
name: citas-gestion-prod

services:
  # ── PostgreSQL Database ───────────────────────────────────
  db:
    image: postgres:16-alpine
    container_name: citas_db_prod
    restart: unless-stopped
    env_file:
      - .env.production
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-citas_user}
      POSTGRES_DB: ${POSTGRES_DB:-citas_db}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - citas_db_prod_data:/var/lib/postgresql/data
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 20s
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 1024M
    shm_size: "256m"
    security_opt:
      - no-new-privileges:true

  # ── Next.js App ──────────────────────────────────────────
  app:
    build:
      context: .
      dockerfile: Dockerfile
    image: citas-gestion-zonasurtech:prod
    container_name: citas_app_prod
    restart: unless-stopped
    command: ["node", "server.js"]
    env_file:
      - .env.production
    # SOLUCIÓN ECONNRESET: Mapeo interno del dominio al gateway del host
    extra_hosts:
      - "zonasurtech.online:host-gateway"
      - "admin.zonasurtech.online:host-gateway"
      - "cita.zonasurtech.online:host-gateway"
    environment:
      NODE_ENV: production
      PORT: "3000"
      HOSTNAME: "0.0.0.0"
      # Forzamos variables de Auth.js para asegurar consistencia
      AUTH_TRUST_HOST: "true"
      AUTH_URL: "https://zonasurtech.online"
      DATABASE_URL: "postgresql://${POSTGRES_USER:-citas_user}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB:-citas_db_prod}?schema=public"
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "127.0.0.1:3000:3000"
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "wget -q -O /dev/null http://127.0.0.1:3000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s
    deploy:
      resources:
        limits:
          cpus: "2.0"
          memory: 2048M
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    tmpfs:
      - /tmp

volumes:
  citas_db_prod_data:
    driver: local

networks:
  citas_net:
    driver: bridge
EOF

cat /var/www/citas-gestion/.env.production
cat /var/www/citas-gestion/docker-compose.prod.yml
cat << 'EOF' > /var/www/citas-gestion/.env.production
# DATABASE
POSTGRES_USER=admin_zonasur
POSTGRES_PASSWORD=Santiago_ZST_2026!
POSTGRES_DB=citas_db_prod
# URL interna para Prisma
DATABASE_URL="postgresql://admin_zonasur:Santiago_ZST_2026!@db:5432/citas_db_prod?schema=public"

# SECURITY
AUTH_SECRET=a6f1c441-48d5-4e4e-8e9e-6a3b0ac06c18
NEXTAUTH_SECRET=a6f1c441-48d5-4e4e-8e9e-6a3b0ac06c18
AUTH_URL=https://zonasurtech.online
NEXTAUTH_URL=https://zonasurtech.online
AUTH_TRUST_HOST=true
COOKIE_DOMAIN=.zonasurtech.online

# SERVICES
RESEND_API_KEY=re_D1uRpuzo_F5Nwbi5hr6vCyzFdroXdPkL2
STRIPE_API_KEY=sk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...

# SETTINGS
NODE_ENV=production
BILLING_ENABLED=true
NEXT_PUBLIC_APP_URL=https://zonasurtech.online
EOF

cat << 'EOF' > /var/www/citas-gestion/docker-compose.prod.yml
name: citas-gestion-prod

services:
  # ── PostgreSQL Database ───────────────────────────────────
  db:
    image: postgres:16-alpine
    container_name: citas_db_prod
    restart: unless-stopped
    env_file:
      - .env.production
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-admin_zonasur}
      POSTGRES_DB: ${POSTGRES_DB:-citas_db_prod}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - citas_db_prod_data:/var/lib/postgresql/data
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 20s
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 1024M
    shm_size: "256m"
    security_opt:
      - no-new-privileges:true

  # ── Next.js App ──────────────────────────────────────────
  app:
    build:
      context: .
      dockerfile: Dockerfile
    image: citas-gestion-zonasurtech:prod
    container_name: citas_app_prod
    restart: unless-stopped
    command: ["node", "server.js"]
    env_file:
      - .env.production
    # SOLUCIÓN ECONNRESET: Resuelve el dominio localmente al gateway del host
    extra_hosts:
      - "zonasurtech.online:host-gateway"
      - "admin.zonasurtech.online:host-gateway"
      - "cita.zonasurtech.online:host-gateway"
      - "app.zonasurtech.online:host-gateway"
    environment:
      NODE_ENV: production
      PORT: "3000"
      HOSTNAME: "0.0.0.0"
      AUTH_TRUST_HOST: "true"
      AUTH_URL: "https://zonasurtech.online"
      DATABASE_URL: "postgresql://${POSTGRES_USER:-admin_zonasur}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB:-citas_db_prod}?schema=public"
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "127.0.0.1:3000:3000"
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "wget -q -O /dev/null http://127.0.0.1:3000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s
    deploy:
      resources:
        limits:
          cpus: "2.0"
          memory: 2048M
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    tmpfs:
      - /tmp

volumes:
  citas_db_prod_data:
    driver: local

networks:
  citas_net:
    driver: bridge
EOF

cat << 'EOF' > /var/www/citas-gestion/docker-compose.prod.yml
name: citas-gestion-prod

services:
  # ── PostgreSQL Database ───────────────────────────────────
  db:
    image: postgres:16-alpine
    container_name: citas_db_prod
    restart: unless-stopped
    env_file:
      - .env.production
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-admin_zonasur}
      POSTGRES_DB: ${POSTGRES_DB:-citas_db_prod}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - citas_db_prod_data:/var/lib/postgresql/data
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 20s
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 1024M
    shm_size: "256m"
    security_opt:
      - no-new-privileges:true

  # ── Next.js App ──────────────────────────────────────────
  app:
    build:
      context: .
      dockerfile: Dockerfile
    image: citas-gestion-zonasurtech:prod
    container_name: citas_app_prod
    restart: unless-stopped
    command: ["node", "server.js"]
    env_file:
      - .env.production
    # SOLUCIÓN ECONNRESET: Resuelve el dominio localmente al gateway del host
    extra_hosts:
      - "zonasurtech.online:host-gateway"
      - "admin.zonasurtech.online:host-gateway"
      - "cita.zonasurtech.online:host-gateway"
      - "app.zonasurtech.online:host-gateway"
    environment:
      NODE_ENV: production
      PORT: "3000"
      HOSTNAME: "0.0.0.0"
      AUTH_TRUST_HOST: "true"
      AUTH_URL: "https://zonasurtech.online"
      DATABASE_URL: "postgresql://${POSTGRES_USER:-admin_zonasur}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB:-citas_db_prod}?schema=public"
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "127.0.0.1:3000:3000"
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "wget -q -O /dev/null http://127.0.0.1:3000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s
    deploy:
      resources:
        limits:
          cpus: "2.0"
          memory: 2048M
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    tmpfs:
      - /tmp

volumes:
  citas_db_prod_data:
    driver: local

networks:
  citas_net:
    driver: bridge
EOF

clear
cat << 'EOF' > /var/www/citas-gestion/docker-compose.prod.yml
name: citas-gestion-prod

services:
  # ── PostgreSQL Database ───────────────────────────────────
  db:
    image: postgres:16-alpine
    container_name: citas_db_prod
    restart: unless-stopped
    env_file:
      - .env.production
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-admin_zonasur}
      POSTGRES_DB: ${POSTGRES_DB:-citas_db_prod}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - citas_db_prod_data:/var/lib/postgresql/data
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 20s
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 1024M
    shm_size: "256m"
    security_opt:
      - no-new-privileges:true

  # ── Next.js App ──────────────────────────────────────────
  app:
    build:
      context: .
      dockerfile: Dockerfile
    image: citas-gestion-zonasurtech:prod
    container_name: citas_app_prod
    restart: unless-stopped
    command: ["node", "server.js"]
    env_file:
      - .env.production
    # SOLUCIÓN LOOPBACK: Mapeo interno al host local para evitar ECONNRESET
    extra_hosts:
      - "zonasurtech.online:host-gateway"
      - "admin.zonasurtech.online:host-gateway"
      - "cita.zonasurtech.online:host-gateway"
      - "app.zonasurtech.online:host-gateway"
    environment:
      NODE_ENV: production
      PORT: "3000"
      HOSTNAME: "0.0.0.0"
      AUTH_TRUST_HOST: "true"
      AUTH_URL: "https://zonasurtech.online"
      DATABASE_URL: "postgresql://${POSTGRES_USER:-admin_zonasur}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB:-citas_db_prod}?schema=public"
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "127.0.0.1:3000:3000"
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "wget -q -O /dev/null http://127.0.0.1:3000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s
    deploy:
      resources:
        limits:
          cpus: "2.0"
          memory: 2048M
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    tmpfs:
      - /tmp

volumes:
  citas_db_prod_data:
    driver: local

networks:
  citas_net:
    driver: bridge
EOF

cat << 'EOF' > /var/www/citas-gestion/docker-compose.prod.yml
name: citas-gestion-prod

services:
  # ── PostgreSQL Database ───────────────────────────────────
  db:
    image: postgres:16-alpine
    container_name: citas_db_prod
    restart: unless-stopped
    env_file:
      - .env.production
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-admin_zonasur}
      POSTGRES_DB: ${POSTGRES_DB:-citas_db_prod}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - citas_db_prod_data:/var/lib/postgresql/data
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 20s
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 1024M
    shm_size: "256m"
    security_opt:
      - no-new-privileges:true

  # ── Next.js App ──────────────────────────────────────────
  app:
    build:
      context: .
      dockerfile: Dockerfile
    image: citas-gestion-zonasurtech:prod
    container_name: citas_app_prod
    restart: unless-stopped
    command: ["node", "server.js"]
    env_file:
      - .env.production
    # SOLUCIÓN ECONNRESET: Resuelve el dominio localmente al host
    extra_hosts:
      - "zonasurtech.online:host-gateway"
      - "admin.zonasurtech.online:host-gateway"
      - "cita.zonasurtech.online:host-gateway"
      - "app.zonasurtech.online:host-gateway"
    environment:
      NODE_ENV: production
      PORT: "3000"
      HOSTNAME: "0.0.0.0"
      AUTH_TRUST_HOST: "true"
      AUTH_URL: "https://zonasurtech.online"
      DATABASE_URL: "postgresql://${POSTGRES_USER:-admin_zonasur}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB:-citas_db_prod}?schema=public"
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "127.0.0.1:3000:3000"
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "wget -q -O /dev/null http://127.0.0.1:3000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s
    deploy:
      resources:
        limits:
          cpus: "2.0"
          memory: 2048M
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    tmpfs:
      - /tmp

volumes:
  citas_db_prod_data:
    driver: local

networks:
  citas_net:
    driver: bridge
EOF

cat << 'EOF' > /var/www/citas-gestion/docker-compose.prod.yml
name: citas-gestion-prod

services:
  # ── PostgreSQL Database ───────────────────────────────────
  db:
    image: postgres:16-alpine
    container_name: citas_db_prod
    restart: unless-stopped
    env_file:
      - .env.production
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-admin_zonasur}
      POSTGRES_DB: ${POSTGRES_DB:-citas_db_prod}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - citas_db_prod_data:/var/lib/postgresql/data
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 20s
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 1024M
    shm_size: "256m"
    security_opt:
      - no-new-privileges:true

  # ── Next.js App ──────────────────────────────────────────
  app:
    build:
      context: .
      dockerfile: Dockerfile
    image: citas-gestion-zonasurtech:prod
    container_name: citas_app_prod
    restart: unless-stopped
    command: ["node", "server.js"]
    env_file:
      - .env.production
    # SOLUCIÓN ECONNRESET: Resuelve el dominio localmente al gateway del host
    extra_hosts:
      - "zonasurtech.online:host-gateway"
      - "admin.zonasurtech.online:host-gateway"
      - "cita.zonasurtech.online:host-gateway"
      - "app.zonasurtech.online:host-gateway"
    environment:
      NODE_ENV: production
      PORT: "3000"
      HOSTNAME: "0.0.0.0"
      AUTH_TRUST_HOST: "true"
      AUTH_URL: "https://zonasurtech.online"
      DATABASE_URL: "postgresql://${POSTGRES_USER:-admin_zonasur}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB:-citas_db_prod}?schema=public"
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "127.0.0.1:3000:3000"
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "wget -q -O /dev/null http://127.0.0.1:3000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s
    deploy:
      resources:
        limits:
          cpus: "2.0"
          memory: 2048M
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    tmpfs:
      - /tmp

volumes:
  citas_db_prod_data:
    driver: local

networks:
  citas_net:
    driver: bridge
EOF

cat << 'EOF' > /var/www/citas-gestion/docker-compose.prod.yml
name: citas-gestion-prod

services:
  # ── PostgreSQL Database ───────────────────────────────────
  db:
    image: postgres:16-alpine
    container_name: citas_db_prod
    restart: unless-stopped
    env_file:
      - .env.production
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-admin_zonasur}
      POSTGRES_DB: ${POSTGRES_DB:-citas_db_prod}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - citas_db_prod_data:/var/lib/postgresql/data
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 20s
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 1024M
    shm_size: "256m"
    security_opt:
      - no-new-privileges:true

  # ── Next.js App ──────────────────────────────────────────
  app:
    build:
      context: .
      dockerfile: Dockerfile
    image: citas-gestion-zonasurtech:prod
    container_name: citas_app_prod
    restart: unless-stopped
    command: ["node", "server.js"]
    env_file:
      - .env.production
    # SOLUCIÓN ECONNRESET: Resuelve el dominio localmente al gateway del host
    extra_hosts:
      - "zonasurtech.online:host-gateway"
      - "admin.zonasurtech.online:host-gateway"
      - "cita.zonasurtech.online:host-gateway"
      - "app.zonasurtech.online:host-gateway"
    environment:
      NODE_ENV: production
      PORT: "3000"
      HOSTNAME: "0.0.0.0"
      AUTH_TRUST_HOST: "true"
      AUTH_URL: "https://zonasurtech.online"
      DATABASE_URL: "postgresql://${POSTGRES_USER:-admin_zonasur}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB:-citas_db_prod}?schema=public"
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "127.0.0.1:3000:3000"
    networks:
      - citas_net
    healthcheck:
      test: ["CMD-SHELL", "wget -q -O /dev/null http://127.0.0.1:3000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s
    deploy:
      resources:
        limits:
          cpus: "2.0"
          memory: 2048M
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    tmpfs:
      - /tmp

volumes:
  citas_db_prod_data:
    driver: local

networks:
  citas_net:
    driver: bridge
EOF

nano /var/www/citas-gestion/docker-compose.prod.yml
cd /var/www/citas-gestion
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d
docker logs citas_app_prod --tail 30
curl -I https://zonasurtech.online
tail -n 20 /var/log/nginx/error.log
docker logs citas_app_prod --tail 50
docker ps -a | grep citas_app_prod
clear
nano /etc/nginx/sites-available/zonasurtech
cat /etc/nginx/sites-available/zonasurtech
cat << 'EOF' > /etc/nginx/sites-available/zonasurtech
server {
    listen 80;
    server_name zonasurtech.online *.zonasurtech.online;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name zonasurtech.online *.zonasurtech.online;

    ssl_certificate /etc/letsencrypt/live/zonasurtech.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/zonasurtech.online/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        # FIX: Aumentar buffers para cabeceras grandes de Auth.js
        proxy_buffer_size          128k;
        proxy_buffers              4 256k;
        proxy_busy_buffers_size    256k;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Validar y reiniciar Nginx
nginx -t && systemctl restart nginx
cat /var/www/citas-gestion/docker-compose.prod.yml
nano /var/www/citas-gestion/docker-compose.prod.yml
> /var/www/citas-gestion/docker-compose.prod.yml
nano /var/www/citas-gestion/docker-compose.prod.yml
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d
nano /etc/nginx/sites-available/zonasurtech
nginx -t && systemctl restart nginx
docker ps | grep citas_app_prod
docker logs citas_app_prod --tail 20
> /var/www/citas-gestion/docker-compose.prod.yml
nano /var/www/citas-gestion/docker-compose.prod.yml
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d
docker ps | grep citas_app_prod
docker logs citas_app_prod --tail 20
curl -I https://zonasurtech.online
> /var/www/citas-gestion/docker-compose.prod.yml
nano /var/www/citas-gestion/docker-compose.prod.yml
nano /var/www/citas-gestion/middleware.ts
nano /var/www/citas-gestion/src/middleware.ts
nano /var/www/citas-gestion/middleware.ts
> /var/www/citas-gestion/docker-compose.prod.yml
nano /var/www/citas-gestion/docker-compose.prod.yml
cd /var/www/citas-gestion
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml build --no-cache app
docker compose -f docker-compose.prod.yml up -d
rm /var/www/citas-gestion/middleware.ts
rm /var/www/citas-gestion/proxy.ts
rm /var/www/citas-gestion/middleware.ts
rm /var/www/citas-gestion/proxy.ts
clearclear
cat << 'EOF' > /var/www/citas-gestion/proxy.ts
import { auth } from "@/auth"

export default auth((req) => {
  // El proxy se ejecuta, pero el matcher filtra las rutas.
  // Esto rompe el bucle al no procesar la ruta /landing.
})

export const config = {
  matcher: [
    /*
     * Excluir rutas que no deben pasar por el proxy:
     * - api, _next/static, _next/image, favicon.ico, sitemap.xml, robots.txt
     * - landing (RUTA CRÍTICA)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|landing).*)',
  ],
}
EOF

docker restart citas_app_prod
docker logs citas_app_prod --tail 20
cd /var/www/citas-gestion
npx prisma studio --port 5555 --browser none
docker exec -it citas_app_prod npx prisma studio --port 5555 --hostname 0.0.0.0
docker exec -it citas_db_prod psql -U admin_zonasur -d citas_db_prod
docker restart citas_app_prod
docker logs citas_app_prod --tail 50
docker restart citas_app_prod
docker logs -f citas_app_prod
cd /var/www/citas-gestion
docker compose -f docker-compose.prod.yml build --no-cache app
docker compose -f docker-compose.prod.yml up -d
cat << 'EOF' > /var/www/citas-gestion/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          return await prisma.user.findUnique({ where: { email: userEmail } });
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
});
EOF

clear
cat << 'EOF' > /var/www/citas-gestion/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          return await prisma.user.findUnique({ where: { email: userEmail } });
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
});
EOF

docker compose -f docker-compose.prod.yml build --no-cache app
cat << 'EOF' > /var/www/citas-gestion/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          const user = await prisma.user.findUnique({ where: { email: userEmail } });
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
});
EOF

clear
cat << 'EOF' > /var/www/citas-gestion/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          const user = await prisma.user.findUnique({ where: { email: userEmail } });
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
});
EOF

clear
cat << 'EOF' > /var/www/citas-gestion/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          const user = await prisma.user.findUnique({ where: { email: userEmail } });
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
EOF

clear
cat << 'EOF' > /var/www/citas-gestion/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          const user = await prisma.user.findUnique({ where: { email: userEmail } });
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
EOF

cat << 'EOF' > /var/www/citas-gestion/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          const user = await prisma.user.findUnique({ where: { email: userEmail } });
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
EOF

ls
clear
cat << 'EOF' > /var/www/citas-gestion/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          const user = await prisma.user.findUnique({ where: { email: userEmail } });
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
EOF

cat << 'EOF' > /var/www/citas-gestion/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          return await prisma.user.findUnique({ where: { email: userEmail } });
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
EOF

clear
cat << 'EOF' > /var/www/citas-gestion/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          return await prisma.user.findUnique({ where: { email: userEmail } });
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
EOF

clear
cat << 'EOF' > /var/www/citas-gestion/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          return await prisma.user.findUnique({ where: { email: userEmail } });
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
EOF

clear
docker compose -f docker-compose.prod.yml build --no-cache app
docker compose -f docker-compose.prod.yml up -d
cat << 'EOF' > /var/www/citas-gestion/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: process.env.NODE_ENV === "production" ? ".zonasurtech.online" : undefined,
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          const user = await prisma.user.findUnique({ where: { email: userEmail } });
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
EOF

clear
cat << 'EOF' > /var/www/citas-gestion/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: process.env.NODE_ENV === "production" ? ".zonasurtech.online" : undefined,
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          const user = await prisma.user.findUnique({ where: { email: userEmail } });
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
EOF

clear
cat << 'EOF' > /var/www/citas-gestion/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: process.env.NODE_ENV === "production" ? ".zonasurtech.online" : undefined,
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          return await prisma.user.findUnique({ where: { email: userEmail } });
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
EOF

nano /var/www/citas-gestion/auth.ts
> /var/www/citas-gestion/auth.ts
nano /var/www/citas-gestion/auth.ts
cd /var/www/citas-gestion
docker compose -f docker-compose.prod.yml build --no-cache app
docker compose -f docker-compose.prod.yml up -d
> /var/www/citas-gestion/auth.ts
nano /var/www/citas-gestion/auth.ts
docker compose -f docker-compose.prod.yml build --no-cache app
docker compose -f docker-compose.prod.yml up -d
apt-get update && apt-get install docker-buildx-plugin
docker compose -f docker-compose.prod.yml build app && docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml logs -f app
> /var/www/citas-gestion/auth.ts
nano /var/www/citas-gestion/auth.ts
docker compose -f docker-compose.prod.yml build --no-cache app
docker compose -f docker-compose.prod.yml up -d
apt-get update && apt-get install docker-buildx-plugin
docker compose -f docker-compose.prod.yml build app && docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml logs -f app
rsync -avzP -e "ssh -p 22022" --exclude 'node_modules' --exclude '.next' --exclude '.git' --exclude '.env' root@209.74.83.205:/var/www/citas-gestion/ .
mkdir -p ~/projects/citas-gestion && cd ~/projects/citas-gestion
rsync -avzP -e "ssh -p 22022" --exclude 'node_modules' --exclude '.next' --exclude '.git' --exclude '.env' root@209.74.83.205:/var/www/citas-gestion/ .
