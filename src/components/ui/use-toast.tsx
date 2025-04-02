"use client"

import { toast as toastify, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastify-custom.css';  // Estilos personalizados

interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

export function useToast() {
  const toast = (options: ToastOptions) => {
    const { title, description, variant = 'default', duration = 5000 } = options;
    
    // Configuramos el tipo de toast basado en la variante
    const toastType = variant === 'destructive' ? toastify.error : toastify.info;
    
    // Si hay descripción, mostrar título y descripción, sino solo título
    return toastType(
      description ? (
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm opacity-90">{description}</div>
        </div>
      ) : title, 
      {
        autoClose: duration,
        closeButton: true,
      }
    );
  };

  return {
    toast,
    // Exponemos funciones adicionales de toastify para mantener compatibilidad
    dismiss: toastify.dismiss,
    toasts: [] // Mantenemos la API para compatibilidad, pero ya no es necesario
  };
}

export function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
