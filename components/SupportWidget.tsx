"use client";

import { useState } from "react";
import { MessageCircle, X, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"menu" | "chat">("menu");
  const [ticketState, setTicketState] = useState<"idle" | "sending" | "sent">("idle");
  const [message, setMessage] = useState("");

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setTicketState("sending");
    // Simulate sending ticket
    setTimeout(() => {
      console.log(`[TICKET SENDED to soporte@zonasurtech.online]: ${message}`);
      setTicketState("sent");
      setMessage("");
      
      setTimeout(() => {
        setTicketState("idle");
        setActiveTab("menu");
        setIsOpen(false);
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <div className="fixed bottom-6 right-20 z-[9900]">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-colors flex items-center justify-center"
          aria-label="Soporte y Ayuda"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(5px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-[9990] w-80 bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600/90 to-purple-800/90 p-4 border-b border-indigo-500/20">
              <h3 className="text-white font-semibold flex items-center gap-2 drop-shadow-md">
                <MessageSquare className="w-5 h-5 text-indigo-200" /> 
                Soporte Zona Sur Tech
              </h3>
              <p className="text-indigo-200 text-xs mt-1">¿En qué podemos ayudarte hoy?</p>
            </div>

            {/* Body */}
            <div className="p-4 bg-zinc-950/50 min-h-[250px] relative">
              <AnimatePresence mode="wait">
                {activeTab === "menu" && (
                  <motion.div 
                    key="menu"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <Link
                      href="https://wa.me/5491138407481?text=Hola%20Zona%20Sur%20Tech,%20necesito%20soporte%20con%20mi%20plataforma."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors group cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-500 fill-current" aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <h4 className="text-white text-sm font-semibold">WhatsApp Business</h4>
                        <p className="text-zinc-500 text-xs">Respuesta en ~5 min</p>
                      </div>
                    </Link>

                    <button
                      onClick={() => setActiveTab("chat")}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                        <MessageCircle className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-white text-sm font-semibold">Mensaje de Soporte</h4>
                        <p className="text-zinc-500 text-xs">Abre un ticket técnico</p>
                      </div>
                    </button>
                  </motion.div>
                )}

                {activeTab === "chat" && (
                  <motion.div 
                    key="chat"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full flex flex-col"
                  >
                    <button 
                      onClick={() => setActiveTab("menu")}
                      className="text-xs text-indigo-400 hover:text-indigo-300 mb-4 flex items-center gap-1"
                    >
                      ← Volver a opciones
                    </button>
                    
                    {ticketState === "idle" && (
                      <form onSubmit={handleSendTicket} className="flex-1 flex flex-col">
                        <label className="text-xs font-medium text-zinc-400 mb-2">
                           Describe tu problema o consulta:
                        </label>
                        <textarea 
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none min-h-[100px]"
                          placeholder="Ej: Necesito ayuda configurando mi calendario..."
                        ></textarea>
                        
                        <motion.button 
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           type="submit"
                           className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                           Enviar Ticket <Send className="w-4 h-4" />
                        </motion.button>
                      </form>
                    )}

                    {ticketState === "sending" && (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex-1 flex flex-col items-center justify-center h-full py-8 text-center text-zinc-400"
                      >
                         <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                         <p className="text-sm">Abriendo ticket técnico...</p>
                      </motion.div>
                    )}

                    {ticketState === "sent" && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex-1 flex flex-col items-center justify-center h-full py-8 text-center text-zinc-400"
                      >
                         <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                         <p className="text-white font-medium">¡Ticket Enviado!</p>
                         <p className="text-sm mt-1">Nuestro equipo te contactará vía correo pronto.</p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
