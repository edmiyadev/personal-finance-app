import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  onClose?: () => void;
}

export function Toast({ 
  title, 
  description, 
  variant = 'default',
  onClose 
}: ToastProps) {
  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 max-w-md rounded-lg bg-white p-4 shadow-lg",
      "border border-gray-200 dark:bg-gray-800 dark:border-gray-700",
      variant === 'destructive' && "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
    )}>
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className={cn(
            "font-medium text-gray-900 dark:text-gray-100",
            variant === 'destructive' && "text-red-800 dark:text-red-300"
          )}>
            {title}
          </h3>
          {description && (
            <div className={cn(
              "mt-1 text-sm text-gray-500 dark:text-gray-400",
              variant === 'destructive' && "text-red-700 dark:text-red-400"
            )}>
              {description}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className={cn(
            "ml-4 inline-flex shrink-0 rounded-md p-1 text-gray-400 hover:text-gray-500 focus:outline-none",
            variant === 'destructive' && "text-red-400 hover:text-red-500"
          )}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function ToastContainer({ toasts, dismiss }) {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => dismiss(toast.id)}
        />
      ))}
    </div>
  )
}
