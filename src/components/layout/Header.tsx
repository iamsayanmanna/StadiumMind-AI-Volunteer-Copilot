import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'

/**
 * Global Header layout.
 * Displays logo, volunteer sector details, and logout actions if authenticated.
 */
export const Header: React.FC = () => {
  const { user, logout } = useAuth()
  const { showToast } = useToast()

  const handleLogout = () => {
    logout()
    showToast('Session terminated successfully.', 'info')
  }

  return (
    <header className="w-full glass-panel border-b border-white/5 py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        {/* World Cup logo mark */}
        <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-stadium-green-600 to-energy-gold-500 flex items-center justify-center font-bold text-white shadow-hud-glow">
          SM
        </div>
        <div>
          <h1 className="text-base font-semibold leading-none tracking-wide text-slate-100">
            StadiumMind
          </h1>
          <p className="text-[10px] text-stadium-green-500 font-medium tracking-wider uppercase">
            AI Volunteer Copilot
          </p>
        </div>
      </div>

      {user && (
        <div className="flex items-center space-x-4">
          {/* Volunteer Role Info */}
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-slate-200">{user.name}</span>
            <span className="text-[9px] text-crowd-slate-400 font-mono tracking-wider uppercase">
              {user.role}
            </span>
          </div>

          {/* Sector HUD Badge */}
          <div className="flex items-center space-x-2 bg-stadium-green-950/80 border border-stadium-green-800 px-3 py-1 rounded-full text-xs text-stadium-green-500">
            <span className="w-2 h-2 rounded-full bg-stadium-green-500 animate-pulse"></span>
            <span className="font-semibold uppercase tracking-wider">{user.assignedSector}</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-crowd-slate-900 border border-crowd-slate-800 text-crowd-slate-350 hover:bg-alert-red-600/10 hover:border-alert-red-500/20 hover:text-alert-red-500 cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-alert-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  )
}
