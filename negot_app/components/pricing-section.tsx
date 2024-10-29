import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Check, X } from "lucide-react";
import { api } from "@/api/api";
import stripePromise from "@/api/stripe";

export function PricingSection() {
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
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-background to-background/80">
      <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-center">
        Choose the plan that&apos;s right for you
      </h2>
      <p className="text-lg text-muted-foreground mt-4 text-center max-w-3xl mx-auto">
        Select the perfect plan for your needs. Upgrade anytime to unlock
        premium features and support.
      </p>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <PricingCard
          title="Basic"
          description="For comprehensive contract analysis"
          price="Free"
          period="/lifetime"
          features={[
            { name: "Advanced contract analysis", available: true },
            { name: "Unlimited projects", available: true },
            { name: "Chat with your contract", available: true },
            { name: "10+ risks with severity levels", available: true },
            { name: "10+ opportunities with impact levels", available: true },
            { name: "Comprehensive contract summary", available: false },
            { name: "Improvement recommendations", available: false },
            { name: "Key clauses identification", available: false },
            { name: "Legal compliance assessment", available: false },
            { name: "Negotiation points", available: false },
            { name: "Contract duration analysis", available: false },
            { name: "Termination conditions summary", available: false },
            { name: "Compensation structure breakdown", available: false },
            { name: "Performance metrics identification", available: false },
            { name: "Intellectual property clause summary", available: false },
          ]}
          buttonText="Upgrade"
          onButtonClick={handleUpgrade}
        />
        <PricingCard
          title="Premium"
          description="For comprehensive contract analysis"
          price="£10"
          highlight
          period="/lifetime"
          features={[
            { name: "Advanced contract analysis", available: true },
            { name: "Unlimited projects", available: true },
            { name: "Chat with your contract", available: true },
            { name: "10+ risks with severity levels", available: true },
            { name: "10+ opportunities with impact levels", available: true },
            { name: "Comprehensive contract summary", available: true },
            { name: "Improvement recommendations", available: true },
            { name: "Key clauses identification", available: true },
            { name: "Legal compliance assessment", available: true },
            { name: "Negotiation points", available: true },
            { name: "Contract duration analysis", available: true },
            { name: "Termination conditions summary", available: true },
            { name: "Compensation structure breakdown", available: true },
            { name: "Performance metrics identification", available: true },
            { name: "Intellectual property clause summary", available: true },
          ]}
          buttonText="Upgrade"
          onButtonClick={handleUpgrade}
        />
      </div>
    </div>
  );
}

interface Feature {
  name: string;
  available: boolean;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: Feature[];
  buttonText: string;
  highlight?: boolean;
  onButtonClick: () => void;
}

function PricingCard({
  title,
  description,
  price,
  features,
  period,
  buttonText,
  highlight,
  onButtonClick,
}: PricingCardProps) {
  return (
    <Card
      id="pricing-card"
      className={`flex flex-col items-center text-center p-6 ${
        highlight ? "border-primary shadow-lg" : ""
      } relative overflow-hidden transition-all duration-300`}
    >
      <CardHeader className="mb-4">
        <CardTitle className="text-3xl font-bold flex items-center gap-2">
          {title}
        </CardTitle>
        <CardDescription className="text-lg">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center">
        <p className="text-5xl font-extrabold mb-4">
          {price}
          <span className="text-base font-normal text-muted-foreground">
            {period}
          </span>
        </p>
        <ul className="space-y-2 w-full max-w-xs">
          {features.map((feature, index) => (
            <li className="flex items-center gap-2" key={index}>
              {feature.available ? (
                <Check className="text-green-500" />
              ) : (
                <X className="text-red-500" />
              )}
              <span className="text-md text-muted-foreground">
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-6 w-full px-2">
        {" "}
        {/* Added padding for a snug fit */}
        <Button
          className="w-full text-lg py-4" // Larger button with extra padding
          variant={highlight ? "default" : "outline"}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
