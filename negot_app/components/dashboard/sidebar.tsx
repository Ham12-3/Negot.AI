'use client';

import { cn } from "@/app/api/utils"; // Utility function for class names
import { FileText, Home, LayoutDashboard, Settings } from "lucide-react"; // Icons
import Link from "next/link"; // Link component from Next.js
import { usePathname } from "next/navigation"; // Hook to get the current pathname
import React, { ElementType } from "react";

// Sidebar component
export const Sidebar = () => {
  return (
    <aside className="bg-white text-black border-r border-gray-100 w-[280px] min-h-screen hidden lg:block">
      {SidebarContent()}
    </aside>
  );
};

// Sidebar content component
const SidebarContent = () => {
  const pathname = usePathname(); // Get current pathname

  const sidebarItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "Results", href: "/dashboard/results" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="bg-white text-black h-full">
      <nav className="flex-grow p-6">
        <ul role="list" className="flex flex-col flex-grow">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {sidebarItems.map((item) => (
                <Navlink key={item.label} path={pathname || ''} link={item} /> // Fallback to empty string if pathname is null
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

// Navlink component
const Navlink = ({ path, link }: {
  path: string; // Expecting a string
  link: {
    icon: ElementType;
    label: string;
    href: string;
    target?: string;
  };
}) => {
  return (
    <li key={link.label}>
      <Link 
        href={link.href} 
        target={link.target} 
        className={cn(
          "group flex h-9 items-center gap-x-3 rounded-md px-3 text-sm font-semibold text-black",
          path === link.href ? "bg-gray-200" : "hover:bg-gray-200"
        )}
      >
        <link.icon className="size-4 shrink-0" /> {/* Corrected className */}
        {link.label}
      </Link>
    </li>
  );
};

// Dashboard layout component
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  );
}
