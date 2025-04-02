"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

// Definir interfaz para el objeto income
export interface Income {
  id?: number;
  name: string;
  amount: number;
  type: string;
  date: string;
  category: string;
}

interface IncomeFormModalProps {
  income?: Income;
  onSave?: (income: Income) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerButton?: React.ReactNode;
}

export function IncomeFormModal({
  income,
  onSave,
  open: controlledOpen,
  onOpenChange,
  triggerButton,
}: IncomeFormModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Income>({
    name: "",
    amount: 0,
    type: "recurrent",
    date: new Date().toISOString().split("T")[0],
    category: "salary",
  });

  // Si tenemos controlledOpen y onOpenChange, usamos esos para control externo
  const isControlled = controlledOpen !== undefined && onOpenChange !== undefined;
  const isOpen = isControlled ? controlledOpen : open;
  const setIsOpen = (value: boolean) => {
    if (isControlled) {
      onOpenChange(value);
    } else {
      setOpen(value);
    }
  };

  const isEditMode = !!income;

  // Actualizar el formulario cuando cambia el income prop
  useEffect(() => {
    if (income) {
      setFormData(income);
    } else {
      // Restablecer a valores por defecto si no hay ingreso
      setFormData({
        name: "",
        amount: 0,
        type: "recurrent",
        date: new Date().toISOString().split("T")[0],
        category: "salary",
      });
    }
  }, [income, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Llamar al callback onSave con los datos actualizados
    if (onSave) {
      onSave({
        ...formData,
        id: income?.id, // Mantener el ID si estamos editando
      });
    }

    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          {triggerButton || (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Añadir Ingreso
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Editar Ingreso" : "Añadir Ingreso"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Actualiza los detalles del ingreso seleccionado."
                : "Completa los detalles para añadir un nuevo ingreso a tu cuenta."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                placeholder="Ej. Salario"
                className="col-span-3"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Cantidad
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="col-span-3"
                min="0.01"
                step="0.01"
                required
                value={formData.amount}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recurrent">Recurrente</SelectItem>
                  <SelectItem value="one-time">Puntual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Fecha
              </Label>
              <Input
                id="date"
                type="date"
                className="col-span-3"
                required
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoría
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary">Salario</SelectItem>
                  <SelectItem value="freelance">Trabajo Freelance</SelectItem>
                  <SelectItem value="investment">Inversiones</SelectItem>
                  <SelectItem value="other">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {isEditMode ? "Actualizar" : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
