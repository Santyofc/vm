"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, Sparkles } from "lucide-react";
import { GlowingBox } from "@/components/landing/GlowingBox";

function getDefaultTargetByRole(role: string | undefined) {
  const isLocalhost = window.location.hostname === "localhost";

  if (role === "SUPERADMIN") {
    return isLocalhost
      ? "http://admin.localhost:3000"
      : "https://admin.zonasurtech.online";
  }

  return isLocalhost
    ? "http://cita.localhost:3000"
    : "https://cita.zonasurtech.online";
}

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleResend = async () => {
    if (!email.trim()) {
      setError("Ingresa tu correo electronico en el campo superior.");
      return;
    }

    setResendStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      if (res.ok) {
        setResendStatus("success");
        return;
      }

      const data = (await res.json()) as { error?: string; message?: string };
      setResendStatus("error");
      setError(data.error ?? data.message ?? "No se pudo reenviar el correo.");
    } catch {
      setResendStatus("error");
      setError("Error de red al intentar reenviar.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setResendStatus("idle");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.trim().toLowerCase(),
        password,
        callbackUrl,
      });

      if (res?.error) {
        if (
          res.error === "CredentialsSignin" ||
          res.error === "InvalidCredentials"
        ) {
          setError("Credenciales invalidas. Revisa tu correo y contrasena.");
        } else if (res.error === "UnverifiedAccount") {
          setError("UNVERIFIED_ACCOUNT");
        } else {
          setError(res.error);
        }
        return;
      }

      if (res?.url) {
        window.location.href = res.url;
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      const sessionRes = await fetch("/api/auth/session");
      const sessionData = (await sessionRes.json()) as {
        user?: { role?: string };
      };
      const fallbackTarget = getDefaultTargetByRole(sessionData?.user?.role);

      window.location.href = fallbackTarget;
    } catch (caughtError) {
      console.error("Login error:", caughtError);
      setError("Ha ocurrido un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent z-10"></div>

      <GlowingBox>
        <div className="flex justify-center mb-8">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            <Sparkles className="w-6 h-6 text-black" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
            Bienvenido de vuelta
          </h1>
          <p className="text-zinc-400 text-sm">
            Accede a tu cuenta de Zona Sur Tech
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <button
            type="button"
            disabled={true}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-medium text-white opacity-50 cursor-not-allowed"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-black text-xs font-bold">
              G
            </span>
            <span>Continuar con Google</span>
            <span className="text-xs">Próximamente</span>
          </button>

          <button
            type="button"
            onClick={() => signIn("github", { callbackUrl })}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-sm font-medium text-white transition-colors duration-200"
          >
            Continuar con GitHub
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-black px-2 text-zinc-500 uppercase tracking-wider">
              o con email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-500 border border-red-500/20 rounded-md bg-red-500/10 text-center">
              {error === "UNVERIFIED_ACCOUNT" ? (
                <div className="flex flex-col gap-2 relative">
                  <span>
                    Debes verificar tu correo principal antes de iniciar sesion.
                  </span>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendStatus === "loading"}
                    className="mt-2 w-full bg-white text-black font-medium py-1.5 rounded text-xs transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {resendStatus === "loading"
                      ? "Enviando..."
                      : "Reenviar enlace de verificacion"}
                  </button>
                </div>
              ) : (
                <span>{error}</span>
              )}
            </div>
          )}

          {resendStatus === "success" && (
            <div className="p-3 text-sm text-emerald-500 border border-emerald-500/20 rounded-md bg-emerald-500/10 text-center">
              Enlace enviado correctamente.
            </div>
          )}

          <div>
            <label className="sr-only" htmlFor="email">
              Correo Electronico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all text-sm"
              placeholder="hola@tunegocio.com"
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="password">
              Contrasena
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all text-sm"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#45f3ff] text-black font-bold rounded-lg px-4 py-3 hover:shadow-[0_0_20px_#45f3ff] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Validando..." : "Ingresar al Panel"}
          </button>
        </form>

        <div className="flex flex-col gap-4 mt-8 pb-4">
          <Link
            href="/recuperar"
            className="text-xs text-zinc-500 hover:text-white transition-colors text-center"
          >
            Olvidaste tu contrasena?
          </Link>

          <p className="text-center text-sm text-[#45f3ff]">
            No tienes cuenta?{" "}
            <Link
              href="/registro"
              className="text-[#ff2770] font-bold hover:underline underline-offset-4 transition-colors text-base"
            >
              Crea una aqui
            </Link>
          </p>
        </div>
      </GlowingBox>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">
          Cargando...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
