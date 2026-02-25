import { getDashboardMetrics, getUpcomingAppointments } from "@/actions/tenant";
import { formatTime, formatCurrency } from "@/lib/utils";

export default async function TenantDashboard() {
  const metrics = await getDashboardMetrics();
  const appointments = await getUpcomingAppointments();
  type AppointmentRow = (typeof appointments)[number];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Resumen del Negocio</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Monitorea tus citas, ingresos y rendimiento general hoy.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black/40 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Citas para Hoy</h3>
            <span className="text-zinc-300 dark:text-zinc-600 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg">📅</span>
          </div>
          <p className="mt-4 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{metrics.todayAppointments}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2 font-medium">Programadas este día</p>
        </div>
        
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black/40 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Ingresos del Mes</h3>
            <span className="text-zinc-300 dark:text-zinc-600 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg">💰</span>
          </div>
          <p className="mt-4 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(metrics.monthlyRevenue)}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2 font-medium">Facturado y completado</p>
        </div>
        
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black/40 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Tasa de Asistencia</h3>
            <span className="text-zinc-300 dark:text-zinc-600 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg">📊</span>
          </div>
          <p className="mt-4 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{metrics.attendanceRate}%</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2 font-medium">Promedio del negocio</p>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black/40 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Servicio Destacado</h3>
            <span className="text-zinc-300 dark:text-zinc-600 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg">⭐</span>
          </div>
          <p className="mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100 truncate">{metrics.topService}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2 font-medium">El más solicitado</p>
        </div>
      </div>
      
      {/* Próximas Citas */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-900 overflow-hidden bg-white dark:bg-black/40 shadow-sm">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-900 flex justify-between items-center">
          <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Próximas Citas</h3>
          <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Ver Calendario</button>
        </div>
        
        {appointments.length > 0 ? (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-900/50">
            {appointments.map((appt: AppointmentRow) => (
              <div key={appt.id} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-600 dark:text-zinc-300 uppercase">
                     {appt.client.name.substring(0, 2)}
                   </div>
                   <div>
                     <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{appt.client.name}</p>
                     <p className="text-xs text-zinc-500 dark:text-zinc-400">{appt.service.name} • {appt.service.duration} min</p>
                   </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{formatTime(appt.date)}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium mt-1 ${
                    appt.status === "PENDING" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
                    appt.status === "CONFIRMED" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                    appt.status === "COMPLETED" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {appt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-zinc-500 text-sm">
            No tienes citas programadas para próximamente.
          </div>
        )}
      </div>
    </div>
  );
}
