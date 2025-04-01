import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DebtList } from "@/components/debt-list"
import { DebtPaymentStrategies } from "@/components/debt-payment-strategies"

export const metadata: Metadata = {
  title: "Gestión de Deudas",
  description: "Gestiona tus deudas y préstamos",
}

export default function DebtPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Atrás</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Deudas</h1>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/debts/new">
                <Plus className="mr-2 h-4 w-4" />
                Añadir Deuda
              </Link>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todas las Deudas</TabsTrigger>
            <TabsTrigger value="loans">Préstamos</TabsTrigger>
            <TabsTrigger value="credit-cards">Tarjetas de Crédito</TabsTrigger>
            <TabsTrigger value="strategies">Estrategias de Pago</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Todas las Deudas</CardTitle>
                <CardDescription>Ver y gestionar todas tus deudas y préstamos.</CardDescription>
              </CardHeader>
              <CardContent>
                <DebtList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="loans" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Préstamos</CardTitle>
                <CardDescription>Ver y gestionar tus préstamos.</CardDescription>
              </CardHeader>
              <CardContent>
                <DebtList type="loan" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="credit-cards" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tarjetas de Crédito</CardTitle>
                <CardDescription>Ver y gestionar tus tarjetas de crédito.</CardDescription>
              </CardHeader>
              <CardContent>
                <DebtList type="credit-card" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="strategies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Estrategias de Pago</CardTitle>
                <CardDescription>Explora diferentes estrategias de pago de deudas.</CardDescription>
              </CardHeader>
              <CardContent>
                <DebtPaymentStrategies />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

