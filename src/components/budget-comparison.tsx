"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Datos de ejemplo
const comparisonData = [
  {
    category: "Vivienda",
    budgeted: 1500,
    actual: 1200,
  },
  {
    category: "Alimentación",
    budgeted: 600,
    actual: 550,
  },
  {
    category: "Transporte",
    budgeted: 400,
    actual: 380,
  },
  {
    category: "Entretenimiento",
    budgeted: 200,
    actual: 250,
  },
  {
    category: "Servicios",
    budgeted: 300,
    actual: 290,
  },
  {
    category: "Salud",
    budgeted: 250,
    actual: 180,
  },
  {
    category: "Compras",
    budgeted: 150,
    actual: 220,
  },
]

export function BudgetComparison() {
  const [selectedMonth, setSelectedMonth] = useState("Abril")
  const [selectedYear, setSelectedYear] = useState("2023")

  // Calcular totales
  const totalBudgeted = comparisonData.reduce((sum, item) => sum + item.budgeted, 0)
  const totalActual = comparisonData.reduce((sum, item) => sum + item.actual, 0)
  const difference = totalBudgeted - totalActual
  const isUnderBudget = difference >= 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="text-lg font-medium">Presupuesto vs. Real para:</div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar mes" />
          </SelectTrigger>
          <SelectContent>
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
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Presupuestado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudgeted.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Gastado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalActual.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Diferencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isUnderBudget ? "text-green-600" : "text-red-600"}`}>
              {isUnderBudget ? "+" : "-"}${Math.abs(difference).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {isUnderBudget ? "Por debajo del presupuesto" : "Por encima del presupuesto"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border p-4">
        <div className="mb-4 text-lg font-medium">Comparación por Categoría</div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
            <Bar dataKey="budgeted" name="Presupuestado" fill="#3b82f6" />
            <Bar dataKey="actual" name="Real" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Análisis de Presupuesto</CardTitle>
          <CardDescription>
            Análisis del rendimiento de tu presupuesto para {selectedMonth} {selectedYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Rendimiento General</h3>
              <p className="text-sm text-muted-foreground">
                {isUnderBudget
                  ? `Estás por debajo del presupuesto en $${Math.abs(difference).toFixed(2)}. ¡Excelente trabajo gestionando tus finanzas!`
                  : `Estás por encima del presupuesto en $${Math.abs(difference).toFixed(2)}. Considera ajustar tus gastos o asignaciones de presupuesto.`}
              </p>
            </div>

            <div>
              <h3 className="font-medium">Categorías a Vigilar</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {comparisonData
                  .filter((item) => item.actual > item.budgeted)
                  .map((item) => (
                    <li key={item.category}>
                      {item.category}: Exceso de ${(item.actual - item.budgeted).toFixed(2)}(
                      {Math.round(((item.actual - item.budgeted) / item.budgeted) * 100)}%)
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium">Categorías Por Debajo del Presupuesto</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {comparisonData
                  .filter((item) => item.actual < item.budgeted)
                  .map((item) => (
                    <li key={item.category}>
                      {item.category}: Por debajo en ${(item.budgeted - item.actual).toFixed(2)}(
                      {Math.round(((item.budgeted - item.actual) / item.budgeted) * 100)}%)
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

