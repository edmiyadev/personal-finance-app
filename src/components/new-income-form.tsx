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

export function NewIncomeForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date>(new Date())
  const [isRecurring, setIsRecurring] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí normalmente guardarías los datos en tu gestión de estado o backend
    // Por ahora, simplemente navegaremos de vuelta a la página de ingresos
    router.push("/income")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="amount">Cantidad</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
            <Input id="amount" type="number" placeholder="0.00" className="pl-7" step="0.01" required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="date">Fecha</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button id="date" variant="outline" className="w-full justify-start text-left font-normal">
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
      <div className="grid gap-2">
        <Label htmlFor="category">Categoría</Label>
        <Select required>
          <SelectTrigger id="category">
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
      <div className="grid gap-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" placeholder="Breve descripción de este ingreso" className="min-h-[80px]" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="origin">Origen</Label>
        <Input id="origin" placeholder="Empresa, cliente, etc." required />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
        <Label htmlFor="recurring">Este es un ingreso recurrente</Label>
      </div>
      {isRecurring && (
        <div className="grid gap-2">
          <Label htmlFor="recurrence">Recurrencia</Label>
          <RadioGroup defaultValue="monthly" className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <RadioGroupItem value="daily" id="daily" className="peer sr-only" />
              <Label
                htmlFor="daily"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Diario
              </Label>
            </div>
            <div>
              <RadioGroupItem value="weekly" id="weekly" className="peer sr-only" />
              <Label
                htmlFor="weekly"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Semanal
              </Label>
            </div>
            <div>
              <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
              <Label
                htmlFor="monthly"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Mensual
              </Label>
            </div>
            <div>
              <RadioGroupItem value="yearly" id="yearly" className="peer sr-only" />
              <Label
                htmlFor="yearly"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Anual
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={() => router.push("/income")}>
          Cancelar
        </Button>
        <Button type="submit">Guardar Ingreso</Button>
      </div>
    </form>
  )
}

