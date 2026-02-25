"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { GlowingBox } from "@/components/landing/GlowingBox";

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verificando tu cuenta...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token de verificacion ausente en el enlace.");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = (await res.json()) as { message?: string };

        if (!res.ok) {
          throw new Error(data.message || "Error al verificar la cuenta.");
        }

        setStatus("success");
        setMessage("Tu cuenta ha sido verificada con exito.");
      } catch (caughtError) {
        const text =
          caughtError instanceof Error
            ? caughtError.message
            : "La verificacion fallo.";
        setStatus("error");
        setMessage(text);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="flex items-center justify-center p-6 relative">
      <GlowingBox>
        <div className="text-center">
          {status === "loading" && (
            <div className="flex flex-col items-center">
              <Loader2 className="w-12 h-12 text-[#45f3ff] animate-spin mb-6" />
              <h1 className="text-xl font-medium text-white">{message}</h1>
              <p className="text-zinc-500 text-sm mt-2">Sincronizando...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold mb-2 text-white">Cuenta activada</h1>
              <p className="text-zinc-400 text-sm mb-8">{message}</p>
              <Link
                href="/login"
                className="w-full inline-flex flex-row items-center justify-center gap-2 bg-[#45f3ff] text-black font-bold rounded-lg px-4 py-3 hover:shadow-[0_0_20px_#45f3ff] transition-all"
              >
                Iniciar sesion <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold mb-2 text-white">Error de verificacion</h1>
              <p className="text-zinc-400 text-sm mb-8">{message}</p>
              <Link
                href="/login"
                className="w-full inline-flex flex-row items-center justify-center gap-2 border border-zinc-800 bg-transparent text-white font-medium rounded-lg px-4 py-3 hover:bg-zinc-900 transition-colors"
              >
                Volver al portal
              </Link>
            </div>
          )}
        </div>
      </GlowingBox>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#45f3ff]" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
