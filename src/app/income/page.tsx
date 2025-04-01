import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IncomeList } from "@/components/income-list"
import { AddIncomeModal } from "@/components/add-income-modal"

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
            <AddIncomeModal />
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Todas las Fuentes de Ingresos</CardTitle>
            <CardDescription>Ver y gestionar todas tus fuentes de ingresos.</CardDescription>
          </CardHeader>
          <CardContent>
            <IncomeList />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

