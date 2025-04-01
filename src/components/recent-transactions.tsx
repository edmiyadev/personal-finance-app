import { ArrowDown, ArrowUp } from "lucide-react"

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900">
          <ArrowUp className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Salario</p>
          <p className="text-sm text-muted-foreground">Salario mensual</p>
        </div>
        <div className="ml-auto font-medium text-green-600 dark:text-green-400">+$3,500.00</div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900">
          <ArrowDown className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Alquiler</p>
          <p className="text-sm text-muted-foreground">Pago mensual de alquiler</p>
        </div>
        <div className="ml-auto font-medium text-red-600 dark:text-red-400">-$1,200.00</div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900">
          <ArrowDown className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Comestibles</p>
          <p className="text-sm text-muted-foreground">Compra semanal de comestibles</p>
        </div>
        <div className="ml-auto font-medium text-red-600 dark:text-red-400">-$85.32</div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900">
          <ArrowDown className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Servicios</p>
          <p className="text-sm text-muted-foreground">Electricidad y agua</p>
        </div>
        <div className="ml-auto font-medium text-red-600 dark:text-red-400">-$120.00</div>
      </div>
    </div>
  )
}

