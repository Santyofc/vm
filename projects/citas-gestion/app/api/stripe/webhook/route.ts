import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { SubscriptionStatus } from "@prisma/client";
import { isBillingEnabledServer } from "@/lib/billing";
import { getStripeClient } from "@/lib/stripe";
import { prisma } from "@/lib/db";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const EVENT_TTL_MS = 24 * 60 * 60 * 1000;

const globalForStripeEvents = globalThis as typeof globalThis & {
  __stripeWebhookEvents?: Map<string, number>;
};

const processedEvents =
  globalForStripeEvents.__stripeWebhookEvents ?? new Map<string, number>();

if (!globalForStripeEvents.__stripeWebhookEvents) {
  globalForStripeEvents.__stripeWebhookEvents = processedEvents;
}

function isDuplicateEvent(eventId: string) {
  const now = Date.now();
  const processedAt = processedEvents.get(eventId);

  if (processedAt && now - processedAt < EVENT_TTL_MS) {
    return true;
  }

  processedEvents.set(eventId, now);

  // Opportunistic cleanup to avoid unbounded memory growth.
  for (const [id, timestamp] of processedEvents) {
    if (now - timestamp >= EVENT_TTL_MS) {
      processedEvents.delete(id);
    }
  }

  return false;
}

function mapStripeStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  switch (status) {
    case "active":
      return "ACTIVE";
    case "trialing":
      return "TRIALING";
    case "past_due":
    case "incomplete":
      return "PAST_DUE";
    case "unpaid":
      return "UNPAID";
    case "canceled":
    case "incomplete_expired":
    case "paused":
      return "CANCELED";
    default:
      return "PAST_DUE";
  }
}

async function syncSubscriptionByStripeId(
  stripe: Stripe,
  subscriptionId: string,
) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const mappedStatus = mapStripeStatus(subscription.status);
  const planId = subscription.items.data[0]?.price.id ?? null;
  const currentPeriodStart = subscription.items.data[0]?.current_period_start
    ? new Date(subscription.items.data[0].current_period_start * 1000)
    : null;
  const currentPeriodEnd = subscription.items.data[0]?.current_period_end
    ? new Date(subscription.items.data[0].current_period_end * 1000)
    : null;

  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: mappedStatus,
      planId,
      currentPeriodStart,
      currentPeriodEnd,
      stripeCustomerId: String(subscription.customer),
    },
  });
}

export async function POST(req: Request) {
  if (!isBillingEnabledServer()) {
    return NextResponse.json({ received: true, billingDisabled: true });
  }

  const stripe = getStripeClient();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe API key not configured" },
      { status: 503 },
    );
  }

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook secret not configured" },
      { status: 500 },
    );
  }

  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (caughtError) {
    const message =
      caughtError instanceof Error ? caughtError.message : "Unknown webhook error";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (isDuplicateEvent(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        const subscriptionId =
          typeof checkoutSession.subscription === "string"
            ? checkoutSession.subscription
            : null;
        const tenantId = checkoutSession.metadata?.tenantId;

        if (!tenantId || !subscriptionId) {
          return NextResponse.json(
            { error: "Missing tenant or subscription data" },
            { status: 400 },
          );
        }

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const mappedStatus = mapStripeStatus(subscription.status);
        const planId = subscription.items.data[0]?.price.id ?? null;
        const currentPeriodStart = subscription.items.data[0]?.current_period_start
          ? new Date(subscription.items.data[0].current_period_start * 1000)
          : null;
        const currentPeriodEnd = subscription.items.data[0]?.current_period_end
          ? new Date(subscription.items.data[0].current_period_end * 1000)
          : null;

        await prisma.subscription.upsert({
          where: { tenantId },
          update: {
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: String(subscription.customer),
            status: mappedStatus,
            planId,
            currentPeriodStart,
            currentPeriodEnd,
          },
          create: {
            tenantId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: String(subscription.customer),
            status: mappedStatus,
            planId,
            currentPeriodStart,
            currentPeriodEnd,
          },
        });

        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice & {
          subscription?: string | Stripe.Subscription | null;
        };
        if (typeof invoice.subscription === "string") {
          await syncSubscriptionByStripeId(stripe, invoice.subscription);
        }
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await syncSubscriptionByStripeId(stripe, subscription.id);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: "CANCELED",
          },
        });
        break;
      }
      default:
        break;
    }
  } catch (caughtError) {
    console.error("Stripe webhook processing error:", caughtError);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
