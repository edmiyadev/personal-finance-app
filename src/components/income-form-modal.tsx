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
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Importaciones de Redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addIncome, updateIncome, setSelectedIncome } from "@/redux/features/income/incomeSlice";

// Definir interfaz para el objeto income
export interface Income {
  _id?: number | string;
  name: string;
  amount: number;
  type: string;
  date: string;
  category: string;
  description?: string;
  origin?: string;
  recurrence?: string | null;
}

interface IncomeFormModalProps {
  income?: Income | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerButton?: React.ReactNode;
}

export function IncomeFormModal({
  income,
  open: controlledOpen,
  onOpenChange,
  triggerButton,
}: IncomeFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Income>({
    _id: "",
    name: "",
    amount: 0,
    type: "recurrent",
    date: new Date().toISOString().split("T")[0],
    category: "salary",
  });

  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.income);
  const { toast } = useToast();

  // Sincronizar estado abierto/cerrado con props controlados
  useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsOpen(controlledOpen);
    }
  }, [controlledOpen]);

  // Actualizar formulario cuando cambia el ingreso seleccionado
  useEffect(() => {
    if (income) {
      console.log("Editando ingreso:", income);
      setFormData({
        ...income,
        date: income.date ? new Date(income.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        description: income.description || "",
        origin: income.origin || ""
      });
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

  // Mostrar errores como toasts
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Función para resetear el formulario
  const resetForm = () => {
    setFormData({
      name: "",
      amount: 0,
      type: "recurrent",
      date: new Date().toISOString().split("T")[0],
      category: "salary",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Guardando ingreso:", formData._id);
      
      if (formData._id) {
        // Modo edición - garantizar que tenemos un ID válido
        const updateData = {
          ...formData,
          _id: income?._id // Usar el ID original del ingreso para evitar problemas
        };
        
        console.log("Actualizando ingreso:", updateData);
        await dispatch(updateIncome(updateData)).unwrap();
        toast({
          title: "Éxito",
          description: "Ingreso actualizado correctamente",
        });
      } else {
        // Modo creación - asegurar que no enviamos un ID vacío
        const { ...newIncomeData } = formData;
        await dispatch(addIncome(newIncomeData)).unwrap();
        toast({
          title: "Éxito",
          description: "Ingreso añadido correctamente",
        });
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar:", error);
      // Los errores ya son manejados por el slice
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (_id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [_id]: value,
    }));
  };

  const handleCloseModal = () => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setIsOpen(false);
    }
    
    // Limpiar el ingreso seleccionado y resetear formulario
    dispatch(setSelectedIncome(null));
    resetForm();
  };

  const open = controlledOpen !== undefined ? controlledOpen : isOpen;

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (onOpenChange) {
        onOpenChange(newOpen);
      } else {
        setIsOpen(newOpen);
      }
      // Si se cierra el modal, resetear el formulario
      if (!newOpen) {
        resetForm();
      }
    }}>
      {!controlledOpen && triggerButton ? (
        <DialogTrigger asChild>
          {triggerButton || (
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Añadir Ingreso
            </Button>
          )}
        </DialogTrigger>
      ) : null}
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className={formData._id ? "text-amber-600" : "text-primary"}>
              {formData._id ? "Editar Ingreso" : "Añadir Ingreso"}
            </DialogTitle>
            <DialogDescription>
              {formData._id
                ? `Editando: ${formData.name}`
                : "Añade una nueva fuente de ingresos a tu presupuesto"}
            </DialogDescription>
          </DialogHeader>
          <div className="gr_id gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Monto
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={handleInputChange}
                className="col-span-3"
                required
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
                  <SelectValue placeholder="Selecciona un tipo" />
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
                value={formData.date}
                onChange={handleInputChange}
                className="col-span-3"
                required
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
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary">Salario</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="investment">Inversiones</SelectItem>
                  <SelectItem value="other">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Guardando...' : formData._id ? 'Actualizar' : 'Guardar'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
