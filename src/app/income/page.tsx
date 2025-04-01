import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IncomeList } from "@/components/income-list"
import { IncomeCategories } from "@/components/income-categories"

export const metadata: Metadata = {
  title: "Gestión de Ingresos",
  description: "Gestiona tus fuentes de ingresos",
}

export default function IncomePage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Ingresos</h1>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/income/new">
                <Plus className="mr-2 h-4 w-4" />
                Añadir Ingreso
              </Link>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos los Ingresos</TabsTrigger>
            <TabsTrigger value="recurring">Recurrentes</TabsTrigger>
            <TabsTrigger value="one-time">Puntuales</TabsTrigger>
            <TabsTrigger value="categories">Categorías</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Todas las Fuentes de Ingresos</CardTitle>
                <CardDescription>Ver y gestionar todas tus fuentes de ingresos.</CardDescription>
              </CardHeader>
              <CardContent>
                <IncomeList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recurring" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ingresos Recurrentes</CardTitle>
                <CardDescription>Ver y gestionar tus fuentes de ingresos recurrentes.</CardDescription>
              </CardHeader>
              <CardContent>
                <IncomeList type="recurring" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="one-time" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ingresos Puntuales</CardTitle>
                <CardDescription>Ver y gestionar tus fuentes de ingresos puntuales.</CardDescription>
              </CardHeader>
              <CardContent>
                <IncomeList type="one-time" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Categorías de Ingresos</CardTitle>
                <CardDescription>Gestionar tus categorías de ingresos.</CardDescription>
              </CardHeader>
              <CardContent>
                <IncomeCategories />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

