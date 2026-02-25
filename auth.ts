import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // Esto permite que la sesión sea válida en admin.zonasurtech.online, cita.zonasurtech.online, etc.
        domain: process.env.NODE_ENV === "production" ? ".zonasurtech.online" : undefined,
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const userEmail = "delgadoleiva60@gmail.com";
        const masterPass = "ZONA_SUR_2026";
        
        if (credentials?.email === userEmail && credentials?.password === masterPass) {
          return await prisma.user.findUnique({ where: { email: userEmail } });
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "SUPERADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || "SUPERADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
