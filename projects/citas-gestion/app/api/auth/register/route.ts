import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcryptjs from "bcryptjs";
import { Prisma, SubscriptionStatus } from "@prisma/client";
import { slugify } from "@/lib/slug";
import {
  buildRateLimitHeaders,
  checkRateLimit,
  getClientIp,
} from "@/lib/rate-limit";

const freePlanId = process.env.FREE_PLAN_ID || "FREE";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`auth:register:${ip}`, {
      limit: 8,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        { message: "Demasiados intentos. Intenta de nuevo mas tarde." },
        {
          status: 429,
          headers: buildRateLimitHeaders(rateLimit.retryAfterSeconds),
        },
      );
    }

    const { name, email, password, businessName } = await req.json();

    if (!name || !email || !password || !businessName) {
      return NextResponse.json(
        {
          message:
            "Todos los campos, incluido el nombre del negocio, son requeridos.",
        },
        { status: 400 },
      );
    }

    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { message: "La contrasena debe tener al menos 8 caracteres." },
        { status: 400 },
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedName = String(name).trim();
    const normalizedBusinessName = String(businessName).trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "El correo electronico ya esta registrado." },
        { status: 400 },
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const now = new Date();

    // Atomic transaction: create tenant and admin user together.
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const baseSlug = slugify(normalizedBusinessName) || "negocio";
      let slugCandidate = baseSlug;
      let suffix = 1;

      while (
        await tx.tenant.findUnique({
          where: { slug: slugCandidate },
          select: { id: true },
        })
      ) {
        suffix += 1;
        slugCandidate = `${baseSlug}-${suffix}`;
      }

      const tenant = await tx.tenant.create({
        data: {
          name: normalizedBusinessName,
          slug: slugCandidate,
        },
      });

      await tx.subscription.create({
        data: {
          tenantId: tenant.id,
          status: SubscriptionStatus.ACTIVE,
          planId: freePlanId,
        },
      });

      const user = await tx.user.create({
        data: {
          name: normalizedName,
          email: normalizedEmail,
          password: hashedPassword,
          role: "TENANT_ADMIN",
          tenantId: tenant.id,
          is_verified: true,
          emailVerified: now,
          verification_token: null,
          token_expires_at: null,
        },
      });

      return { user, tenant };
    });

    return NextResponse.json(
      {
        message: "Usuario y negocio creados exitosamente.",
        email: result.user.email,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error Registration Flow:", error);
    return NextResponse.json(
      { message: "Error al procesar el registro. Intenta nuevamente." },
      { status: 500 },
    );
  }
}
