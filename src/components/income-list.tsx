"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Edit2, Trash2, MoreHorizontal } from "lucide-react";
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

// Importaciones de Redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchIncomes, deleteIncome, setSelectedIncome } from "@/redux/features/income/incomeSlice";
import { useToast } from "@/components/ui/use-toast";

export function IncomeList({ type = "all" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // Add this line

  // Hooks de Redux
  const dispatch = useAppDispatch();
  const { items: incomes, status, error, selectedIncome } = useAppSelector((state) => state.income);
  const { toast } = useToast();

  // Detectar renderizado del cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cargar ingresos cuando el componente se monta o cambia el tipo
  useEffect(() => {
    if (isClient) {
      dispatch(fetchIncomes(type));
    }
  }, [dispatch, type, isClient]);

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

  // Filtrar datos según término de búsqueda y fecha
  const filteredData = incomes.filter((income) => {
    const matchesType = type === "all" || income.type === type;
    const matchesSearch =
      income.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (income.description && income.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (income.category && income.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDate =
      !date || 
      (income.date && new Date(income.date).toDateString() === date.toDateString());
    
    return matchesType && matchesSearch && matchesDate;
  });

  // Función para editar un ingreso
  const handleEditIncome = (income: Income) => {
    dispatch(setSelectedIncome(income));
    setTimeout(() => {
      setIsModalOpen(true);
    }, 50);
  };

  // Función para eliminar un ingreso
  const handleDeleteIncome = async (id: number | string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este ingreso?")) {
      try {
        await dispatch(deleteIncome(id));
        toast({
          title: "Éxito",
          description: "Ingreso eliminado correctamente",
        });
      } catch (error) {
        console.error("Error al eliminar:", error);
        toast({
          title: "Error",
          description: "No se pudo eliminar el ingreso",
          variant: "destructive",
        });
      }
    }
  };

  // Función para manejar cierre del modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    dispatch(setSelectedIncome(null));
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
              {date && isClient ? format(date, "PPP") : "Seleccionar fecha"}
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

      {(!isClient || status === 'loading') && 
        <div className="text-center py-4">Cargando ingresos...</div>
      }
      
      {isClient && status !== 'loading' && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Periodicidad</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((income) => (
                  <TableRow
                    key={income._id}
                    className="hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">{income.name}</TableCell>
                    <TableCell className="font-medium">
                      ${parseFloat(income.amount.toString()).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {income.type === 'recurrent' ? 'Recurrente' : 'Puntual'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {income.date ? format(new Date(income.date), "d MMM, yyyy") : 'N/A'}
                    </TableCell>
                    <TableCell>{income.category}</TableCell>
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
                              handleDeleteIncome(income._id || income.id);
                            }}
                            className="text-red-600"
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
                <TableRow key={"no-data"}>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center"
                  >
                    No se encontraron ingresos.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {isClient && (
        <IncomeFormModal
          income={selectedIncome}
          open={isModalOpen}
          onOpenChange={handleModalClose}
        />
      )}
    </div>
  );
}
