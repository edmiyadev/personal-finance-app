import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import Income from '../../../../models/Income';

// GET - Obtener todos los ingresos
export async function GET(req) {
  try {
    // Conectar a la base de datos
    await connectToDatabase();
    
    // Obtener parámetros de consulta (filtros)
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    
    // Crear objeto de consulta para filtrado
    const query = {};
    if (type && type !== 'all') {
      query.type = type;
    }

    // Buscar ingresos según los filtros
    const incomes = await Income.find(query).sort({ date: -1 });
    return NextResponse.json({ success: true, data: incomes });
  } catch (error) {
    console.error('Error al obtener ingresos:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener los ingresos' },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo ingreso
export async function POST(req) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    
    // Crear el nuevo ingreso
    const income = await Income.create(body);
    
    return NextResponse.json({ success: true, data: income }, { status: 201 });
  } catch (error) {
    console.error('Error al crear ingreso:', error);
    return NextResponse.json(
      { success: false, error: 'Error al crear el ingreso' },
      { status: 400 }
    );
  }
}
