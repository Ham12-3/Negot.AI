"use client";

import { HeroSection } from "@/components/hero-section";
import { PricingSection } from "@/components/pricing-section";
import { Button } from "@/components/ui/button";
import { api } from "@/app/api/api";
import stripePromise from "@/app/api/stripe";

export default function Page() {
  const handleUpgrade = async () => {
    try {
      const response = await api.get("/payments/create-checkout-session");
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: response.data.sessionId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <HeroSection />
      <PricingSection />
    </>
  );
}
