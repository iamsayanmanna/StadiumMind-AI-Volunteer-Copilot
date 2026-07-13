import React from 'react'
import type { Route } from '@/types/navigation'
import { Navigation } from 'lucide-react'

interface NavigationTimelineProps {
  route: Route | null
}

export const NavigationTimeline: React.FC<NavigationTimelineProps> = ({ route }) => {
  if (!route) {
    return (
      <div className="glass-panel p-6 rounded-2xl border border-white/5 text-center flex items-center justify-center h-[350px] text-crowd-slate-500 text-xs">
        Select a navigation route to view step-by-step turn guidance.
      </div>
    )
  }

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col h-[350px]">
      <div className="border-b border-white/5 pb-3">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Navigation className="w-4 h-4 text-stadium-green-400 rotate-45" />
          Turn-by-Turn Guidance
        </h3>
        <p className="text-[10px] text-crowd-slate-450 uppercase tracking-wider">
          Navigational steps
        </p>
      </div>

      <div className="flex-1 overflow-y-auto relative pl-5 space-y-5 pt-1 custom-scrollbar">
        {/* Progress line */}
        <div className="absolute left-2 top-3 bottom-5 w-0.5 bg-crowd-slate-800" />

        {route.waypoints.map((wp, idx) => (
          <div key={wp.name} className="relative flex gap-3.5 items-start">
            {/* Step node */}
            <div className="absolute -left-[17px] w-3 h-3 rounded-full bg-crowd-slate-950 border border-stadium-green-500 flex items-center justify-center z-10" />

            <div className="space-y-0.5">
              <span className="text-[9px] uppercase font-bold text-stadium-green-500 font-mono">
                Step {idx + 1}
              </span>
              <h4 className="text-xs font-bold text-slate-200">{wp.name}</h4>
              <p className="text-[10px] text-crowd-slate-400">
                Coordinates: ({wp.x}, {wp.y})
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
