"use client"

import { useState } from "react"
import { CalendarIcon, Edit2, MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

// Datos de ejemplo
const debtData = [
  {
    id: 1,
    name: "Préstamo de Coche",
    institution: "Banco ABC",
    totalAmount: 15000,
    outstandingBalance: 10000,
    interestRate: 4.5,
    term: 60,
    startDate: new Date(2022, 1, 15),
    endDate: new Date(2027, 1, 15),
    installmentAmount: 279.12,
    paymentDay: 15,
    type: "loan",
  },
  {
    id: 2,
    name: "Préstamo Estudiantil",
    institution: "Ayuda Federal Estudiantil",
    totalAmount: 25000,
    outstandingBalance: 18000,
    interestRate: 3.2,
    term: 120,
    startDate: new Date(2020, 8, 1),
    endDate: new Date(2030, 8, 1),
    installmentAmount: 245.32,
    paymentDay: 1,
    type: "loan",
  },
  {
    id: 3,
    name: "Tarjeta de Crédito",
    institution: "Banco XYZ",
    totalAmount: 5000,
    outstandingBalance: 2500,
    interestRate: 18.9,
    term: null,
    startDate: new Date(2021, 5, 10),
    endDate: null,
    installmentAmount: 100,
    paymentDay: 10,
    type: "credit-card",
  },
  {
    id: 4,
    name: "Préstamo de Mejoras del Hogar",
    institution: "Crédito Hogar",
    totalAmount: 10000,
    outstandingBalance: 8000,
    interestRate: 6.5,
    term: 36,
    startDate: new Date(2023, 1, 5),
    endDate: new Date(2026, 1, 5),
    installmentAmount: 305.87,
    paymentDay: 5,
    type: "loan",
  },
]

interface DebtListProps {
  type?: "loan" | "credit-card" | "all"
}

export function DebtList({ type = "all" }: DebtListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar datos de deudas según tipo y término de búsqueda
  const filteredData = debtData.filter((debt) => {
    const matchesType = type === "all" || debt.type === type
    const matchesSearch =
      debt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      debt.institution.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesType && matchesSearch
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="grow">
          <Input placeholder="Buscar deudas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Institución</TableHead>
              <TableHead>Saldo</TableHead>
              <TableHead>Tasa de Interés</TableHead>
              <TableHead>Pago</TableHead>
              <TableHead>Progreso</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((debt) => (
                <TableRow key={debt.id}>
                  <TableCell className="font-medium">{debt.name}</TableCell>
                  <TableCell>{debt.institution}</TableCell>
                  <TableCell>
                    <div>${debt.outstandingBalance.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">de ${debt.totalAmount.toFixed(2)}</div>
                  </TableCell>
                  <TableCell>{debt.interestRate}%</TableCell>
                  <TableCell>
                    <div>${debt.installmentAmount.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">Vence el día {debt.paymentDay}</div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full">
                      <Progress
                        value={((debt.totalAmount - debt.outstandingBalance) / debt.totalAmount) * 100}
                        className="h-2"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.round(((debt.totalAmount - debt.outstandingBalance) / debt.totalAmount) * 100)}% pagado
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Historial de Pagos
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron deudas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

