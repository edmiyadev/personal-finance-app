"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { DollarSign } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Navigation configuration for better maintainability
type NavItem = {
  path: string;
  value: string;
  label: string;
};

const navigation: NavItem[] = [
  { path: "/", value: "overview", label: "Resumen" },
  { path: "/income", value: "income", label: "Ingresos" },
  { path: "/expenses", value: "expenses", label: "Gastos" },
  { path: "/debts", value: "accounts", label: "Deudas" },
  { path: "/budgets", value: "budgets", label: "Presupuestos" },
];

// Custom TabLink component to properly combine Link and TabsTrigger
const TabLink = ({ 
  href, 
  value, 
  isActive, 
  children 
}: { 
  href: string; 
  value: string;
  isActive: boolean; 
  children: ReactNode;
}) => {
  return (
    <Link href={href} passHref>
      <TabsTrigger 
        className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-105" 
        value={value}
        data-state={isActive ? "active" : "inactive"}
        aria-selected={isActive}
      >
        {children}
      </TabsTrigger>
    </Link>
  );
};

export function Header() {
  const pathname = usePathname();

  // Improved active tab determination with exact path matching
  const getActiveTab = (): string => {
    const currentNavItem = navigation.find(item => 
      item.path === "/" ? pathname === "/" : pathname.startsWith(item.path)
    );
    
    return currentNavItem?.value || "overview";
  };

  const activeTab = getActiveTab();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Finanzas</h1>
      </div>
      <Tabs value={activeTab} className="space-y-4">
        <TabsList aria-label="Navegación principal">
          {navigation.map((item) => (
            <TabLink 
              key={item.value}
              href={item.path}
              value={item.value}
              isActive={activeTab === item.value}
            >
              {item.label}
            </TabLink>
          ))}
        </TabsList>
      </Tabs>
      <div className="flex items-center gap-2">
        <Button asChild className="transition-all duration-300 hover:shadow-md">
          <Link href="/transactions/new">
            <DollarSign className="mr-2 h-4 w-4" />
            Nueva Transacción
          </Link>
        </Button>
      </div>
    </div>
  );
}
