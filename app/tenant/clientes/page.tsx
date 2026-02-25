import { getClients } from "@/actions/tenant";
import { Plus, Search, Mail, Phone, Calendar } from "lucide-react";

export default async function ClientesPage() {
  const clients = await getClients();
  type ClientRow = (typeof clients)[number];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Clientes</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Administra la base de datos de usuarios de tu negocio.</p>
        </div>
        <button className="bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          Registrar Cliente
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input 
          type="text" 
          placeholder="Buscar cliente por nombre o correo..." 
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-900 overflow-hidden bg-white dark:bg-black/40 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-100 dark:divide-zinc-900/50">
          {clients.length === 0 ? (
            <div className="col-span-full p-12 text-center text-zinc-500 text-sm">
              Aún no tienes clientes registrados. Los clientes aparecerán aquí automáticamente cuando agenden una cita o puedes agregarlos manualmente.
            </div>
          ) : (
            clients.map((client: ClientRow) => (
              <div key={client.id} className="p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                    {client.name[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{client.name}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">Cliente desde {new Date(client.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <Mail className="w-3.5 h-3.5" />
                    {client.email || "No especificado"}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <Phone className="w-3.5 h-3.5" />
                    {client.phone || "Sin teléfono"}
                  </div>
                </div>

                <div className="pt-4 mt-auto border-t border-zinc-100 dark:border-zinc-900/50 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-zinc-400">
                    <Calendar className="w-3 h-3" />
                    Próxima Cita: --
                  </div>
                  <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                    Ver Perfil
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
