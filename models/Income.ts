import mongoose from 'mongoose';

// Definir el schema solo si no existe
const IncomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'El monto es obligatorio'],
    min: [0, 'El monto debe ser mayor a 0']
  },
  date: {
    type: Date,
    required: [true, 'La fecha es obligatoria'],
    default: Date.now
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  recurrence: {
    type: String,
    enum: ['Diario', 'Semanal', 'Mensual', 'Trimestral', 'Anual', null],
    default: null
  },
  type: {
    type: String,
    enum: ['recurrent', 'one-time'],
    default: 'one-time'
  }
}, {
  timestamps: true
});

// Exportar el modelo (o crear si no existe)
export default mongoose.models.Income || mongoose.model('Income', IncomeSchema);
