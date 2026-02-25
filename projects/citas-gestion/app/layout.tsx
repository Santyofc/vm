import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DisableContextMenu } from "@/components/DisableContextMenu";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZONA SUR TECH | Gestión Inteligente de Citas",
  description: "El ecosistema definitivo para gestionar, automatizar y multiplicar los ingresos de tu negocio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SmoothScrollProvider>
          <DisableContextMenu />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
