import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewIncomeForm } from "@/components/new-income-form"

export const metadata: Metadata = {
  title: "Añadir Ingreso",
  description: "Añadir una nueva fuente de ingresos",
}

export default function NewIncomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/income">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Atrás</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Añadir Nuevo Ingreso</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Ingreso</CardTitle>
            <CardDescription>Introduce los detalles de tu nueva fuente de ingresos.</CardDescription>
          </CardHeader>
          <CardContent>
            <NewIncomeForm />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

