import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/db";
import {
  buildRateLimitHeaders,
  checkRateLimit,
  getClientIp,
} from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`auth:reset-password:${ip}`, {
      limit: 10,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Demasiados intentos. Intenta de nuevo mas tarde." },
        {
          status: 429,
          headers: buildRateLimitHeaders(rateLimit.retryAfterSeconds),
        },
      );
    }

    const { token, password } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Token de recuperacion invalido." },
        { status: 400 },
      );
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "La contrasena debe tener al menos 8 caracteres." },
        { status: 400 },
      );
    }

    const prefixedToken = `reset:${token}`;

    const user = await prisma.user.findUnique({
      where: { verification_token: prefixedToken },
      select: {
        id: true,
        token_expires_at: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token de recuperacion invalido o ya utilizado." },
        { status: 400 },
      );
    }

    if (!user.token_expires_at || new Date() > user.token_expires_at) {
      return NextResponse.json(
        { error: "El token de recuperacion ha expirado." },
        { status: 400 },
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        verification_token: null,
        token_expires_at: null,
      },
    });

    return NextResponse.json(
      { message: "Contrasena actualizada exitosamente." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Error interno. Intenta nuevamente." },
      { status: 500 },
    );
  }
}
