import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpenseList } from "@/components/expense-list"
import { ExpenseCategories } from "@/components/expense-categories"

export const metadata: Metadata = {
  title: "Gestión de Gastos",
  description: "Gestiona tus gastos",
}

export default function ExpensePage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Gastos</h1>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/expenses/new">
                <Plus className="mr-2 h-4 w-4" />
                Añadir Gasto
              </Link>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos los Gastos</TabsTrigger>
            <TabsTrigger value="recurring">Recurrentes</TabsTrigger>
            <TabsTrigger value="one-time">Puntuales</TabsTrigger>
            <TabsTrigger value="categories">Categorías</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Todos los Gastos</CardTitle>
                <CardDescription>Ver y gestionar todos tus gastos.</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recurring" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gastos Recurrentes</CardTitle>
                <CardDescription>Ver y gestionar tus gastos recurrentes.</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseList type="recurring" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="one-time" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gastos Puntuales</CardTitle>
                <CardDescription>Ver y gestionar tus gastos puntuales.</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseList type="one-time" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Categorías de Gastos</CardTitle>
                <CardDescription>Gestionar tus categorías de gastos.</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseCategories />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

