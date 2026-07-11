/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])

    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
      timeoutsRef.current = timeoutsRef.current.filter((t) => t !== timer)
    }, 3000)

    timeoutsRef.current.push(timer)
  }, [])

  useEffect(() => {
    return () => {
      // Clear outstanding timers on unmount
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container floating viewport */}
      <div
        className="fixed top-4 right-4 z-[9999] flex flex-col space-y-2 max-w-sm w-full pointer-events-none"
        aria-live="assertive"
        aria-atomic="true"
      >
        {toasts.map((toast) => {
          const typeStyles = {
            success:
              'border-l-4 border-stadium-green-500 bg-crowd-slate-900/90 text-slate-100 shadow-hud-glow',
            error:
              'border-l-4 border-alert-red-500 bg-crowd-slate-900/90 text-slate-100 shadow-alert-glow',
            warning:
              'border-l-4 border-warning-orange-500 bg-crowd-slate-900/90 text-slate-100 shadow-lg',
            info: 'border-l-4 border-stadium-green-600 bg-crowd-slate-900/90 text-slate-100 shadow-lg',
          }

          return (
            <div
              key={toast.id}
              className={`p-4 rounded-lg border border-white/5 backdrop-blur-md flex items-start justify-between pointer-events-auto animate-slide-in-right ${typeStyles[toast.type]}`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold tracking-wide text-slate-200">
                  {toast.message}
                </span>
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="ml-4 text-slate-400 hover:text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-stadium-green-500 rounded"
                aria-label="Dismiss toast"
              >
                &times;
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
