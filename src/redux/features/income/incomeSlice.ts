import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Income } from '@/components/income-form-modal';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
// Definir interfaces
interface IncomeState {
  items: Income[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedIncome: Income | null;
  errorDisplayed: boolean; // New flag to track if error was displayed
}

// Estado inicial
const initialState: IncomeState = {
  items: [],
  status: 'idle',
  error: null,
  selectedIncome: null,
  errorDisplayed: false
};

// Thunks para operaciones asincrónicas
export const fetchIncomes = createAsyncThunk(
  'income/fetchIncomes',
  async (type: string = 'all', { rejectWithValue }) => {
    try {
      const queryParam = type !== 'all' ? `?type=${type}` : '';
      const response = await fetch(`/api/income${queryParam}`);
      
      if (!response.ok) {
        const errorStatus = response.status;
        return rejectWithValue({
          message: 'Network response was not ok',
          status: errorStatus
        });
      }
      
      const data = await response.json();
      return data.data;
    } catch (error: unknown) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        isNetworkError: true
      });
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
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add income');
    }
  }
);

// Asegurarse de que updateIncome esté bien implementado
export const updateIncome = createAsyncThunk(
  'income/updateIncome',
  async (incomeData: Income, { rejectWithValue }) => {
    try {
      console.log('Enviando actualización:', incomeData);
      
      // Using the correct API endpoint structure that matches the rest of your app
      const response = await fetch(`/api/income/${incomeData._id || incomeData.id}`, {
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
      
      const data = await response.json();
      console.log('Ingreso actualizado exitosamente:', data);
      return data.data || data; // Handle different response formats
    } catch (error: unknown) {
      console.error('Error al actualizar:', error);
      return rejectWithValue('Error de conexión al actualizar el ingreso');
    }
  }
);

export const deleteIncome = createAsyncThunk(
  'income/deleteIncome',
  async (incomeData: Income, { rejectWithValue }) => {
    try {
      // Extraer el ID dependiendo del tipo de parámetro recibido
      let id: string | number;
      
      if (typeof incomeData === 'string' || typeof incomeData === 'number') {
        id = incomeData;
      } else if (incomeData && typeof incomeData === 'object') {
        id = incomeData._id || incomeData.id;
        if (!id) {
          return rejectWithValue('El objeto ingreso no tiene un ID válido');
        }
      } else {
        return rejectWithValue('ID no válido para eliminar ingreso');
      }
      
      console.log('Eliminando ingreso con ID:', id);
      const response = await fetch(`/api/income/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete income');
      
      return id; // Devolvemos el ID que se usó para eliminar
    } catch (error: unknown) {
      console.error('Error al eliminar ingreso:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Error al eliminar ingreso');
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
      state.errorDisplayed = false;
    },
    markErrorAsDisplayed: (state) => {
      state.errorDisplayed = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Casos para fetchIncomes
      .addCase(fetchIncomes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.errorDisplayed = false;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
        state.errorDisplayed = false;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          const payload = action.payload as any;
          state.error = payload.message || 'Unknown error occurred';
        } else {
          state.error = action.error.message || 'Failed to fetch incomes';
        }
        state.errorDisplayed = false; // Reset to false so it can be displayed once
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
        const id = action.payload._id || action.payload.id;
        const index = state.items.findIndex(income => 
          (income._id && income._id === id) || (income.id && income.id === id)
        );
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
        // Filtramos usando tanto _id como id para mayor compatibilidad
        state.items = state.items.filter(income => 
          income._id !== action.payload && income.id !== action.payload
        );
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedIncome, clearIncomesError, markErrorAsDisplayed } = incomeSlice.actions;
export default incomeSlice.reducer;
