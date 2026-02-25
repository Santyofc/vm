"use client";

import { useRouter } from "next/navigation";

interface PricingButtonProps {
  priceId: string;
  planName: string;
  className?: string;
  isPopular?: boolean;
}

export function PricingButton({ priceId, planName, className, isPopular }: PricingButtonProps) {
  const router = useRouter();

  const handleSubscribe = async () => {
    void priceId;
    void isPopular;
    router.push(`/registro?plan=${planName.toLowerCase()}`);
  };

  return (
    <button
      onClick={handleSubscribe}
      className={className}
    >
      Comenzar Gratis
    </button>
  );
}
