import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewTransactionForm } from "@/components/new-transaction-form"

export const metadata: Metadata = {
  title: "Añadir Transacción",
  description: "Añadir una nueva transacción",
}

export default function NewTransactionPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Añadir Nueva Transacción</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Detalles de la Transacción</CardTitle>
            <CardDescription>Introduce los detalles de tu nueva transacción.</CardDescription>
          </CardHeader>
          <CardContent>
            <NewTransactionForm />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

