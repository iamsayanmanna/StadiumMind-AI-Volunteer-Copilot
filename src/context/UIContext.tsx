/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react'

interface UIContextType {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  activePanel: 'crowd' | 'translation' | 'info'
  setActivePanel: (panel: 'crowd' | 'translation' | 'info') => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activePanel, setActivePanel] = useState<'crowd' | 'translation' | 'info'>('crowd')

  return (
    <UIContext.Provider value={{ sidebarOpen, setSidebarOpen, activePanel, setActivePanel }}>
      {children}
    </UIContext.Provider>
  )
}

export const useUI = () => {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}
