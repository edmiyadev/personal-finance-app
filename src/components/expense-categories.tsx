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
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo
const categoriesData = [
  {
    id: 1,
    name: "Vivienda",
    description: "Alquiler, hipoteca, reparaciones",
    subcategories: ["Alquiler", "Hipoteca", "Reparaciones", "Servicios"],
  },
  {
    id: 2,
    name: "Alimentación",
    description: "Comestibles, comidas fuera",
    subcategories: ["Comestibles", "Restaurantes", "Comida para llevar"],
  },
  {
    id: 3,
    name: "Transporte",
    description: "Pagos del coche, gasolina, transporte público",
    subcategories: ["Pago del Coche", "Gasolina", "Transporte Público", "Mantenimiento"],
  },
  {
    id: 4,
    name: "Servicios",
    description: "Electricidad, agua, internet",
    subcategories: ["Electricidad", "Agua", "Internet", "Teléfono"],
  },
  {
    id: 5,
    name: "Entretenimiento",
    description: "Cine, suscripciones, aficiones",
    subcategories: ["Streaming", "Cine", "Aficiones"],
  },
]

export function ExpenseCategories() {
  const [categories, setCategories] = useState(categoriesData)
  const [newCategory, setNewCategory] = useState({ name: "", description: "", subcategories: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<null | {
    id: number
    name: string
    description: string
    subcategories: string[]
  }>(null)

  const handleAddCategory = () => {
    if (newCategory.name.trim() === "") return

    const subcategoriesArray = newCategory.subcategories
      ? newCategory.subcategories.split(",").map((item) => item.trim())
      : []

    if (editingCategory) {
      // Actualizar categoría existente
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...cat,
                name: newCategory.name,
                description: newCategory.description,
                subcategories: subcategoriesArray,
              }
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
          subcategories: subcategoriesArray,
        },
      ])
    }

    setNewCategory({ name: "", description: "", subcategories: "" })
    setEditingCategory(null)
    setIsDialogOpen(false)
  }

  const handleEditCategory = (category: { id: number; name: string; description: string; subcategories: string[] }) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      description: category.description,
      subcategories: category.subcategories.join(", "),
    })
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
                setNewCategory({ name: "", description: "", subcategories: "" })
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
                  ? "Actualiza los detalles de la categoría de gastos."
                  : "Crea una nueva categoría de gastos para organizar tus finanzas."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre de la Categoría</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="ej., Vivienda, Alimentación"
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
              <div className="grid gap-2">
                <Label htmlFor="subcategories">Subcategorías</Label>
                <Input
                  id="subcategories"
                  value={newCategory.subcategories}
                  onChange={(e) => setNewCategory({ ...newCategory, subcategories: e.target.value })}
                  placeholder="Lista de subcategorías separadas por comas"
                />
                <p className="text-xs text-muted-foreground">
                  Introduce subcategorías separadas por comas (ej., Alquiler, Servicios, Reparaciones)
                </p>
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
              <TableHead>Subcategorías</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.map((subcategory, index) => (
                        <Badge key={index} variant="outline">
                          {subcategory}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
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
                <TableCell colSpan={4} className="h-24 text-center">
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

