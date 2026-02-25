export default function ConfiguracionPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Configuración Súper Admin</h1>
        <p className="text-zinc-400 text-sm mt-1">Ajustes globales del ecosistema Zona Sur Tech.</p>
      </div>
      
      <div className="space-y-4">
        <div className="p-6 rounded-xl border border-zinc-900 bg-black/40">
          <h3 className="text-lg font-medium text-white">Información del SaaS</h3>
          <p className="text-sm text-zinc-400 mt-1 mb-4">Administra los dominios principales y opciones de marca.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Dominio Base</label>
              <input 
                type="text" 
                defaultValue="zonasurtech.online"
                disabled
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-500 cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
