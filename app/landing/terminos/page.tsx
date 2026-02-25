import Link from "next/link";
import { ArrowLeft, Scale, CheckCircle2 } from "lucide-react";

export default function TerminosPage() {
  return (
    <div className="text-zinc-300 font-sans selection:bg-zinc-800">
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-900/50 bg-black/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
          <div className="font-bold tracking-widest uppercase text-xs text-zinc-500">
            Zona Sur Tech
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-6 border border-zinc-800">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
              Terminos y Condiciones de Servicio
            </h1>
            <p className="text-zinc-500">Ultima actualizacion: 24 de Febrero de 2026</p>
          </div>

          <div className="prose prose-invert prose-zinc max-w-none">
            <p className="lead text-lg text-zinc-400">
              Bienvenido a ZONA SUR TECH (&quot;Nosotros&quot;, &quot;la Plataforma&quot;).
              Al registrar un negocio, acceder o utilizar nuestros servicios de
              gestion de citas y metricas en linea, usted acepta apegarse a los
              siguientes Terminos y Condiciones.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
              1. Objeto del Servicio
            </h2>
            <p>
              Zona Sur Tech provee un software como servicio (SaaS) enfocado a
              clinicas, salones y consultorios. Incluye agendas digitales,
              recordatorios automatizados, paginas de reserva para clientes y
              tableros de metricas operativas.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
              2. Cuentas Comerciales e Identidad
            </h2>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                Usted asume la responsabilidad por la exactitud de los datos de
                facturacion e identidad juridica proporcionados.
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                Esta prohibido utilizar la plataforma para practicas ilegales,
                fraudes comerciales o actividades que atenten contra el bienestar
                publico.
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                El acceso a cuentas <code>TENANT_ADMIN</code> es intransferible y
                sujeto a monitoreo de seguridad.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
              3. Planes de Suscripcion, Cargos y Pagos
            </h2>
            <p>
              La utilizacion del sistema requiere una suscripcion mensual o anual,
              segun se indique en la pagina de precios. Si un pago falla
              repetidamente durante mas de 7 dias naturales
              (&quot;Past Due&quot;), nos reservamos el derecho de suspender el acceso
              manteniendo los datos seguros. Usted puede cancelar en cualquier
              momento sin penalizaciones.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
              4. Disponibilidad del Servicio
            </h2>
            <p>
              Objetivo de disponibilidad del 99.9%. Las ventanas de mantenimiento
              tecnico se notificaran al correo administrativo con al menos 48 horas
              de anticipacion.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
              5. Propiedad Intelectual
            </h2>
            <p>
              El codigo fuente, disenos, logotipos y algoritmos de la plataforma
              son propiedad exclusiva de la empresa, incluyendo el branding
              &quot;Zona Sur Tech&quot;.
            </p>

            <div className="mt-16 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-white font-semibold mb-2">Resolucion de Dudas</h3>
              <p className="text-sm">
                Para cualquier consulta legal, contactanos en
                legal@zonasurtech.online.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
