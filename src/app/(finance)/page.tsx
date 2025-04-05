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
import { Overview } from "@/components/overview";
import { RecentTransactions } from "@/components/recent-transactions";
import { IncomeList } from "@/components/income-list";
import { IncomeFormModal } from "@/components/income-form-modal";

export const metadata: Metadata = {
  title: "Panel de Finanzas",
  description: "Aplicación de gestión de finanzas personales",
};

export default function DashboardPage() {
  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Balance Total
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$5,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% desde el mes pasado
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Ingresos
                  </CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,500.00</div>
                  <p className="text-xs text-muted-foreground">
                    +2.5% desde el mes pasado
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Gastos</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,893.12</div>
                  <p className="text-xs text-muted-foreground">
                    -4.1% desde el mes pasado
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Deuda</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,234.00</div>
                  <p className="text-xs text-muted-foreground">
                    -2.3% desde el mes pasado
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Transacciones Recientes</CardTitle>
                  <CardDescription>
                    Has realizado 12 transacciones este mes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentTransactions />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="expenses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Gastos</CardTitle>
                <CardDescription>
                  Rastrea y categoriza tus gastos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Navega a la sección de Gastos para ver y gestionar tus gastos.
                </p>
                <div className="mt-4 flex justify-end">
                  <Button asChild>
                    <Link href="/expenses">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Gestionar Gastos
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="debts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Deudas</CardTitle>
                <CardDescription>
                  Rastrea préstamos, tarjetas de crédito y calendarios de pago.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Navega a la sección de Deudas para ver y gestionar tus deudas.
                </p>
                <div className="mt-4 flex justify-end">
                  <Button asChild>
                    <Link href="/debts">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Gestionar Deudas
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="budgets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Presupuestos</CardTitle>
                <CardDescription>
                  Crea y rastrea presupuestos por categoría.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Navega a la sección de Presupuestos para ver y gestionar tus
                  presupuestos.
                </p>
                <div className="mt-4 flex justify-end">
                  <Button asChild>
                    <Link href="/budgets">
                      <PiggyBank className="mr-2 h-4 w-4" />
                      Gestionar Presupuestos
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
