import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripeClient() {
  if (!process.env.STRIPE_API_KEY) {
    return null;
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_API_KEY, {
      // Use the account default stable API version from Stripe Dashboard.
      typescript: true,
    });
  }

  return stripeClient;
}

function getTenantAppUrl() {
  return (
    process.env.TENANT_APP_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://cita.localhost:3000"
      : "https://cita.zonasurtech.online")
  );
}

function toTenantUrl(pathname: string) {
  return new URL(pathname, getTenantAppUrl()).toString();
}

export const getStripeSession = async (
  priceId: string,
  tenantId: string,
  customerEmail: string,
) => {
  const stripe = getStripeClient();
  if (!stripe) {
    throw new Error("Stripe is not configured");
  }

  return stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${toTenantUrl("/configuracion")}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: toTenantUrl("/configuracion"),
    metadata: {
      tenantId,
    },
    customer_email: customerEmail,
  });
};
