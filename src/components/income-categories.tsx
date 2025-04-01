"use client"

import { useState } from "react"
import { Edit2, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Datos de ejemplo
const categoriesData = [
  { id: 1, name: "Salario", description: "Ingresos regulares por empleo" },
  { id: 2, name: "Freelance", description: "Ingresos por trabajo freelance" },
  { id: 3, name: "Inversiones", description: "Dividendos, intereses, ganancias de capital" },
  { id: 4, name: "Otros", description: "Fuentes de ingresos diversas" },
]

export function IncomeCategories() {
  const [categories, setCategories] = useState(categoriesData)
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<null | { id: number; name: string; description: string }>(null)

  const handleAddCategory = () => {
    if (newCategory.name.trim() === "") return

    if (editingCategory) {
      // Actualizar categoría existente
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, name: newCategory.name, description: newCategory.description }
            : cat,
        ),
      )
    } else {
      // Añadir nueva categoría
      setCategories([
        ...categories,
        {
          id: categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
          name: newCategory.name,
          description: newCategory.description,
        },
      ])
    }

    setNewCategory({ name: "", description: "" })
    setEditingCategory(null)
    setIsDialogOpen(false)
  }

  const handleEditCategory = (category: { id: number; name: string; description: string }) => {
    setEditingCategory(category)
    setNewCategory({ name: category.name, description: category.description })
    setIsDialogOpen(true)
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingCategory(null)
                setNewCategory({ name: "", description: "" })
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Añadir Categoría
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Editar Categoría" : "Añadir Nueva Categoría"}</DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "Actualiza los detalles de la categoría de ingresos."
                  : "Crea una nueva categoría de ingresos para organizar tus finanzas."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre de la Categoría</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="ej., Salario, Inversiones"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Breve descripción de esta categoría"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddCategory}>{editingCategory ? "Guardar Cambios" : "Añadir Categoría"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)}>
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No se encontraron categorías.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

