"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";

// Middleware checks should ideally handle this, but for safety in Server Actions:
async function requireTenantAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("No autenticado");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      tenant: {
        include: {
          subscription: true,
        },
      },
    },
  });

  if (!user?.tenantId) throw new Error("No hay negocio asociado a tu cuenta");
  if (user.role !== "TENANT_ADMIN" && user.role !== "SUPERADMIN") {
    throw new Error("No tienes permisos para esta operacion");
  }

  // Soft Gate: We no longer block access based on subscription status
  // if (checkSubscription && ...) { ... }

  return user.tenantId;
}

export async function getTenantConfig() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const tenantId = await requireTenantAdmin();

  return prisma.user.findFirst({
    where: { id: session.user.id, tenantId },
    select: {
      name: true,
      email: true,
      tenant: {
        select: {
          name: true,
          subscription: {
            select: {
              status: true,
              currentPeriodEnd: true,
              stripeCustomerId: true,
            },
          },
        },
      },
    },
  });
}

export async function getDashboardMetrics() {
  const tenantId = await requireTenantAdmin();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Citas para hoy
  const todayAppointments = await prisma.appointment.count({
    where: {
      tenantId,
      date: {
        gte: today,
        lte: endOfDay,
      },
    },
  });

  // Ingresos del Mes (Summing up completed appointments' services)
  const monthlyAppointments = await prisma.appointment.findMany({
    where: {
      tenantId,
      date: { gte: startOfMonth, lte: endOfDay },
      status: "COMPLETED", // Solo cobrados
    },
    include: { service: true },
  });

  const monthlyRevenue = monthlyAppointments.reduce(
    (acc, appt) => acc + (appt.service?.price ?? 0),
    0,
  );

  // Total citas para calcular asistencia: (completadas / (completadas + canceladas + ausentes)) * 100
  // Para MVP devolvemos un cálculo básico simulado o 100% si no hay suficientes datos
  const allTimeAppointments = await prisma.appointment.count({
    where: { tenantId },
  });

  const attendanceRate = allTimeAppointments > 0 ? 92 : 100; // Mocked rate for demonstration since MVP lacks explicit 'no-show' status

  const topService = await prisma.service.findFirst({
    where: { tenantId },
    orderBy: { appointments: { _count: "desc" } },
  });

  return {
    todayAppointments,
    monthlyRevenue,
    attendanceRate,
    topService: topService?.name || "Sin Servicios Configurados",
  };
}

export async function getUpcomingAppointments() {
  const tenantId = await requireTenantAdmin();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return prisma.appointment.findMany({
    where: {
      tenantId,
      date: { gte: today },
    },
    include: {
      client: true,
      service: true,
    },
    orderBy: { date: "asc" },
    take: 10,
  });
}

// Action to simulate booking an appointment from the Business side
export async function createAppointment(
  clientId: string,
  serviceId: string,
  date: Date,
) {
  const tenantId = await requireTenantAdmin();

  if (!clientId || !serviceId || Number.isNaN(new Date(date).getTime())) {
    throw new Error("Datos de cita invalidos");
  }

  const [client, service] = await Promise.all([
    prisma.client.findFirst({
      where: { id: clientId, tenantId },
      select: { id: true },
    }),
    prisma.service.findFirst({
      where: { id: serviceId, tenantId },
      select: { id: true },
    }),
  ]);

  if (!client || !service) {
    throw new Error("El cliente o servicio no pertenece a tu negocio");
  }

  return prisma.appointment.create({
    data: {
      tenantId,
      clientId,
      serviceId,
      date,
    },
  });
}

export async function getClients() {
  const tenantId = await requireTenantAdmin();
  return prisma.client.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getServices() {
  const tenantId = await requireTenantAdmin();
  return prisma.service.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
  });
}
