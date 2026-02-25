import { getTenants } from "@/actions/admin";

export default async function NegociosPage() {
  const tenants = await getTenants();
  type TenantRow = (typeof tenants)[number];
  const getStatusBadgeClass = (status?: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "TRIALING":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "PAST_DUE":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "CANCELED":
      case "UNPAID":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-transparent">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Negocios (Tenants)</h1>
          <p className="text-zinc-400 text-sm mt-1">Administra los negocios registrados en ZONA SUR TECH.</p>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors">
          + Nuevo Negocio
        </button>
      </div>
      
      <div className="rounded-xl border border-zinc-900 overflow-hidden bg-black/40">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-zinc-500 uppercase bg-zinc-900/50 border-b border-zinc-900">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">Nombre</th>
              <th scope="col" className="px-6 py-4 font-medium">Subdominio / Slug</th>
              <th scope="col" className="px-6 py-4 font-medium">Usuarios</th>
              <th scope="col" className="px-6 py-4 font-medium">Citas Totales</th>
              <th scope="col" className="px-6 py-4 font-medium">Estado</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {tenants.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                  No hay negocios registrados todavía.
                </td>
              </tr>
            ) : (
              tenants.map((tenant: TenantRow) => (
                <tr key={tenant.id} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{tenant.name}</td>
                  <td className="px-6 py-4 text-zinc-400 font-mono text-xs">{tenant.slug}.zonasurtech.online</td>
                  <td className="px-6 py-4">{tenant._count.users}</td>
                  <td className="px-6 py-4">{tenant._count.appointments}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold border ${getStatusBadgeClass(tenant.subscription?.status)}`}
                    >
                      {tenant.subscription?.status || "SIN PLAN"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-zinc-500 hover:text-white transition-colors">Gestionar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
