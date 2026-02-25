const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);

function isEnabled(value: string | undefined) {
  return Boolean(value && TRUE_VALUES.has(value.trim().toLowerCase()));
}

export function isBillingEnabledServer() {
  return (
    isEnabled(process.env.BILLING_ENABLED) ||
    isEnabled(process.env.NEXT_PUBLIC_BILLING_ENABLED)
  );
}
