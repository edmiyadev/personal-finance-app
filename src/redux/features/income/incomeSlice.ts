import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Income } from '@/components/income-form-modal';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
// Definir interfaces
interface IncomeState {
  items: Income[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedIncome: Income | null;
}

// Estado inicial
const initialState: IncomeState = {
  items: [],
  status: 'idle',
  error: null,
  selectedIncome: null
};

// Thunks para operaciones asincrónicas
export const fetchIncomes = createAsyncThunk(
  'income/fetchIncomes',
  async (type: string = 'all', { rejectWithValue }) => {
    try {
      const queryParam = type !== 'all' ? `?type=${type}` : '';
      const response = await fetch(`/api/income${queryParam}`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addIncome = createAsyncThunk(
  'income/addIncome',
  async (income: Omit<Income, 'id'>, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(income),
      });
      
      if (!response.ok) throw new Error('Failed to add income');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Asegurarse de que updateIncome esté bien implementado
export const updateIncome = createAsyncThunk(
  'income/updateIncome',
  async (incomeData, { rejectWithValue }) => {
    try {
      console.log('Enviando actualización:', incomeData);
      const response = await fetch(`${API_URL}/api/incomes/${incomeData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incomeData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error respuesta:', errorData);
        return rejectWithValue(errorData.message || 'No se pudo actualizar el ingreso');
      }
      
      const updatedIncome = await response.json();
      console.log('Ingreso actualizado exitosamente:', updatedIncome);
      return updatedIncome;
    } catch (error) {
      console.error('Error al actualizar:', error);
      return rejectWithValue('Error de conexión al actualizar el ingreso');
    }
  }
);

export const deleteIncome = createAsyncThunk(
  'income/deleteIncome',
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/income/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete income');
      
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice de income
const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setSelectedIncome: (state, action: PayloadAction<Income | null>) => {
      state.selectedIncome = action.payload;
    },
    clearIncomesError: (state) => {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Casos para fetchIncomes
      .addCase(fetchIncomes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Casos para addIncome
      .addCase(addIncome.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Casos para updateIncome
      .addCase(updateIncome.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(income => income.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        // Limpiar el ingreso seleccionado después de una actualización exitosa
        state.selectedIncome = null;
      })
      .addCase(updateIncome.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? String(action.payload) : 'Error al actualizar el ingreso';
      })
      
      // Casos para deleteIncome
      .addCase(deleteIncome.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(income => income.id !== action.payload);
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedIncome, clearIncomesError } = incomeSlice.actions;
export default incomeSlice.reducer;
