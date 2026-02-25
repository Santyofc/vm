"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { slugify } from "@/lib/slug";

const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "www",
  "app",
  "mail",
  "cdn",
  "static",
  "landing",
  "tenant",
  "login",
]);

async function requireSuperAdmin() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "SUPERADMIN") {
    throw new Error("Acceso denegado: Se requiere rol de SUPERADMIN");
  }
}

export async function getTenants() {
  await requireSuperAdmin();

  return prisma.tenant.findMany({
    include: {
      _count: {
        select: {
          users: true,
          appointments: true,
        },
      },
      subscription: {
        select: {
          status: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createTenant(data: { name: string; slug: string }) {
  await requireSuperAdmin();

  const cleanedName = data.name.trim();
  const cleanedSlug = slugify(data.slug);

  if (!cleanedName || !cleanedSlug || RESERVED_SLUGS.has(cleanedSlug)) {
    throw new Error("El nombre o slug del negocio es invalido.");
  }

  const existingTenant = await prisma.tenant.findUnique({
    where: { slug: cleanedSlug },
    select: { id: true },
  });

  if (existingTenant) {
    throw new Error("El slug ya esta en uso.");
  }

  return prisma.tenant.create({
    data: {
      name: cleanedName,
      slug: cleanedSlug,
    },
  });
}
