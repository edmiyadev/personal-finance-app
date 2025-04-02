import type { Metadata } from "next";
import { Header } from "@/components/header"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import { ToastProvider } from '@/components/ui/use-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finance App",
  description: "Manage your personal finances efficiently",
};

import { Providers } from '../components/providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          <ToastProvider>
            <div className="flex flex-col container mx-auto px-4">
              <Header />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
