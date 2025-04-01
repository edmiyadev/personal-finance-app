"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Ene",
    income: 3500,
    expenses: 1800,
  },
  {
    name: "Feb",
    income: 3500,
    expenses: 1750,
  },
  {
    name: "Mar",
    income: 3500,
    expenses: 1900,
  },
  {
    name: "Abr",
    income: 3700,
    expenses: 1850,
  },
  {
    name: "May",
    income: 3700,
    expenses: 1950,
  },
  {
    name: "Jun",
    income: 3700,
    expenses: 2000,
  },
  {
    name: "Jul",
    income: 3500,
    expenses: 1893,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#22c55e" name="Ingresos" />
        <Bar dataKey="expenses" fill="#ef4444" name="Gastos" />
      </BarChart>
    </ResponsiveContainer>
  )
}

