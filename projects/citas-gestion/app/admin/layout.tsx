import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Store, CreditCard, Settings } from "lucide-react";
import { auth } from "@/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "SUPERADMIN") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 font-sans text-zinc-50 selection:bg-zinc-800">
      <aside className="w-64 border-r border-zinc-900 bg-black/40 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-900">
          <span className="text-sm font-medium tracking-widest text-zinc-100 uppercase">
            ZONA SUR TECH
          </span>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1 relative">
          <div className="mb-4 px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Super Admin
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all duration-200"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/negocios"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all duration-200"
          >
            <Store className="w-4 h-4" />
            Negocios
          </Link>
          <Link
            href="/suscripciones"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all duration-200"
          >
            <CreditCard className="w-4 h-4" />
            Suscripciones
          </Link>
          <Link
            href="/configuracion"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all duration-200"
          >
            <Settings className="w-4 h-4" />
            Configuracion
          </Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-end px-8 border-b border-zinc-900 bg-black/20 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4 text-sm font-medium text-zinc-400">
            <span className="hidden sm:inline-block">{session.user.name || "Owner"}</span>
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-zinc-400">
              ST
            </div>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-auto bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]">
          {children}
        </div>
      </main>
    </div>
  );
}
