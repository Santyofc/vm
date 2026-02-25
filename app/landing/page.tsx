/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Calendar, Clock, CreditCard, Sparkles, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";
import { AnimatedSection, AnimatedStaggerItem, AnimatedPulseIcon, AnimatedButton } from "@/components/landing/Animators";
import { LiveDashboardPreview, DashboardSkeleton } from "@/components/landing/LiveDashboardPreview";
import { PricingButton } from "@/components/landing/PricingButton";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen text-zinc-50 font-sans selection:bg-zinc-800">
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 border-b border-zinc-900/50 bg-black/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-zinc-100" />
              <span className="font-bold tracking-widest uppercase text-sm">Zona Sur Tech</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
              <Link href="#caracteristicas" className="hover:text-white transition-colors">Características</Link>
              <Link href="#beneficios" className="hover:text-white transition-colors">Beneficios</Link>
              <Link href="#precios" className="hover:text-white transition-colors">Planes</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors hidden sm:block">
                Iniciar Sesión
              </Link>
              <AnimatedButton
                href="#contacto" 
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
              >
                Comenzar Gratis
              </AnimatedButton>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(90,50,250,0.15),rgba(0,0,0,0))] rounded-full blur-3xl pointer-events-none"></div>
          
          <AnimatedSection className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-medium text-zinc-300 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]"></span>
              La plataforma definitiva para tu negocio
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-4xl text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-indigo-400">
              Ahorra horas de gestión y automatiza tus citas.
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
              El sistema todo-en-uno diseñado para clínicas, salones y consultorios. Elimina el papeleo, fideliza a tus clientes y enfócate en lo que mejor sabes hacer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <AnimatedButton href="/registro" className="h-12 px-8 rounded-full bg-white text-black font-medium flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]">
                Empezar Ahora
                <ArrowRight className="w-4 h-4" />
              </AnimatedButton>
              <AnimatedButton href="/login" className="h-12 px-8 rounded-full border border-zinc-800 bg-zinc-900/50 text-white font-medium flex items-center justify-center backdrop-blur-sm">
                Acceso Clientes
              </AnimatedButton>
            </div>
            
            {/* Dashboard Preview Mockup */}
            <div className="mt-20 w-full max-w-5xl relative rounded-t-3xl border-t border-x border-zinc-800/80 bg-black/40 p-4 pb-0 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl">
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
              <div className="rounded-t-2xl border border-zinc-800/80 overflow-hidden bg-zinc-950/80 relative z-10 w-full">
                {/* Browser UI Bar */}
                <div className="w-full h-10 border-b border-zinc-900 bg-zinc-900/50 flex items-center px-4 gap-2 backdrop-blur-sm">
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                  <div className="mx-auto bg-black/40 text-zinc-500 text-[10px] sm:text-xs px-24 py-1 rounded-md hidden sm:block">
                    cita.zonasurtech.online
                  </div>
                </div>
                
                {/* Dashboard Content */}
                <div className="p-6 md:p-8 flex flex-col gap-6 text-left relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none"></div>
                    {/* Top Header */}
                    <AnimatedStaggerItem index={0} className="flex justify-between items-center pb-6 border-b border-zinc-900/50 relative z-10">
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Panel de Control</h3>
                        <p className="text-sm text-zinc-500">Resumen de actividad - Barbería Elite</p>
                      </div>
                      <div className="bg-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        En vivo
                      </div>
                    </AnimatedStaggerItem>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
                      <AnimatedStaggerItem index={1} className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4 backdrop-blur-md">
                        <p className="text-zinc-500 text-sm font-medium mb-1">Citas Hoy</p>
                        <p className="text-3xl font-bold text-white">12</p>
                        <p className="text-emerald-500 text-xs mt-2 font-medium">↑ 20% vs ayer</p>
                      </AnimatedStaggerItem>
                      <AnimatedStaggerItem index={2} className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4 backdrop-blur-md">
                        <p className="text-zinc-500 text-sm font-medium mb-1">Ingresos Estimados</p>
                        <p className="text-3xl font-bold text-white">$450</p>
                        <p className="text-emerald-500 text-xs mt-2 font-medium">↑ 5% vs ayer</p>
                      </AnimatedStaggerItem>
                      <AnimatedStaggerItem index={3} className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4 hidden sm:block backdrop-blur-md">
                        <p className="text-zinc-500 text-sm font-medium mb-1">Tasa de Asistencia</p>
                        <p className="text-3xl font-bold text-white">98%</p>
                        <p className="text-zinc-500 text-xs mt-2 font-medium">Promedio óptimo</p>
                      </AnimatedStaggerItem>
                    </div>

                    {/* Appointments Table (Real Data) */}
                    <AnimatedStaggerItem index={4} className="relative z-10">
                      <h4 className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wider">Próximas Citas (En Vivo)</h4>
                      <div className="bg-black/50 border border-zinc-800/50 rounded-xl overflow-hidden backdrop-blur-md">
                        <Suspense fallback={<DashboardSkeleton />}>
                           <LiveDashboardPreview />
                        </Suspense>
                      </div>
                    </AnimatedStaggerItem>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Features Section */}
        <section id="caracteristicas" className="py-24 border-t border-zinc-900/50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Características diseñadas para el mundo real</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">No solo es un calendario. Es un motor de operaciones completo que trabaja 24/7 para tu negocio, eliminando tareas repetitivas y multiplicando tu eficiencia.</p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatedStaggerItem index={0} className="p-8 rounded-3xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/40 to-black hover:border-zinc-700 transition-all group backdrop-blur-sm">
                <AnimatedPulseIcon className="w-14 h-14 rounded-2xl bg-zinc-800/80 flex items-center justify-center mb-6 text-indigo-400">
                  <Clock className="w-7 h-7" />
                </AnimatedPulseIcon>
                <h3 className="text-xl font-bold mb-3 text-white">Reservas Autónomas 24/7</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  Tu negocio nunca duerme. Permite a tus clientes agendar citas de forma independiente en cualquier momento mediante un portal optimizado para celulares, sincronizado al instante con tu disponibilidad real.
                </p>
              </AnimatedStaggerItem>

              <AnimatedStaggerItem index={1} className="p-8 rounded-3xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/40 to-black hover:border-zinc-700 transition-all group backdrop-blur-sm">
                <AnimatedPulseIcon className="w-14 h-14 rounded-2xl bg-zinc-800/80 flex items-center justify-center mb-6 text-green-400">
                  <Calendar className="w-7 h-7" />
                </AnimatedPulseIcon>
                <h3 className="text-xl font-bold mb-3 text-white">Gestión Anti-Ausencias</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  El 20% de las citas se pierden por olvido. Nuestro sistema dispara recordatorios automatizados inteligentes (Email y SMS), reduciendo drásticamente las plantadas y asegurando la ocupación de tu agenda.
                </p>
              </AnimatedStaggerItem>

              <AnimatedStaggerItem index={2} className="p-8 rounded-3xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/40 to-black hover:border-zinc-700 transition-all group backdrop-blur-sm">
                <AnimatedPulseIcon className="w-14 h-14 rounded-2xl bg-zinc-800/80 flex items-center justify-center mb-6 text-emerald-400">
                  <CreditCard className="w-7 h-7" />
                </AnimatedPulseIcon>
                <h3 className="text-xl font-bold mb-3 text-white">Métricas Financieras en Vivo</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  Deja de adivinar cuánto ganaste. Visualiza un panel en tiempo real con ingresos del día, servicios más rentables y tasa de asistencia. Decisiones basadas en datos, no en intuición.
                </p>
              </AnimatedStaggerItem>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="beneficios" className="py-24 border-t border-zinc-900/50 relative overflow-hidden bg-zinc-950/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">El impacto real de digitalizar tu gestión.</h2>
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                  Nuestros clientes no solo ahorran tiempo; transforman por completo la manera en que experimentan su propio negocio. Un sistema profesional eleva la percepción de tu marca.
                </p>
                
                <ul className="space-y-6">
                  <AnimatedStaggerItem index={0} className="flex items-start gap-4">
                      <div className="mt-1 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">Aumento de Ingresos (ROI)</h4>
                        <p className="text-zinc-400 text-sm mt-1">Al minimizar huecos vacíos y no-shows, los negocios experimentan un incremento promedio del 30% en facturación durante el primer trimestre.</p>
                      </div>
                  </AnimatedStaggerItem>
                  <AnimatedStaggerItem index={1} className="flex items-start gap-4">
                      <div className="mt-1 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">Control Absoluto del Tiempo</h4>
                        <p className="text-zinc-400 text-sm mt-1">Recupera hasta 15 horas a la semana que antes perdías coordinando mensajes, re-agendando y resolviendo conflictos de calendario cruzados.</p>
                      </div>
                  </AnimatedStaggerItem>
                  <AnimatedStaggerItem index={2} className="flex items-start gap-4">
                      <div className="mt-1 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">Experiencia Premium para Clientes</h4>
                        <p className="text-zinc-400 text-sm mt-1">Proyecta una imagen altamente corporativa, seria y confiable desde el primer clic que hace tu cliente para reservar su servicio.</p>
                      </div>
                  </AnimatedStaggerItem>
                </ul>
              </AnimatedSection>
              
              <AnimatedSection className="relative" delay={0.2}>
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-transparent rounded-3xl blur-3xl mix-blend-screen"></div>
                <div className="relative bg-black/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-[0_0_40px_rgba(99,102,241,0.1)] overflow-hidden group hover:border-zinc-700 transition-colors">
                  
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 blur-xl"></div>
                  
                  {/* ROI Metric Badge */}
                  <AnimatedPulseIcon className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-8">
                    <TrendingUp className="w-4 h-4" />
                    Métrica de Impacto
                  </AnimatedPulseIcon>

                  <div className="space-y-6">
                      <div>
                        <h5 className="text-4xl font-extrabold text-white mb-2">+30%</h5>
                        <p className="text-zinc-500 font-medium">Crecimiento Promedio de Ingresos Mensuales</p>
                      </div>
                      
                      <div className="w-full h-px bg-zinc-900 my-4"></div>
                      
                      <div>
                        <h5 className="text-4xl font-extrabold text-white mb-2">-15 Hrs</h5>
                        <p className="text-zinc-500 font-medium">Ahorradas en tareas administrativas semanales</p>
                      </div>
                  </div>

                  <div className="mt-10 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex items-center gap-4 backdrop-blur-sm">
                    <AnimatedPulseIcon className="w-12 h-12 bg-black rounded-full flex items-center justify-center border border-zinc-800 shadow-inner">
                      <ShieldCheck className="w-6 h-6 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]" />
                    </AnimatedPulseIcon>
                    <div>
                      <p className="text-white font-bold text-sm">Sistema Verificado y Protegido</p>
                      <p className="text-zinc-500 text-xs">Cumplimiento total y copias de seguridad cada 24H.</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="precios" className="py-24 border-t border-zinc-900/50 relative">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="text-center mb-20 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
                Sin contratos forzosos. Cancela cuando quieras.
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Un plan diseñado para cada etapa</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Comienza sin tarjeta y escala conforme tu negocio factura más.</p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Plan Gratis */}
              <AnimatedStaggerItem index={0} className="p-8 rounded-3xl border border-zinc-800 bg-black/80 backdrop-blur-xl relative flex flex-col">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-zinc-300 mb-2">Prueba Gratis</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-zinc-500">/ 14 días</span>
                  </div>
                  <p className="text-zinc-500 text-sm mt-4">Explora todo el poder del sistema sin compromisos.</p>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex gap-3 text-zinc-300"><CheckCircle2 className="w-5 h-5 text-zinc-600 flex-shrink-0" /> <span className="text-sm">Acceso Total Inmediato</span></li>
                  <li className="flex gap-3 text-zinc-300"><CheckCircle2 className="w-5 h-5 text-zinc-600 flex-shrink-0" /> <span className="text-sm">Agenda interactiva</span></li>
                  <li className="flex gap-3 text-zinc-300"><CheckCircle2 className="w-5 h-5 text-zinc-600 flex-shrink-0" /> <span className="text-sm">Sin tarjeta de crédito requerida</span></li>
                </ul>
                <AnimatedButton 
                  href="/registro"
                  className="w-full py-4 rounded-xl border border-zinc-700 font-medium text-white hover:bg-zinc-900 transition-colors flex items-center justify-center"
                >
                  Crear Cuenta Gratis
                </AnimatedButton>
              </AnimatedStaggerItem>

              {/* Plan Esencial */}
              <AnimatedStaggerItem index={1} className="p-8 rounded-3xl border border-zinc-800 bg-black/80 backdrop-blur-xl relative flex flex-col">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-zinc-300 mb-2">Esencial</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-zinc-500">/ mes</span>
                  </div>
                  <p className="text-zinc-500 text-sm mt-4">Para profesionales independientes y consultorios pequeños.</p>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex gap-3 text-zinc-300"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 shadow-[0_0_5px_rgba(52,211,153,0.3)] rounded-full" /> <span className="text-sm">Hasta 100 citas mensuales</span></li>
                  <li className="flex gap-3 text-zinc-300"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 shadow-[0_0_5px_rgba(52,211,153,0.3)] rounded-full" /> <span className="text-sm">Recordatorios Automáticos (Email)</span></li>
                  <li className="flex gap-3 text-zinc-300"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 shadow-[0_0_5px_rgba(52,211,153,0.3)] rounded-full" /> <span className="text-sm">Dashboard de Financiero Básico</span></li>
                  <li className="flex gap-3 text-zinc-300"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 shadow-[0_0_5px_rgba(52,211,153,0.3)] rounded-full" /> <span className="text-sm">1 Cuenta de Staff</span></li>
                </ul>
                <PricingButton 
                  priceId="price_esencial_id" 
                  planName="Esencial"
                  className="w-full py-4 rounded-xl border border-zinc-800 bg-black/80 hover:bg-zinc-900 transition-colors font-medium text-white flex items-center justify-center" 
                />
              </AnimatedStaggerItem>

              {/* Plan Elite */}
              <AnimatedStaggerItem index={2} className="p-8 rounded-3xl border border-indigo-500/50 bg-zinc-900/60 backdrop-blur-2xl relative flex flex-col overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.15)] transform z-10">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-indigo-500 to-purple-500"></div>
                
                <div className="mb-8 relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">Elite Pro</h3>
                    <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.4)]">Recomendado</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$79</span>
                    <span className="text-zinc-400">/ mes</span>
                  </div>
                  <p className="text-zinc-400 text-sm mt-4">Para clínicas, salones de gran volumen y flotas.</p>
                </div>
                <ul className="space-y-4 mb-8 flex-1 relative z-10">
                  <li className="flex gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 shadow-[0_0_5px_rgba(129,140,248,0.5)] rounded-full" /> <span className="text-sm font-medium">Citas Ilimitadas sin restricción</span></li>
                  <li className="flex gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 shadow-[0_0_5px_rgba(129,140,248,0.5)] rounded-full" /> <span className="text-sm font-medium">Cuentas de Staff Ilimitadas</span></li>
                  <li className="flex gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 shadow-[0_0_5px_rgba(129,140,248,0.5)] rounded-full" /> <span className="text-sm font-medium">Recordatorios por WhatsApp (Próximamente)</span></li>
                  <li className="flex gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 shadow-[0_0_5px_rgba(129,140,248,0.5)] rounded-full" /> <span className="text-sm font-medium">Reportes y Exportación Avanzada</span></li>
                  <li className="flex gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 shadow-[0_0_5px_rgba(129,140,248,0.5)] rounded-full" /> <span className="text-sm font-medium">Soporte Prioritario VIP 24/7</span></li>
                </ul>
                <PricingButton 
                  priceId="price_elite_id" 
                  planName="Elite Pro"
                  isPopular={true}
                  className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                />
              </AnimatedStaggerItem>
            </div>
          </div>
        </section>

        {/* Contacto Section */}
        <section id="contacto" className="py-24 border-t border-zinc-900 relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <AnimatedSection>
              <h2 className="text-4xl font-bold mb-6">¿Listo para transformar tu negocio?</h2>
              <p className="text-zinc-400 mb-10">Agenda una consultoría personalizada o activa tu demo hoy mismo.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://wa.me/50687623229?text=Hola%20Zona%20Sur%20Tech,%20necesito%20soporte%20con%20mi%20plataforma." className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                  WhatsApp Directo
                </a>
                <Link href="/registro" className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center justify-center">
                  Registrarme Gratis
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-900 bg-black/80 backdrop-blur-xl py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-zinc-500" />
              <span className="font-bold tracking-widest uppercase text-sm text-zinc-500">Zona Sur Tech</span>
            </div>
            <p className="text-sm text-zinc-600">
              &copy; {new Date().getFullYear()} Zona Sur Tech. Todos los derechos reservados.
            </p>
            <div className="flex gap-8 text-sm font-medium text-zinc-500">
              <Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link>
              <Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
