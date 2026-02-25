import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  buildRateLimitHeaders,
  checkRateLimit,
  getClientIp,
} from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`auth:verify:${ip}`, {
      limit: 20,
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

    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { message: "Token no proporcionado." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { verification_token: token },
      select: {
        id: true,
        is_verified: true,
        token_expires_at: true,
      },
    });

    if (!user || user.is_verified) {
      return NextResponse.json(
        { message: "Token invalido o ya utilizado." },
        { status: 400 },
      );
    }

    if (user.token_expires_at && new Date() > user.token_expires_at) {
      return NextResponse.json(
        { message: "El token de verificacion ha expirado." },
        { status: 400 },
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        is_verified: true,
        emailVerified: new Date(),
        verification_token: null,
        token_expires_at: null,
      },
    });

    return NextResponse.json(
      { message: "Cuenta verificada exitosamente." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 },
    );
  }
}
