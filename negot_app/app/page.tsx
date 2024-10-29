"use client";

import { HeroSection } from "@/components/hero-section";
import { PricingSection } from "@/components/pricing-section";
import { Button } from "@/components/ui/button";
import { api } from "@/pages/api/api";
import stripePromise from "@/pages/api/stripe";

export default function Home() {
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