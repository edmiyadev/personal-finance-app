import { useState } from 'react';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Edit, Trash, Plus } from 'lucide-react';
import { IncomeFormModal, Income } from "@/components/income-form-modal";
import { deleteIncome } from "@/redux/features/income/incomeSlice";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { format } from 'date-fns'; // Add date-fns for consistent formatting

export function IncomesTable() {
  // Estados para manejar los ingresos y la edición
  const [incomes, setIncomes] = useState<Income[]>([
    // Datos de ejemplo (reemplazar con datos reales de tu aplicación)
    {
      id: 1,
      name: 'Salario Mensual',
      amount: 2500.0,
      type: 'recurrent',
      date: '2023-05-01',
      category: 'salary'
    },
    {
      id: 2,
      name: 'Proyecto Freelance',
      amount: 800.0,
      type: 'one-time',
      date: '2023-05-15',
      category: 'freelance'
    }
  ]);
  
  const [selectedIncome, setSelectedIncome] = useState<Income | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.income);
  
  // Función para guardar o actualizar un ingreso
  const handleSaveIncome = (updatedIncome: Income) => {
    if (updatedIncome.id) {
      // Actualizar un ingreso existente
      setIncomes(incomes.map(income => 
        income.id === updatedIncome.id ? updatedIncome : income
      ));
    } else {
      // Añadir un nuevo ingreso
      const newIncome = {
        ...updatedIncome,
        id: Math.max(0, ...incomes.map(i => i.id || 0)) + 1
      };
      setIncomes([...incomes, newIncome]);
    }
  };
  
  // Función para editar un ingreso
  const handleEditIncome = (income: Income) => {
    setSelectedIncome(income);
    setIsModalOpen(true);
  };
  
  // Función para añadir un nuevo ingreso
  const handleAddIncome = () => {
    setSelectedIncome(undefined);
    setIsModalOpen(true);
  };
  
  // Función para eliminar un ingreso
  const handleDeleteIncome = async (id: number | string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este ingreso?")) {
      try {
        await dispatch(deleteIncome(id)).unwrap();
        toast({
          title: "Éxito",
          description: "Ingreso eliminado correctamente",
        });
      } catch (error) {
        console.error("Error al eliminar:", error);
        // Los errores son manejados por el slice
      }
    }
  };
  
  // Funciones para mostrar etiquetas legibles
  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      'salary': 'Salario',
      'freelance': 'Trabajo Freelance',
      'investment': 'Inversiones',
      'other': 'Otros'
    };
    return categories[category] || category;
  };
  
  const getTypeLabel = (type: string) => {
    return type === 'recurrent' ? 'Recurrente' : 'Puntual';
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mis Ingresos</h2>
        <Button onClick={handleAddIncome}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir Ingreso
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomes.map((income) => (
            <TableRow key={income._id} className="cursor-pointer" onClick={() => handleEditIncome(income)}>
              <TableCell>{income.name}</TableCell>
              <TableCell>${income.amount.toFixed(2)}</TableCell>
              <TableCell>{getTypeLabel(income.type)}</TableCell>
              <TableCell>
                {income.date ? format(new Date(income.date), "dd MMM, yyyy") : 'N/A'}
              </TableCell>
              <TableCell>{getCategoryLabel(income.category)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditIncome(income);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteIncome(income.id!);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <IncomeFormModal
        income={selectedIncome}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}