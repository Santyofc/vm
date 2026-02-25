"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { GlowingBox } from "@/components/landing/GlowingBox";

function RecuperarContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const hasResetToken = Boolean(token);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const cardTitle = useMemo(() => {
    if (isSuccess && hasResetToken) return "Contrasena actualizada";
    if (isSuccess) return "Revisa tu bandeja";
    if (hasResetToken) return "Crear nueva contrasena";
    return "Recuperar acceso";
  }, [hasResetToken, isSuccess]);

  // Handle requests... (keep original logic)
  const handleSendEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) throw new Error(data.error || "Error al solicitar la recuperacion.");
      setIsSuccess(true);
      setSuccessMessage(`Si ${email} esta registrado, recibiras un enlace para restablecer tu contrasena.`);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Error al solicitar la recuperacion.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (!token) throw new Error("Token invalido.");
      if (password.length < 8) throw new Error("La contrasena debe tener al menos 8 caracteres.");
      if (password !== confirmPassword) throw new Error("Las contrasenas no coinciden.");
      const response = await fetch("/api/auth/reset-password", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) throw new Error(data.error || "No se pudo actualizar la contrasena.");
      setIsSuccess(true);
      setSuccessMessage("Tu contrasena fue actualizada correctamente.");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "No se pudo actualizar la contrasena.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent z-10"></div>

      <GlowingBox>
        <div className="flex justify-center mb-8">
          <Link href="/">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
            {cardTitle}
          </h1>
          {!isSuccess && (
            <p className="text-zinc-400 text-sm">
              {hasResetToken
                ? "Define una contrasena nueva para recuperar tu cuenta."
                : "Ingresa tu correo para recibir instrucciones de recuperacion."}
            </p>
          )}
        </div>

        {isSuccess ? (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <p className="text-zinc-400 text-sm mb-8">{successMessage}</p>
            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center bg-[#45f3ff] text-black font-bold rounded-lg px-4 py-3 hover:shadow-[0_0_20px_#45f3ff] transition-all text-base"
            >
              Volver al Login
            </Link>
          </div>
        ) : (
          <form
            onSubmit={hasResetToken ? handleResetPassword : handleSendEmail}
            className="space-y-4"
          >
            {error && (
              <div className="p-3 text-sm text-red-500 border border-red-500/20 rounded-md bg-red-500/10 text-center">
                {error}
              </div>
            )}

            {!hasResetToken && (
              <div>
                <label className="sr-only" htmlFor="email">
                  Correo Electronico
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-transparent border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all text-sm"
                  placeholder="hola@tunegocio.com"
                />
              </div>
            )}

            {hasResetToken && (
              <>
                <div>
                  <label className="sr-only" htmlFor="password">
                    Nueva Contrasena
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full bg-transparent border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all text-sm"
                    placeholder="Nueva contrasena (minimo 8 caracteres)"
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="confirmPassword">
                    Confirmar Contrasena
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full bg-transparent border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all text-sm"
                    placeholder="Repite la nueva contrasena"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black font-medium rounded-lg px-4 py-2 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading
                ? "Procesando..."
                : hasResetToken
                  ? "Actualizar contrasena"
                  : "Enviar enlace de recuperacion"}
            </button>
          </form>
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
        </div>

        <p className="text-center text-sm text-[#45f3ff]">
          <Link
            href="/login"
            className="inline-flex flex-row items-center gap-2 hover:text-white transition-colors font-bold text-base"
          >
            <ArrowLeft className="w-3 h-3" />
            Volver al Login
          </Link>
        </p>
      </GlowingBox>
    </div>
  );
}

export default function RecuperarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#45f3ff]" />
        </div>
      }
    >
      <RecuperarContent />
    </Suspense>
  );
}
