import React from 'react'
import { useToast } from '@/context/ToastContext'

export const QuickActions: React.FC = () => {
  const { showToast } = useToast()

  const handleAction = (label: string) => {
    showToast(`Simulation Mode: Launching ${label} console sub-module.`, 'info')
  }

  const actions = [
    {
      title: 'Report Incident',
      desc: 'Log crowd issues, hazard locations, or security events.',
      color: 'bg-alert-red-650 hover:bg-alert-red-600 text-white',
    },
    {
      title: 'Translate Message',
      desc: 'Access multi-language audio and text translation console.',
      color:
        'bg-crowd-slate-900 border border-crowd-slate-800 text-slate-200 hover:bg-crowd-slate-800',
    },
    {
      title: 'Sector Status',
      desc: 'Examine live sector density statistics and bottleneck projections.',
      color:
        'bg-crowd-slate-900 border border-crowd-slate-800 text-slate-200 hover:bg-crowd-slate-800',
    },
    {
      title: 'My Tasks',
      desc: 'Check queue logs, assignment details, and shift schedules.',
      color:
        'bg-crowd-slate-900 border border-crowd-slate-800 text-slate-200 hover:bg-crowd-slate-800',
    },
  ]

  return (
    <div className="glass-panel p-5 rounded-2xl space-y-4 shadow-premium relative overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-crowd-slate-400">
          Volunteer Quick Actions console
        </h3>
        <span className="text-[9px] text-crowd-slate-500 uppercase tracking-widest font-mono font-semibold">
          Shortcuts
        </span>
      </div>

      {/* Buttons layout grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {actions.map((act) => (
          <button
            key={act.title}
            onClick={() => handleAction(act.title)}
            className="flex flex-col items-start p-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-stadium-green-500 hover:shadow-hud-glow select-none group relative bg-black/15 border border-white/5"
          >
            <span className="text-xs font-bold uppercase tracking-wide text-slate-100 group-hover:text-stadium-green-400 transition-colors">
              {act.title}
            </span>
            <span className="text-[10px] text-crowd-slate-450 leading-relaxed mt-1 font-medium">
              {act.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
