"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NewTransactionForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date>(new Date())
  const [isRecurring, setIsRecurring] = useState(false)
  const [transactionType, setTransactionType] = useState("expense")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí normalmente guardarías los datos en tu gestión de estado o backend
    // Por ahora, simplemente navegaremos de vuelta al panel
    router.push("/")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="expense" onValueChange={setTransactionType} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expense">Gasto</TabsTrigger>
          <TabsTrigger value="income">Ingreso</TabsTrigger>
        </TabsList>
        <TabsContent value="expense" className="pt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="expense-amount">Cantidad</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                <Input id="expense-amount" type="number" placeholder="0.00" className="pl-7" step="0.01" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expense-date">Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button id="expense-date" variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Seleccionar fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mt-4 grid gap-2">
            <Label htmlFor="expense-category">Categoría</Label>
            <Select required>
              <SelectTrigger id="expense-category">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="housing">Vivienda</SelectItem>
                <SelectItem value="food">Alimentación</SelectItem>
                <SelectItem value="transportation">Transporte</SelectItem>
                <SelectItem value="utilities">Servicios</SelectItem>
                <SelectItem value="entertainment">Entretenimiento</SelectItem>
                <SelectItem value="other">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 grid gap-2">
            <Label htmlFor="expense-subcategory">Subcategoría</Label>
            <Select>
              <SelectTrigger id="expense-subcategory">
                <SelectValue placeholder="Selecciona una subcategoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">Alquiler</SelectItem>
                <SelectItem value="groceries">Comestibles</SelectItem>
                <SelectItem value="dining">Comidas Fuera</SelectItem>
                <SelectItem value="gas">Gasolina</SelectItem>
                <SelectItem value="electricity">Electricidad</SelectItem>
                <SelectItem value="internet">Internet</SelectItem>
                <SelectItem value="other">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 grid gap-2">
            <Label htmlFor="expense-payment">Método de Pago</Label>
            <Select required>
              <SelectTrigger id="expense-payment">
                <SelectValue placeholder="Selecciona método de pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Efectivo</SelectItem>
                <SelectItem value="credit">Tarjeta de Crédito</SelectItem>
                <SelectItem value="debit">Tarjeta de Débito</SelectItem>
                <SelectItem value="bank">Transferencia Bancaria</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 grid gap-2">
            <Label htmlFor="expense-description">Descripción</Label>
            <Textarea id="expense-description" placeholder="Breve descripción de este gasto" className="min-h-[80px]" />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Switch id="expense-recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
            <Label htmlFor="expense-recurring">Este es un gasto recurrente</Label>
          </div>
          {isRecurring && (
            <div className="mt-4 grid gap-2">
              <Label htmlFor="expense-recurrence">Recurrencia</Label>
              <RadioGroup defaultValue="monthly" className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <RadioGroupItem value="daily" id="expense-daily" className="peer sr-only" />
                  <Label
                    htmlFor="expense-daily"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Diario
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="weekly" id="expense-weekly" className="peer sr-only" />
                  <Label
                    htmlFor="expense-weekly"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Semanal
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="monthly" id="expense-monthly" className="peer sr-only" />
                  <Label
                    htmlFor="expense-monthly"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Mensual
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="yearly" id="expense-yearly" className="peer sr-only" />
                  <Label
                    htmlFor="expense-yearly"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Anual
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </TabsContent>
        <TabsContent value="income" className="pt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="income-amount">Cantidad</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                <Input id="income-amount" type="number" placeholder="0.00" className="pl-7" step="0.01" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="income-date">Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button id="income-date" variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Seleccionar fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mt-4 grid gap-2">
            <Label htmlFor="income-category">Categoría</Label>
            <Select required>
              <SelectTrigger id="income-category">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">Salario</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="investments">Inversiones</SelectItem>
                <SelectItem value="other">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 grid gap-2">
            <Label htmlFor="income-description">Descripción</Label>
            <Textarea
              id="income-description"
              placeholder="Breve descripción de este ingreso"
              className="min-h-[80px]"
            />
          </div>
          <div className="mt-4 grid gap-2">
            <Label htmlFor="income-origin">Origen</Label>
            <Input id="income-origin" placeholder="Empresa, cliente, etc." required />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Switch id="income-recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
            <Label htmlFor="income-recurring">Este es un ingreso recurrente</Label>
          </div>
          {isRecurring && (
            <div className="mt-4 grid gap-2">
              <Label htmlFor="income-recurrence">Recurrencia</Label>
              <RadioGroup defaultValue="monthly" className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <RadioGroupItem value="daily" id="income-daily" className="peer sr-only" />
                  <Label
                    htmlFor="income-daily"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Diario
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="weekly" id="income-weekly" className="peer sr-only" />
                  <Label
                    htmlFor="income-weekly"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Semanal
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="monthly" id="income-monthly" className="peer sr-only" />
                  <Label
                    htmlFor="income-monthly"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Mensual
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="yearly" id="income-yearly" className="peer sr-only" />
                  <Label
                    htmlFor="income-yearly"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Anual
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </TabsContent>
      </Tabs>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={() => router.push("/")}>
          Cancelar
        </Button>
        <Button type="submit">Guardar Transacción</Button>
      </div>
    </form>
  )
}

