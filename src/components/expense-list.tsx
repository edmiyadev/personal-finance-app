"use client"

import { useState } from "react"
import { CalendarIcon, Edit2, MoreHorizontal, Trash2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

// Datos de ejemplo
const expenseData = [
  {
    id: 1,
    amount: 1200,
    date: new Date(2023, 6, 1),
    category: "Vivienda",
    subcategory: "Alquiler",
    description: "Pago mensual de alquiler",
    paymentMethod: "Transferencia Bancaria",
    recurrence: "Mensual",
    type: "recurring",
    hasVoucher: false,
  },
  {
    id: 2,
    amount: 85.32,
    date: new Date(2023, 6, 5),
    category: "Alimentación",
    subcategory: "Comestibles",
    description: "Compra semanal de comestibles",
    paymentMethod: "Tarjeta de Crédito",
    recurrence: "Semanal",
    type: "recurring",
    hasVoucher: true,
  },
  {
    id: 3,
    amount: 120,
    date: new Date(2023, 6, 10),
    category: "Servicios",
    subcategory: "Electricidad",
    description: "Factura mensual de electricidad",
    paymentMethod: "Débito Directo",
    recurrence: "Mensual",
    type: "recurring",
    hasVoucher: true,
  },
  {
    id: 4,
    amount: 45.99,
    date: new Date(2023, 6, 15),
    category: "Entretenimiento",
    subcategory: "Streaming",
    description: "Suscripción a Netflix",
    paymentMethod: "Tarjeta de Crédito",
    recurrence: "Mensual",
    type: "recurring",
    hasVoucher: false,
  },
  {
    id: 5,
    amount: 250,
    date: new Date(2023, 6, 20),
    category: "Compras",
    subcategory: "Ropa",
    description: "Zapatos nuevos",
    paymentMethod: "Tarjeta de Crédito",
    recurrence: null,
    type: "one-time",
    hasVoucher: true,
  },
]

interface ExpenseListProps {
  type?: "recurring" | "one-time" | "all"
}

export function ExpenseList({ type = "all" }: ExpenseListProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar datos de gastos según tipo y término de búsqueda
  const filteredData = expenseData.filter((expense) => {
    const matchesType = type === "all" || expense.type === type
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.subcategory.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesType && matchesSearch
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="grow">
          <Input placeholder="Buscar gastos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Seleccionar fecha</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cantidad</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Método de Pago</TableHead>
              <TableHead>Recurrencia</TableHead>
              <TableHead>Comprobante</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium text-red-600 dark:text-red-400">
                    -${expense.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>{format(expense.date, "d MMM, yyyy")}</TableCell>
                  <TableCell>
                    {expense.category}
                    <div className="text-xs text-muted-foreground">{expense.subcategory}</div>
                  </TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.paymentMethod}</TableCell>
                  <TableCell>
                    {expense.recurrence ? (
                      <Badge variant="outline">{expense.recurrence}</Badge>
                    ) : (
                      <Badge variant="outline">Puntual</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {expense.hasVoucher ? <Badge variant="secondary">Sí</Badge> : <Badge variant="outline">No</Badge>}
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
                <TableCell colSpan={8} className="h-24 text-center">
                  No se encontraron gastos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

