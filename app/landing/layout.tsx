"use client";

import { DisableContextMenu } from "@/components/DisableContextMenu";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 relative overflow-hidden">
      {/* Background Nebula */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/cinematic_nebula_bg.png"
          alt="Technical Background"
          className="w-full h-full object-cover opacity-20 mix-blend-screen"
        />
      </div>

      {/* Security protection */}
      <DisableContextMenu />

      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
