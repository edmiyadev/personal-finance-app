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
const incomeData = [
  {
    id: 1,
    amount: 3500,
    date: new Date(2023, 6, 1),
    category: "Salario",
    description: "Salario mensual",
    recurrence: "Mensual",
    origin: "Empresa ABC",
    type: "recurring",
  },
  {
    id: 2,
    amount: 500,
    date: new Date(2023, 6, 15),
    category: "Freelance",
    description: "Proyecto de diseño web",
    recurrence: null,
    origin: "Cliente XYZ",
    type: "one-time",
  },
  {
    id: 3,
    amount: 200,
    date: new Date(2023, 6, 20),
    category: "Inversiones",
    description: "Pago de dividendos",
    recurrence: "Trimestral",
    origin: "Fondo de Inversión",
    type: "recurring",
  },
  {
    id: 4,
    amount: 150,
    date: new Date(2023, 6, 25),
    category: "Otros",
    description: "Venta de muebles usados",
    recurrence: null,
    origin: "Mercado",
    type: "one-time",
  },
]

interface IncomeListProps {
  type?: "recurring" | "one-time" | "all"
}

export function IncomeList({ type = "all" }: IncomeListProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar datos de ingresos según tipo y término de búsqueda
  const filteredData = incomeData.filter((income) => {
    const matchesType = type === "all" || income.type === type
    const matchesSearch =
      income.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      income.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      income.origin.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesType && matchesSearch
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="grow">
          <Input placeholder="Buscar ingresos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
              <TableHead>Recurrencia</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((income) => (
                <TableRow key={income.id}>
                  <TableCell className="font-medium">${income.amount.toFixed(2)}</TableCell>
                  <TableCell>{format(income.date, "d MMM, yyyy")}</TableCell>
                  <TableCell>{income.category}</TableCell>
                  <TableCell>{income.description}</TableCell>
                  <TableCell>
                    {income.recurrence ? (
                      <Badge variant="outline">{income.recurrence}</Badge>
                    ) : (
                      <Badge variant="outline">Puntual</Badge>
                    )}
                  </TableCell>
                  <TableCell>{income.origin}</TableCell>
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
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron ingresos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

