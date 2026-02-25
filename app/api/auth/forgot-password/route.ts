import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/mail";
import {
  buildRateLimitHeaders,
  checkRateLimit,
  getClientIp,
} from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`auth:forgot-password:${ip}`, {
      limit: 5,
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

    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "El correo electronico es obligatorio." },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      // Keep the same response to prevent email enumeration attacks.
      return NextResponse.json(
        {
          message:
            "Si el correo esta registrado, recibiras un enlace para restablecer tu contrasena.",
        },
        { status: 200 },
      );
    }

    const rawResetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        // Reuse the field with a prefix so verification tokens and reset tokens never collide.
        verification_token: `reset:${rawResetToken}`,
        token_expires_at: tokenExpiresAt,
      },
    });

    try {
      await sendPasswordResetEmail(user.email, rawResetToken);
    } catch (mailError) {
      console.error("Error sending password reset email:", mailError);
    }

    return NextResponse.json(
      { message: "Enlace de recuperacion enviado exitosamente." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error forgot password:", error);
    return NextResponse.json(
      { error: "Error interno. Intenta mas tarde." },
      { status: 500 },
    );
  }
}
