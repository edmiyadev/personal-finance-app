"use client"

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/redux/store'
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider, useToast } from '@/components/ui/use-toast'
import { ToastContainer } from '@/components/ui/toast'
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import {
  ArrowUpRight,
  CreditCard,
  DollarSign,
  PiggyBank,
  Wallet,
} from "lucide-react";

function AppContent({ children }) {
  const { toasts, dismiss } = useToast();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <AppContent>{children}</AppContent>
          </ToastProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
