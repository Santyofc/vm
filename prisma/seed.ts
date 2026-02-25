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
