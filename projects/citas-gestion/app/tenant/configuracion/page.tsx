"use client";

import { useState, useEffect } from "react";
import { CreditCard, Shield, User, Loader2, ExternalLink } from "lucide-react";
import { getTenantConfig } from "@/actions/tenant";

export default function ConfiguracionPage() {
  type TenantConfig = Awaited<ReturnType<typeof getTenantConfig>>;
  const billingEnabled =
    process.env.NEXT_PUBLIC_BILLING_ENABLED?.toLowerCase() === "true";

  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const [config, setConfig] = useState<TenantConfig>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await getTenantConfig();
        setConfig(data);
      } catch (err) {
        console.error("Error fetching config:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handlePortalSession = async () => {
    setIsLoadingPortal(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "No se pudo abrir el portal de facturación.");
      }
    } catch (err) {
      console.error("Portal error:", err);
      alert("Error al conectar con la pasarela de pagos.");
    } finally {
      setIsLoadingPortal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  const subscription = config?.tenant?.subscription;
  const isSubscriber = subscription?.status === "ACTIVE" || subscription?.status === "TRIALING";

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Configuración</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Gestiona tu perfil, cuenta y suscripción de facturación.</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <section className="bg-white dark:bg-black/40 border border-zinc-200 dark:border-zinc-900 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 flex items-center gap-3">
             <User className="w-5 h-5 text-zinc-500" />
             <h2 className="text-sm font-bold uppercase tracking-wider">Perfil de Usuario</h2>
          </div>
          <div className="p-8 space-y-6">
             <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-semibold text-zinc-500 uppercase">Nombre Completo</label>
                   <input type="text" className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-500 transition-all" value={config?.name || ""} readOnly />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-semibold text-zinc-500 uppercase">Correo Electrónico</label>
                   <input type="email" className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-500 transition-all text-zinc-400" value={config?.email || ""} readOnly />
                </div>
             </div>
             <button className="bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">
                Guardar Cambios
             </button>
          </div>
        </section>

        {/* Billing Section */}
        <section className="bg-white dark:bg-black/40 border border-zinc-200 dark:border-zinc-900 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 flex items-center gap-3">
             <CreditCard className="w-5 h-5 text-indigo-500" />
             <h2 className="text-sm font-bold uppercase tracking-wider">Plan y Facturación</h2>
          </div>
          <div className="p-8">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        {isSubscriber ? "Plan Elite Pro" : "Sin Suscripción Activa"}
                     </span>
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                       isSubscriber 
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                     }`}>
                        {subscription?.status || "PENDING"}
                     </span>
                  </div>
                  {subscription?.currentPeriodEnd && (
                    <p className="text-sm text-zinc-500">Próximo cobro: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</p>
                  )}
                </div>
                {billingEnabled && subscription?.stripeCustomerId && (
                  <button 
                    onClick={handlePortalSession}
                    disabled={isLoadingPortal}
                    className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline decoration-2 underline-offset-4 disabled:opacity-50"
                  >
                    {isLoadingPortal ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
                    Gestionar en Stripe
                  </button>
                )}
             </div>

             {!isSubscriber && (
                <div className="p-4 rounded-xl border border-zinc-500/20 bg-zinc-500/5 mb-6">
                   <p className="text-sm text-zinc-400 font-medium italic">Actualmente estás usando la versión gratuita. Activa una suscripción para obtener soporte prioritario y funciones avanzadas.</p>
                </div>
             )}

             <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/20">
                   <p className="text-xs text-zinc-500 font-bold uppercase mb-2">Cuota de Citas</p>
                   <div className="flex justify-between items-end">
                      <span className="text-2xl font-bold">1,240</span>
                      <span className="text-xs text-zinc-400 mb-1">/ ∞ ilimitado</span>
                   </div>
                </div>
                <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/20">
                   <p className="text-xs text-zinc-500 font-bold uppercase mb-2">Método de Pago</p>
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-5 bg-zinc-200 dark:bg-zinc-800 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
                      <span className="text-sm font-medium">•••• 4242</span>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Security Settings */}
        <section className="bg-white dark:bg-black/40 border border-zinc-200 dark:border-zinc-900 rounded-2xl overflow-hidden shadow-sm opacity-60 grayscale cursor-not-allowed">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 flex items-center gap-3">
             <Shield className="w-5 h-5 text-zinc-500" />
             <h2 className="text-sm font-bold uppercase tracking-wider">Seguridad (Próximamente)</h2>
          </div>
          <div className="p-8">
             <p className="text-xs text-zinc-500">La autenticación en dos pasos y el historial de sesiones llegarán en la versión 2.0.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
