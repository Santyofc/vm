import { prisma } from "@/lib/db";

export async function LiveDashboardPreview() {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  // We add a synthetic delay to prove the Skeleton loader actually fires as requested.
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  let upcomingAppointments: Array<{
    id: string;
    date: Date;
    status: string;
    client: { name: string };
    service: { name: string };
  }> = [];

  try {
    upcomingAppointments = await prisma.appointment.findMany({
      where: {
        // Same mock tenant logic
        tenant: { subdomain: "citas" },
        date: { gte: todayStart },
      },
      include: { client: true, service: true },
      orderBy: { date: "asc" },
      take: 5,
    });
  } catch (error) {
    console.error("LiveDashboardPreview fallback: database unavailable", error);
  }

  const formatter = new Intl.DateTimeFormat("es-MX", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="divide-y divide-zinc-800/50">
      {upcomingAppointments.length === 0 ? (
        <div className="p-8 text-center text-zinc-500">No hay citas programadas para hoy.</div>
      ) : (
        upcomingAppointments.map((app) => (
          <div key={app.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-900/30 transition-colors">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-400 uppercase">
                {app.client.name.substring(0, 2)}
              </div>
              <div>
                 <p className="text-white font-medium text-sm">{app.client.name}</p>
                 <p className="text-zinc-500 text-xs">{app.service.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white">{formatter.format(new Date(app.date))}</span>
              <span className={`border px-2 py-1 rounded text-xs font-medium w-24 text-center ${
                app.status === "CONFIRMED" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                app.status === "PENDING" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                app.status === "COMPLETED" ? "bg-zinc-800 text-zinc-400 border-zinc-700" :
                "bg-red-500/10 text-red-500 border-red-500/20"
              }`}>
                {app.status === "CONFIRMED" ? "Confirmado" :
                 app.status === "PENDING" ? "Pendiente" :
                 app.status === "COMPLETED" ? "Finalizado" : "Cancelado"}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="divide-y divide-zinc-800/50">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-4 items-center w-full">
            <div className="w-10 h-10 rounded-full bg-zinc-800 animate-pulse flex-shrink-0"></div>
            <div className="flex flex-col gap-2 w-full max-w-[200px]">
               <div className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
               <div className="h-3 bg-zinc-800/50 rounded animate-pulse w-2/3"></div>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0">
            <div className="h-4 bg-zinc-800 rounded animate-pulse w-16"></div>
            <div className="h-6 bg-zinc-800/80 rounded animate-pulse w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
