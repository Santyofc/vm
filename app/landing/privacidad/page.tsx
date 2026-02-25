import Link from "next/link";
import { ArrowLeft, Shield, Lock } from "lucide-react";

export default function PrivacidadPage() {
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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
              Politica de Privacidad Integral
            </h1>
            <p className="text-zinc-500">Vigencia a partir de: 24 de Febrero de 2026</p>
          </div>

          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 mb-12">
              <div className="flex items-start gap-4">
                <Lock className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold m-0 mb-2">
                    Compromiso Criptografico
                  </h3>
                  <p className="text-sm text-zinc-400 m-0">
                    Protegemos sus datos con practicas de seguridad modernas y
                    almacenamiento en infraestructura PostgreSQL con TLS.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
              1. Datos que Recolectamos
            </h2>
            <p>
              Recolectamos informacion necesaria para operar la plataforma:
              identidad del negocio, datos de acceso y datos de agenda.
            </p>
            <ul>
              <li>
                <strong>Datos del titular del negocio:</strong> correos, proveedores
                OAuth, credenciales hasheadas y metricas de uso.
              </li>
              <li>
                <strong>Datos de clientes finales:</strong> nombre, email y telefono
                de personas que reservan citas.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
              2. Privacidad para Clientes Finales
            </h2>
            <p>
              Zona Sur Tech actua como procesador de datos para su negocio. No
              vendemos ni monetizamos datos de clientes finales de su tenant.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
              3. Seguridad de Acceso
            </h2>
            <p>
              Contamos con un esquema de control estricto (&quot;Hard Gate&quot;) que
              requiere verificacion de correo para accesos administrativos
              sensibles.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
              4. Retencion de Informacion
            </h2>
            <p>
              Ante baja de cuenta o cancelacion, se aplica una ventana de
              conservacion controlada (&quot;cool-down&quot;) antes del borrado definitivo.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
              5. Derechos sobre su Informacion
            </h2>
            <p>
              Puede solicitar exportacion o eliminacion de sus datos contactando a
              soporte@zonasurtech.online.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
