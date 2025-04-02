// Este archivo implementará un hook para mostrar notificaciones
"use client"

import { useState, useCallback } from 'react';

interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = Date.now();
    const newToast = { ...options, id };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto-dismiss after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, options.duration || 5000);
    
    return id;
  }, []);

  const dismiss = useCallback((id?: number) => {
    if (id) {
      setToasts(prev => prev.filter(t => t.id !== id));
    } else {
      setToasts([]);
    }
  }, []);

  return {
    toast,
    dismiss,
    toasts
  };
}

// Exportamos un componente ToastProvider que será usado en la raíz de la aplicación
export function ToastProvider({ children }) {
  return <>{children}</>;
}
