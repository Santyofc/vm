import { getServices } from "@/actions/tenant";
import { Plus, Scissors, Clock, DollarSign, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default async function ServiciosPage() {
  const services = await getServices();
  type ServiceRow = (typeof services)[number];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Servicios</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Configura el catálogo de servicios que ofreces a tus clientes.</p>
        </div>
        <button className="bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          Crear Servicio
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.length === 0 ? (
          <div className="col-span-full py-20 bg-white dark:bg-black/40 border border-zinc-200 dark:border-zinc-900 rounded-2xl flex flex-col items-center justify-center text-center px-4">
             <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                <Scissors className="w-8 h-8 text-zinc-400" />
             </div>
             <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">No hay servicios configurados</h3>
             <p className="text-zinc-500 text-sm max-w-xs mt-1">Agrega tu primer servicio para empezar a recibir citas y automatizar tu negocio.</p>
             <button className="mt-6 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
               Guía: Cómo configurar mis servicios
             </button>
          </div>
        ) : (
          services.map((service: ServiceRow) => (
            <div key={service.id} className="bg-white dark:bg-black/40 border border-zinc-200 dark:border-zinc-900 rounded-2xl p-6 hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5 text-zinc-400" />
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Scissors className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">{service.name}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">{service.description || "Sin descripción proporcionada."}</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      <Clock className="w-3 h-3" /> Duración
                   </div>
                   <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{service.duration} min</div>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      <DollarSign className="w-3 h-3" /> Precio
                   </div>
                   <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(service.price)}</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-900/50 flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">Estado: Activo</span>
                <button className="text-xs font-bold text-zinc-400 hover:text-red-500 transition-colors">Desactivar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
