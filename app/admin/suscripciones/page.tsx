export default function SuscripcionesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Suscripciones</h1>
        <p className="text-zinc-400 text-sm mt-1">Control de pagos y planes de los negocios.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder basic stats */}
        <div className="p-5 rounded-xl border border-zinc-900 bg-black/40">
           <p className="text-xs text-zinc-500 uppercase font-semibold">Activas</p>
           <p className="text-2xl font-bold text-white mt-1">0</p>
        </div>
        <div className="p-5 rounded-xl border border-zinc-900 bg-black/40">
           <p className="text-xs text-zinc-500 uppercase font-semibold">Trial</p>
           <p className="text-2xl font-bold text-white mt-1">0</p>
        </div>
        <div className="p-5 rounded-xl border border-zinc-900 bg-black/40">
           <p className="text-xs text-zinc-500 uppercase font-semibold">Canceladas</p>
           <p className="text-2xl font-bold text-white mt-1">0</p>
        </div>
        <div className="p-5 rounded-xl border border-zinc-900 bg-black/40">
           <p className="text-xs text-zinc-500 uppercase font-semibold">Vencidas</p>
           <p className="text-2xl font-bold text-red-500 mt-1">0</p>
        </div>
      </div>
    </div>
  );
}
