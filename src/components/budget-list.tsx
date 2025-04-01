"use client"

import { useState } from "react"
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos de ejemplo
const budgetData = [
  {
    id: 1,
    category: "Vivienda",
    budgetAmount: 1500,
    spentAmount: 1200,
    month: "Abril",
    year: 2023,
  },
  {
    id: 2,
    category: "Alimentación",
    budgetAmount: 600,
    spentAmount: 550,
    month: "Abril",
    year: 2023,
  },
  {
    id: 3,
    category: "Transporte",
    budgetAmount: 400,
    spentAmount: 380,
    month: "Abril",
    year: 2023,
  },
  {
    id: 4,
    category: "Entretenimiento",
    budgetAmount: 200,
    spentAmount: 250,
    month: "Abril",
    year: 2023,
  },
  {
    id: 5,
    category: "Servicios",
    budgetAmount: 300,
    spentAmount: 290,
    month: "Abril",
    year: 2023,
  },
]

export function BudgetList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("Abril")
  const [selectedYear, setSelectedYear] = useState("2023")

  // Filtrar datos de presupuesto según término de búsqueda, mes y año
  const filteredData = budgetData.filter((budget) => {
    const matchesSearch = budget.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMonth = selectedMonth === "all" || budget.month === selectedMonth
    const matchesYear = selectedYear === "all" || budget.year.toString() === selectedYear

    return matchesSearch && matchesMonth && matchesYear
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="grow">
          <Input
            placeholder="Buscar presupuestos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar mes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Meses</SelectItem>
            <SelectItem value="Enero">Enero</SelectItem>
            <SelectItem value="Febrero">Febrero</SelectItem>
            <SelectItem value="Marzo">Marzo</SelectItem>
            <SelectItem value="Abril">Abril</SelectItem>
            <SelectItem value="Mayo">Mayo</SelectItem>
            <SelectItem value="Junio">Junio</SelectItem>
            <SelectItem value="Julio">Julio</SelectItem>
            <SelectItem value="Agosto">Agosto</SelectItem>
            <SelectItem value="Septiembre">Septiembre</SelectItem>
            <SelectItem value="Octubre">Octubre</SelectItem>
            <SelectItem value="Noviembre">Noviembre</SelectItem>
            <SelectItem value="Diciembre">Diciembre</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar año" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Años</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoría</TableHead>
              <TableHead>Presupuesto</TableHead>
              <TableHead>Gastado</TableHead>
              <TableHead>Restante</TableHead>
              <TableHead>Progreso</TableHead>
              <TableHead>Período</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((budget) => {
                const remaining = budget.budgetAmount - budget.spentAmount
                const percentSpent = (budget.spentAmount / budget.budgetAmount) * 100
                const isOverBudget = percentSpent > 100

                return (
                  <TableRow key={budget.id}>
                    <TableCell className="font-medium">{budget.category}</TableCell>
                    <TableCell>${budget.budgetAmount.toFixed(2)}</TableCell>
                    <TableCell>${budget.spentAmount.toFixed(2)}</TableCell>
                    <TableCell className={isOverBudget ? "text-red-600" : "text-green-600"}>
                      {isOverBudget ? "-" : ""}${Math.abs(remaining).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="w-full">
                        <Progress
                          value={Math.min(percentSpent, 100)}
                          className={`h-2 ${isOverBudget ? "bg-red-200" : ""}`}
                          indicatorClassName={isOverBudget ? "bg-red-600" : undefined}
                        />
                        <div className="text-xs text-muted-foreground mt-1">{Math.round(percentSpent)}% usado</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {budget.month} {budget.year}
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
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron presupuestos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

