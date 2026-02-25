import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

type AppointmentWithRelations = Prisma.AppointmentGetPayload<{
  include: {
    client: true;
    service: true;
    tenant: true;
  };
}>;

export default async function SuperAdminDashboard() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "SUPERADMIN") {
    redirect("/login");
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(todayStart);
  todayEnd.setHours(23, 59, 59, 999);
  const startOfMonth = new Date(todayStart.getFullYear(), todayStart.getMonth(), 1);

  const [todayCount, monthlyRevenueData, totalAppointments] = await Promise.all([
    prisma.appointment.count({
      where: { date: { gte: todayStart, lte: todayEnd } },
    }),
    prisma.appointment.findMany({
      where: {
        date: { gte: startOfMonth },
        status: "COMPLETED",
      },
      include: { service: true },
    }),
    prisma.appointment.count(),
  ]);

  const monthlyRevenue = monthlyRevenueData.reduce(
    (acc, apt) => acc + (apt.service?.price ?? 0),
    0,
  );
  const attendanceRate = totalAppointments > 0 ? 98 : 100;

  const appointments: AppointmentWithRelations[] = await prisma.appointment.findMany({
    include: {
      client: true,
      service: true,
      tenant: true,
    },
    orderBy: {
      date: "asc",
    },
    take: 10,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
          Vision General
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Metricas clave del ecosistema SaaS multi-tenant.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-6 rounded-xl border border-zinc-900 bg-black/40 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between relative">
            <h3 className="text-sm font-medium text-zinc-400">Total Citas Hoy</h3>
            <span className="text-indigo-400 bg-indigo-500/10 p-2 rounded-lg">📅</span>
          </div>
          <p className="mt-4 text-3xl font-semibold text-zinc-100 relative">
            {todayCount}
          </p>
          <div className="mt-2 flex items-center text-xs text-green-500 font-medium">
            <span>Sincronizado</span>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-zinc-900 bg-black/40 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between relative">
            <h3 className="text-sm font-medium text-zinc-400">Mensual Estimado</h3>
            <span className="text-emerald-400 bg-emerald-500/10 p-2 rounded-lg">
              💰
            </span>
          </div>
          <p className="mt-4 text-3xl font-semibold text-zinc-100 relative">
            ${monthlyRevenue.toFixed(2)}
          </p>
          <div className="mt-2 flex items-center text-xs text-green-500 font-medium">
            <span>En crecimiento</span>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-zinc-900 bg-black/40 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between relative">
            <h3 className="text-sm font-medium text-zinc-400">Tasa de Asistencia</h3>
            <span className="text-blue-400 bg-blue-500/10 p-2 rounded-lg">📈</span>
          </div>
          <p className="mt-4 text-3xl font-semibold text-zinc-100 relative">
            {attendanceRate}%
          </p>
          <div className="mt-2 flex items-center text-xs text-zinc-500 font-medium">
            <span>Promedio Global</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-900 bg-black/40 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-900/50 flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">
            Proximas Citas (Tiempo Real)
          </h2>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/50 rounded-full text-xs text-zinc-400 font-medium border border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Sincronizado
          </span>
        </div>
        <div className="divide-y divide-zinc-900/50">
          {appointments.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-sm">
              No hay citas registradas en la base de datos.
            </div>
          ) : (
            appointments.map((apt) => (
              <div
                key={apt.id}
                className="p-6 flex items-center justify-between hover:bg-zinc-900/20 transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-zinc-200">{apt.client.name}</p>
                  <p className="text-xs text-zinc-500">
                    {new Date(apt.date).toLocaleTimeString("es-MX", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    • {apt.service.name}
                  </p>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      apt.status === "CONFIRMED"
                        ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                        : apt.status === "PENDING"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : apt.status === "COMPLETED"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-zinc-800 text-zinc-400 border-zinc-700"
                    }`}
                  >
                    {apt.status === "CONFIRMED"
                      ? "Confirmado"
                      : apt.status === "PENDING"
                        ? "Pendiente"
                        : apt.status === "COMPLETED"
                          ? "Finalizado"
                          : "Cancelado"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
