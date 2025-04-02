import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CreditCard,
  DollarSign,
  PiggyBank,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IncomeList } from "@/components/income-list";
import { IncomeFormModal } from "@/components/income-form-modal";

export const metadata: Metadata = {
  title: "Ingresos - Panel de Finanzas",
  description: "Gestión de ingresos en tu aplicación de finanzas personales",
};

export default function IncomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
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
        <Tabs defaultValue="income" className="space-y-4">
          <TabsList>
            <Link href="/">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
            </Link>
            <TabsTrigger value="income">Ingresos</TabsTrigger>
            <Link href="/expenses">
              <TabsTrigger value="expenses">Gastos</TabsTrigger>
            </Link>
            <Link href="/debts">
              <TabsTrigger value="debts">Deudas</TabsTrigger>
            </Link>
            <Link href="/budgets">
              <TabsTrigger value="budgets">Presupuestos</TabsTrigger>
            </Link>
          </TabsList>
          
          <TabsContent value="income" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Todas las Fuentes de Ingresos</CardTitle>
                  <CardDescription>Ver y gestionar todas tus fuentes de ingresos.</CardDescription>
                </div>
                <IncomeFormModal />
              </CardHeader>
              <CardContent>
                <IncomeList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

