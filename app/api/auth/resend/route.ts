import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import {
  buildRateLimitHeaders,
  checkRateLimit,
  getClientIp,
} from "@/lib/rate-limit";

const GENERIC_SUCCESS_MESSAGE =
  "Si el correo esta registrado y pendiente de verificacion, se enviara el enlace.";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`auth:resend:${ip}`, {
      limit: 5,
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

    const payload = (await req.json()) as { email?: unknown };

    if (typeof payload.email !== "string" || !payload.email.trim()) {
      return NextResponse.json(
        { error: "El correo electronico es obligatorio." },
        { status: 400 },
      );
    }

    const normalizedEmail = payload.email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: {
        id: true,
        email: true,
        is_verified: true,
      },
    });

    if (!user || user.is_verified) {
      return NextResponse.json({ message: GENERIC_SUCCESS_MESSAGE }, { status: 200 });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verification_token: verificationToken,
        token_expires_at: tokenExpiresAt,
      },
    });

    try {
      await sendVerificationEmail(user.email, verificationToken);
    } catch (mailError) {
      console.error("Error resending verification email:", mailError);
    }

    return NextResponse.json({ message: GENERIC_SUCCESS_MESSAGE }, { status: 200 });
  } catch (error) {
    console.error("Error resending verification:", error);
    return NextResponse.json(
      { error: "No se pudo reenviar el correo. Intenta de nuevo mas tarde." },
      { status: 500 },
    );
  }
}
