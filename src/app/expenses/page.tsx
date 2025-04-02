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
import { ExpenseList } from "@/components/expense-list";

export const metadata: Metadata = {
  title: "Gestión de Gastos",
  description: "Gestiona tus gastos",
};

export default function ExpensePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestión de Gastos
          </h1>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/expenses/new">
                <Plus className="mr-2 h-4 w-4" />
                Añadir Gasto
              </Link>
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Todos los Gastos</CardTitle>
            <CardDescription>Ver y gestionar todos tus gastos.</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseList />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
