"use client"

import { useState } from "react"
import { ArrowRight, Snowflake, TrendingDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function DebtPaymentStrategies() {
  const [strategy, setStrategy] = useState("snowball")
  const [extraPayment, setExtraPayment] = useState("100")

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Método Bola de Nieve (Snowball)</CardTitle>
            <CardDescription>Paga las deudas de menor a mayor saldo, sin importar la tasa de interés.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <Snowflake className="h-10 w-10 text-primary" />
              <div className="space-y-2">
                <p className="text-sm">
                  El método Bola de Nieve te ayuda a ganar impulso pagando primero las deudas más pequeñas, dándote
                  victorias rápidas y motivación para continuar.
                </p>
                <ul className="list-disc pl-4 text-sm">
                  <li>Enumera tus deudas de menor a mayor saldo</li>
                  <li>Haz pagos mínimos en todas las deudas</li>
                  <li>Destina dinero extra a la deuda más pequeña</li>
                  <li>Una vez pagada la más pequeña, destina ese pago a la siguiente más pequeña</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setStrategy("snowball")}>
              Seleccionar Método Bola de Nieve
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Método Avalancha (Avalanche)</CardTitle>
            <CardDescription>Paga las deudas de mayor a menor tasa de interés.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <TrendingDown className="h-10 w-10 text-primary" />
              <div className="space-y-2">
                <p className="text-sm">
                  El método Avalancha te ahorra más dinero en intereses a lo largo del tiempo al atacar primero las
                  deudas con intereses más altos.
                </p>
                <ul className="list-disc pl-4 text-sm">
                  <li>Enumera tus deudas de mayor a menor tasa de interés</li>
                  <li>Haz pagos mínimos en todas las deudas</li>
                  <li>Destina dinero extra a la deuda con mayor interés</li>
                  <li>Una vez pagada la de mayor interés, pasa a la siguiente con mayor interés</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setStrategy("avalanche")}>
              Seleccionar Método Avalancha
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tu Plan de Pago de Deudas</CardTitle>
          <CardDescription>Personaliza tu estrategia de pago de deudas.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="strategy">Estrategia Seleccionada</Label>
            <RadioGroup id="strategy" value={strategy} onValueChange={setStrategy} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="snowball" id="snowball" />
                <Label htmlFor="snowball">Método Bola de Nieve (Menor Saldo Primero)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="avalanche" id="avalanche" />
                <Label htmlFor="avalanche">Método Avalancha (Mayor Interés Primero)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="extra-payment">Pago Mensual Extra</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
              <Input
                id="extra-payment"
                type="number"
                value={extraPayment}
                onChange={(e) => setExtraPayment(e.target.value)}
                className="pl-7"
                min="0"
                step="10"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Cantidad que puedes pagar cada mes más allá de los pagos mínimos
            </p>
          </div>

          <div className="pt-4">
            <Button className="w-full">
              <ArrowRight className="mr-2 h-4 w-4" />
              Calcular Plan de Pago
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

