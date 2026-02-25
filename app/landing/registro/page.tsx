"use client";

import { useState } from "react";
import Link from "next/link";
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

export default function RegisterPage() {
  const [businessName, setBusinessName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const registerRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: email.trim().toLowerCase(),
          password,
          businessName,
        }),
      });

      const data = (await registerRes.json()) as { message?: string };

      if (!registerRes.ok) {
        throw new Error(data.message || "Error al registrarse.");
      }

      const loginRes = await signIn("credentials", {
        redirect: false,
        email: email.trim().toLowerCase(),
        password,
        callbackUrl: "/",
      });

      if (loginRes?.error) {
        throw new Error("Cuenta creada, pero no se pudo iniciar sesion automaticamente.");
      }

      if (loginRes?.url) {
        window.location.href = loginRes.url;
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      const sessionRes = await fetch("/api/auth/session");
      const sessionData = (await sessionRes.json()) as {
        user?: { role?: string };
      };

      window.location.href = getDefaultTargetByRole(sessionData?.user?.role);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Ha ocurrido un error inesperado.";
      setError(message);
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
            Crea tu cuenta
          </h1>
          <p className="text-zinc-400 text-sm">
            Unete a Zona Sur Tech y digitaliza tu negocio.
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
            onClick={() => signIn("github", { callbackUrl: "/" })}
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
              {error}
            </div>
          )}

          <div>
            <label className="sr-only" htmlFor="businessName">
              Nombre de tu Negocio / Empresa
            </label>
            <input
              id="businessName"
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full bg-transparent border border-[#45f3ff]/30 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#45f3ff] focus:border-[#45f3ff] transition-all text-sm mb-4"
              placeholder="Nombre de tu Negocio (Ej: Barber Shop 99)"
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="name">
              Tu Nombre Completo
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all text-sm"
              placeholder="Tu Nombre y Apellido"
            />
          </div>

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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all text-sm"
              placeholder="Contrasena (Min. 8 caracteres)"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#45f3ff] text-black font-bold rounded-lg px-4 py-3 hover:shadow-[0_0_20px_#45f3ff] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Creando Entorno..." : "Comenzar Gestion Gratis"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Al registrarte, aceptas nuestros{" "}
          <Link
            href="/terminos"
            className="text-zinc-400 hover:text-white underline underline-offset-4"
          >
            Terminos
          </Link>{" "}
          y{" "}
          <Link
            href="/privacidad"
            className="text-zinc-400 hover:text-white underline underline-offset-4"
          >
            Privacidad
          </Link>
          .
        </p>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
        </div>

        <p className="text-center text-sm text-[#45f3ff]">
          Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="text-[#ff2770] font-bold hover:underline underline-offset-4 transition-colors text-base"
          >
            Inicia Sesion
          </Link>
        </p>
      </GlowingBox>
    </div>
  );
}
