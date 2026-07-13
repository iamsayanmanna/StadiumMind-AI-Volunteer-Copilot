import React from 'react'
import type { EmergencyRoute } from '@/types/navigation'
import { MapPin, Zap } from 'lucide-react'

interface EmergencyRouteCardProps {
  route: EmergencyRoute | null
}

export const EmergencyRouteCard: React.FC<EmergencyRouteCardProps> = ({ route }) => {
  if (!route) return null

  return (
    <div className="bg-alert-red-950/20 border border-alert-red-900/40 p-4 rounded-xl space-y-3 text-left">
      <div className="flex justify-between items-center">
        <span className="text-[9px] bg-alert-red-900/80 text-white border border-alert-red-650 px-2 py-0.5 rounded font-mono uppercase font-bold tracking-wider animate-pulse flex items-center gap-1">
          <Zap className="w-3 h-3" />
          ACTIVE EVACUATION PATH
        </span>
        <span className="text-[10px] text-alert-red-400 font-bold">{route.priorityLevel}</span>
      </div>

      <p className="text-xs text-slate-200 font-medium leading-relaxed">
        {route.triggerDescription}
      </p>

      <div className="flex flex-col gap-1.5 pt-1.5 border-t border-alert-red-900/35">
        <span className="text-[9px] uppercase font-bold text-alert-red-400 tracking-wider">
          Safe Waypoints Path
        </span>
        <div className="flex flex-wrap gap-2">
          {route.safeExitWaypoints.map((wp, idx) => (
            <div
              key={wp.name}
              className="flex items-center gap-1 bg-alert-red-950/50 border border-alert-red-900/40 px-2.5 py-1 rounded-md text-[10px] text-slate-300 font-medium"
            >
              <MapPin className="w-3 h-3 text-alert-red-400" />
              <span>
                {idx + 1}. {wp.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
