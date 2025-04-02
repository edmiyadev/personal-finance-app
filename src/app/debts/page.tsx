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
import { DebtList } from "@/components/debt-list";

export const metadata: Metadata = {
  title: "Gestión de Deudas",
  description: "Gestiona tus deudas y préstamos",
};

export default function DebtPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestión de Deudas
          </h1>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/debts/new">
                <Plus className="mr-2 h-4 w-4" />
                Añadir Deuda
              </Link>
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Todas las Deudas</CardTitle>
            <CardDescription>
              Ver y gestionar todas tus deudas y préstamos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DebtList />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
