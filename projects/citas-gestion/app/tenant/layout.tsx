/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, CalendarDays, Users, Scissors, Settings } from "lucide-react";
import { auth } from "@/auth";

export default async function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id || !session.user.tenantId) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50 selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black/40 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-900">
          <span className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
            Mi Negocio
          </span>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1 relative">
          <div className="mb-4 px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Gestion
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 transition-all duration-200"
          >
            <LayoutDashboard className="w-4 h-4" />
            Resumen
          </Link>
          <Link
            href="/calendario"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 transition-all duration-200"
          >
            <CalendarDays className="w-4 h-4" />
            Calendario
          </Link>
          <Link
            href="/clientes"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 transition-all duration-200"
          >
            <Users className="w-4 h-4" />
            Clientes
          </Link>
          <Link
            href="/servicios"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 transition-all duration-200"
          >
            <Scissors className="w-4 h-4" />
            Servicios
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-900">
          <Link
            href="/configuracion"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 transition-all duration-200"
          >
            <Settings className="w-4 h-4" />
            Configuracion
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 flex items-center justify-end px-8 border-b border-zinc-200 dark:border-zinc-900 bg-white/50 dark:bg-black/20 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <span className="hidden sm:inline-block">
              {session.user.name || "Administrador"}
            </span>
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-xs text-zinc-600 dark:text-zinc-400 overflow-hidden">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                session.user.name?.[0]?.toUpperCase() || "A"
              )}
            </div>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-auto bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]">
          {children}
        </div>
      </main>
    </div>
  );
}
