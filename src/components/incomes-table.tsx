import { useState } from 'react';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Edit, Trash, Plus } from 'lucide-react';
import { AddIncomeModal, Income } from './add-income-modal';

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
  const handleDeleteIncome = (id: number) => {
    setIncomes(incomes.filter(income => income.id !== id));
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
            <TableRow key={income.id} className="cursor-pointer" onClick={() => handleEditIncome(income)}>
              <TableCell>{income.name}</TableCell>
              <TableCell>${income.amount.toFixed(2)}</TableCell>
              <TableCell>{getTypeLabel(income.type)}</TableCell>
              <TableCell>{new Date(income.date).toLocaleDateString()}</TableCell>
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
      
      <AddIncomeModal
        income={selectedIncome}
        onSave={handleSaveIncome}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
