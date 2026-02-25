import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { isBillingEnabledServer } from "@/lib/billing";
import { getStripeClient } from "@/lib/stripe";

function getTenantAppUrl() {
  return (
    process.env.TENANT_APP_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://cita.localhost:3000"
      : "https://cita.zonasurtech.online")
  );
}

export async function POST() {
  try {
    if (!isBillingEnabledServer()) {
      return NextResponse.json(
        { error: "Facturacion desactivada en este entorno." },
        { status: 503 },
      );
    }

    const stripe = getStripeClient();
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe no configurado en este entorno." },
        { status: 503 },
      );
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        tenant: {
          include: {
            subscription: true,
          },
        },
      },
    });

    if (!user?.tenant?.subscription?.stripeCustomerId) {
      return NextResponse.json(
        { error: "No tienes una suscripcion activa" },
        { status: 400 },
      );
    }

    const returnUrl = new URL("/configuracion", getTenantAppUrl()).toString();

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.tenant.subscription.stripeCustomerId,
      return_url: returnUrl,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Stripe Portal Error:", error);
    return NextResponse.json(
      { error: "Error al crear portal de cliente" },
      { status: 500 },
    );
  }
}
