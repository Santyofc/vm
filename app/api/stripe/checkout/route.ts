import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getStripeSession } from "@/lib/stripe";
import { isBillingEnabledServer } from "@/lib/billing";

function getAllowedPriceIds() {
  const envPriceIds = (process.env.STRIPE_ALLOWED_PRICE_IDS || "")
    .split(",")
    .map((price) => price.trim())
    .filter(Boolean);

  return new Set(envPriceIds);
}

export async function POST(req: Request) {
  try {
    if (!isBillingEnabledServer()) {
      return NextResponse.json(
        { error: "Facturacion desactivada en este entorno." },
        { status: 503 },
      );
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const payload = (await req.json()) as { priceId?: unknown };
    const priceId =
      typeof payload.priceId === "string" ? payload.priceId.trim() : "";

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID es requerido" },
        { status: 400 },
      );
    }

    const allowedPriceIds = getAllowedPriceIds();
    if (allowedPriceIds.size === 0) {
      console.error("STRIPE_ALLOWED_PRICE_IDS is empty or not configured");
      return NextResponse.json(
        { error: "Configuracion de precios no disponible" },
        { status: 500 },
      );
    }

    if (!allowedPriceIds.has(priceId)) {
      return NextResponse.json(
        { error: "Price ID invalido para este entorno" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        email: true,
        tenantId: true,
      },
    });

    if (!user?.tenantId) {
      return NextResponse.json(
        { error: "No hay negocio asociado" },
        { status: 400 },
      );
    }

    const stripeSession = await getStripeSession(priceId, user.tenantId, user.email);

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: "Error al crear sesion de pago" },
      { status: 500 },
    );
  }
}
