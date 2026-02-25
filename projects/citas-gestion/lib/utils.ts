"use client";

export function formatTime(date: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(date));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
}
