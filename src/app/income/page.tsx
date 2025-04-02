import type { Metadata } from "next";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        <div className="flex justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestión de Ingresos
          </h1>
          <IncomeFormModal
            triggerButton={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Ingreso
              </Button>
            }
          />
        </div>
        <Card>
          <CardHeader className="flex flex-col items-start justify-between">
            <CardTitle>Todas las Fuentes de Ingresos</CardTitle>
            <CardDescription>
              Ver y gestionar todas tus fuentes de ingresos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IncomeList />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
