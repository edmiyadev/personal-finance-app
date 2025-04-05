import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BudgetList } from "@/components/budget-list";

export const metadata: Metadata = {
  title: "Gestión de Presupuestos",
  description: "Gestiona tus presupuestos",
};

export default function BudgetPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestión de Presupuestos
          </h1>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/budgets/new">
                <Plus className="mr-2 h-4 w-4" />
                Crear Presupuesto
              </Link>
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Todos los Presupuestos</CardTitle>
            <CardDescription>
              Ver y gestionar tus presupuestos por categoría.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetList />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
