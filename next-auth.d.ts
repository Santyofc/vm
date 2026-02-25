import { type DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role: Role | string;
      tenantId?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role | string;
    tenantId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role | string;
    tenantId?: string | null;
  }
}
