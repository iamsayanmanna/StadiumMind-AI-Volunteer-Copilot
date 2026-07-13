import React from 'react'
import type { Waypoint } from '@/types/navigation'
import { ShieldAlert, Compass, Loader2 } from 'lucide-react'

interface RouteOptionsPanelProps {
  destinations: Waypoint[]
  selectedDest: Waypoint | null
  onDestChange: (dest: Waypoint) => void
  emergencyMode: boolean
  onEmergencyToggle: (active: boolean) => void
  isCalculating: boolean
}

export const RouteOptionsPanel: React.FC<RouteOptionsPanelProps> = ({
  destinations,
  selectedDest,
  onDestChange,
  emergencyMode,
  onEmergencyToggle,
  isCalculating,
}) => {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-5 text-left relative flex flex-col justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div className="border-b border-white/5 pb-3 flex justify-between items-center">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Compass className="w-4 h-4 text-stadium-green-500" />
            Route Planning Hub
          </h3>
          {isCalculating && <Loader2 className="w-4 h-4 text-stadium-green-500 animate-spin" />}
        </div>

        {/* Destination selector */}
        <div className="space-y-1.5 text-left">
          <label
            htmlFor="dest-select"
            className="block text-xs font-semibold text-crowd-slate-400 uppercase tracking-wider"
          >
            Target Destination Waypoint
          </label>
          <select
            id="dest-select"
            value={selectedDest?.name || ''}
            onChange={(e) => {
              const found = destinations.find((d) => d.name === e.target.value)
              if (found) onDestChange(found)
            }}
            disabled={emergencyMode}
            className="w-full px-3 py-2.5 rounded-lg text-sm bg-crowd-slate-950 border border-crowd-slate-700 text-slate-100 focus:outline-none focus:border-stadium-green-500 focus:ring-1 focus:ring-stadium-green-500 disabled:opacity-50 transition-all"
          >
            <option value="" disabled>
              Select target destination...
            </option>
            {destinations.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Emergency Evacuation Mode Trigger */}
      <div className="bg-red-950/15 border border-red-900/30 p-4 rounded-xl space-y-3">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-alert-red-500 animate-pulse" />
          <div>
            <h4 className="text-xs font-bold text-slate-100">Sector Evacuation Override</h4>
            <p className="text-[10px] text-crowd-slate-450 mt-0.5">
              Force route guidance to nearest safe emergency evacuation gates.
            </p>
          </div>
        </div>

        <button
          onClick={() => onEmergencyToggle(!emergencyMode)}
          className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all border ${
            emergencyMode
              ? 'bg-alert-red-600 border-alert-red-500 text-white hover:bg-alert-red-500'
              : 'bg-transparent border-alert-red-900/40 text-alert-red-400 hover:bg-alert-red-950/20'
          }`}
        >
          {emergencyMode ? 'CANCEL EVACUATION MODE' : 'ACTIVATE EMERGENCY DETOUR'}
        </button>
      </div>
    </div>
  )
}
