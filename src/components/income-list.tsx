"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Edit2, Trash2, MoreHorizontal, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { IncomeFormModal, Income } from "@/components/income-form-modal";

// Datos de ejemplo para ingresos
const incomeData = [
  {
    id: 1,
    name: "Salario Mensual",
    amount: 2500,
    date: new Date(2023, 6, 1),
    category: "Salario",
    description: "Salario regular mensual",
    recurrence: "Mensual",
    origin: "Empresa ABC",
    type: "recurrent",
  },
  {
    id: 2,
    name: "Proyecto Freelance",
    amount: 800,
    date: new Date(2023, 6, 15),
    category: "Freelance",
    description: "Diseño de website para cliente",
    recurrence: null,
    origin: "Cliente XYZ",
    type: "one-time",
  },
  {
    id: 3,
    name: "Dividendos",
    amount: 350,
    date: new Date(2023, 6, 20),
    category: "Inversiones",
    description: "Dividendos trimestrales",
    recurrence: "Trimestral",
    origin: "Bolsa de Valores",
    type: "recurrent",
  },
  {
    id: 4,
    name: "Venta",
    amount: 150,
    date: new Date(2023, 6, 25),
    category: "Otros",
    description: "Venta de muebles usados",
    recurrence: null,
    origin: "Mercado",
    type: "one-time",
  },
];

export function IncomeList({ type = "all" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [incomes, setIncomes] = useState(incomeData);
  const [selectedIncome, setSelectedIncome] = useState<Income | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrar datos según tipo, término de búsqueda y fecha
  const filteredData = incomes.filter((income) => {
    const matchesType = type === "all" || income.type === type;
    const matchesSearch =
      income.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      income.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      income.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      income.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate =
      !date || format(income.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    return matchesType && matchesSearch && matchesDate;
  });

  // Función para guardar o actualizar un ingreso
  const handleSaveIncome = (updatedIncome: Income) => {
    if (updatedIncome.id) {
      // Actualizar un ingreso existente
      setIncomes(
        incomes.map((income) =>
          income.id === updatedIncome.id
            ? {
                ...income,
                ...updatedIncome,
                date: new Date(updatedIncome.date),
              }
            : income
        )
      );
    } else {
      // Añadir un nuevo ingreso
      const newIncome = {
        ...updatedIncome,
        id: Math.max(0, ...incomes.map((i) => i.id || 0)) + 1,
        date: new Date(updatedIncome.date),
      };
      setIncomes([...incomes, newIncome]);
    }
  };

  // Función para editar un ingreso
  const handleEditIncome = (income: any) => {
    const incomeToEdit: Income = {
      id: income.id,
      name: income.name,
      amount: income.amount,
      type: income.type,
      date: format(income.date, "yyyy-MM-dd"),
      category: income.category.toLowerCase(),
    };

    setSelectedIncome(incomeToEdit);
    setIsModalOpen(true);
  };

  // Función para eliminar un ingreso
  const handleDeleteIncome = (id: number) => {
    setIncomes(incomes.filter((income) => income.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="grow">
          <Input
            placeholder="Buscar ingresos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-fit">
              {date ? format(date, "PPP") : "Seleccionar fecha"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Periodicidad</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((income) => (
                <TableRow
                  key={income.id}
                  className="hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{income.name}</TableCell>
                  <TableCell className="font-medium">
                    ${income.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {income.recurrence ? (
                      <Badge variant="outline">{income.recurrence}</Badge>
                    ) : (
                      <Badge variant="outline">Puntual</Badge>
                    )}
                  </TableCell>
                  <TableCell>{format(income.date, "d MMM, yyyy")}</TableCell>
                  <TableCell>{income.category}</TableCell>
                  <TableCell>{income.origin}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditIncome(income);
                          }}
                        >
                          <Edit2 className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteIncome(income.id);
                          }}
                        >
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

      <IncomeFormModal
        income={selectedIncome}
        onSave={handleSaveIncome}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
