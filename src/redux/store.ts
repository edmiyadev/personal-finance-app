import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';

import incomeReducer from './features/income/incomeSlice';

// Configuración para redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['income'] // Solo persistimos el estado de income
};

const rootReducer = combineReducers({
  income: incomeReducer,
  // Aquí añadiremos más reducers a medida que los creemos
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);

// Inferir los tipos `RootState` y `AppDispatch` de la tienda
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
