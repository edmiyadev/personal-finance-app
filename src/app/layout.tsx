import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CreditCard,
  DollarSign,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">
              Panel Principal
            </h1>
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link href="/transactions/new">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Nueva Transacción
                </Link>
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <Link href="/dashboard">
                <TabsTrigger value="overview">Resumen</TabsTrigger>
              </Link>
              <Link href="/income">
                <TabsTrigger value="income">Ingresos</TabsTrigger>
              </Link>
              <Link href="/expenses">
                <TabsTrigger value="expenses">Gastos</TabsTrigger>
              </Link>
              <Link href="/debts">
                <TabsTrigger value="accounts">Deudas</TabsTrigger>
              </Link>
              <Link href="/budgets">
                <TabsTrigger value="budgets">Presupuestos</TabsTrigger>
              </Link>
            </TabsList>
          </Tabs>
        </div>
        {children}
      </body>
    </html>
  );
}
