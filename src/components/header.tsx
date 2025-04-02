"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  // Determine active tab based on current path
  const getActiveTab = () => {
    if (pathname.includes("/dashboard")) return "overview";
    if (pathname.includes("/income")) return "income";
    if (pathname.includes("/expenses")) return "expenses";
    if (pathname.includes("/debts")) return "accounts";
    if (pathname.includes("/budgets")) return "budgets";
    return "overview";
  };
  
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Panel Principal</h1>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/transactions/new">
              <DollarSign className="mr-2 h-4 w-4" />
              Nueva Transacción
            </Link>
          </Button>
        </div>
      </div>
      <Tabs value={getActiveTab()} className="space-y-4">
        <TabsList>
          <Link href="/dashboard">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
          </Link>
          <Link href="/income">
            <TabsTrigger value="income">Ingresos</TabsTrigger>
          </Link>
          <Link href="/expenses">
            <TabsTrigger value="expenses">Gastos</TabsTrigger>
          </Link>
          <Link href="/debts">
            <TabsTrigger value="accounts">Deudas</TabsTrigger>
          </Link>
          <Link href="/budgets">
            <TabsTrigger value="budgets">Presupuestos</TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
    </div>
  );
}
