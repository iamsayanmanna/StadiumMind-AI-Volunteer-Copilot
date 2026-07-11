import React from 'react'
import { Header } from '@/components/layout'
import { UIProvider } from '@/context/UIContext'
import { AppRouter } from '@/router'
import { AuthProvider } from '@/context/AuthProvider'
import { ToastProvider } from '@/context/ToastContext'
import { ErrorBoundary } from '@/components/shared'
import { SplashScreen } from '@/components/ui'

/**
 * Main App Container.
 * Hooks global Providers (ErrorBoundary, Toast, Auth, UI) and initiates layout viewport.
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <UIProvider>
            <div className="min-h-screen flex flex-col relative">
              <SplashScreen />
              <Header />
              <main className="flex-1 w-full">
                <AppRouter />
              </main>
            </div>
          </UIProvider>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App
