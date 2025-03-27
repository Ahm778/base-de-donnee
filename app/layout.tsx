"use client"

import { usePathname } from 'next/navigation'
import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = ['/login', '/register', '/forgot-password' ].includes(pathname || '')

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} ${isAuthPage ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : ''}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            {isAuthPage ? (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                  {children}
                </div>
              </div>
            ) : (
              <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1">{children}</main>
              </div>
            )}
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}