'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
      storageKey="app-theme"
      attribute="class"
      value={{
        light: 'light-theme',
        dark: 'dark-theme',
      }}
    >
      <TooltipProvider delayDuration={300}>
        {children}
        <Toaster 
          position="top-right" 
          richColors 
          closeButton 
          theme="system"
        />
      </TooltipProvider>
    </NextThemesProvider>
  )
}