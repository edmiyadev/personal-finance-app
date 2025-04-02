import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';
import Income from '../../../../../models/Income';

// GET - Obtener un ingreso por ID
export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const income = await Income.findById(id);
    
    if (!income) {
      return NextResponse.json(
        { success: false, error: 'Ingreso no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: income });
  } catch (error) {
    console.error('Error al obtener el ingreso:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener el ingreso' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un ingreso
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const body = await req.json();
    
    const updatedIncome = await Income.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
    
    if (!updatedIncome) {
      return NextResponse.json(
        { success: false, error: 'Ingreso no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: updatedIncome });
  } catch (error) {
    console.error('Error al actualizar el ingreso:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar el ingreso' },
      { status: 400 }
    );
  }
}

// DELETE - Eliminar un ingreso
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const deletedIncome = await Income.findByIdAndDelete(id);
    
    if (!deletedIncome) {
      return NextResponse.json(
        { success: false, error: 'Ingreso no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: deletedIncome });
  } catch (error) {
    console.error('Error al eliminar el ingreso:', error);
    return NextResponse.json(
      { success: false, error: 'Error al eliminar el ingreso' },
      { status: 500 }
    );
  }
}
