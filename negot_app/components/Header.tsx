"use client";

import { cn } from "@/api/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserButton } from "./shared/user-button";

const navItems: { name: string; href: string }[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Pricing", href: "/#pricing-card" },
  { name: "Privacy Policy", href: "/privacy" },
  {name: "About Us", href: "/about"},
];

export function Header() {
  const pathname = usePathname();

  return (
 <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur px-4">
  <div className="container mx-auto flex h-16 items-center justify-between">
    
    {/* Centered Content */}
    <div className="flex items-center justify-center mx-auto">
      <Link href={"/"} className="flex items-center space-x-2 font-bold mr-6">
        NEGOT.ai
      </Link>
      <nav className="flex items-center space-x-7 text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === item.href
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>

    {/* UserButton - stays on the right */}
    <UserButton />
  </div>
</header>

  );
}