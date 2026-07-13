import React from 'react'
import type { Route } from '@/types/navigation'
import { Navigation, Route as RouteIcon, ShieldAlert } from 'lucide-react'

interface SmartRouteCardProps {
  routes: Route[]
  selectedRouteId: string | null
  onSelect: (routeId: string) => void
}

export const SmartRouteCard: React.FC<SmartRouteCardProps> = ({
  routes,
  selectedRouteId,
  onSelect,
}) => {
  const getSafetyBadgeClass = (safety: Route['safetyLevel']) => {
    switch (safety) {
      case 'Safe':
        return 'bg-stadium-green-950/80 border-stadium-green-800 text-stadium-green-400'
      case 'Caution':
        return 'bg-warning-orange-950/80 border-warning-orange-800 text-warning-orange-400'
      default:
        return 'bg-alert-red-950/80 border-alert-red-800 text-alert-red-400'
    }
  }

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col h-[380px]">
      <div className="border-b border-white/5 pb-3">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <RouteIcon className="w-4 h-4 text-stadium-green-500" />
          Tactical Navigation Routes
        </h3>
        <p className="text-[10px] text-crowd-slate-450 uppercase tracking-wider">
          AI Suggested Routing
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        {routes.map((route) => {
          const isSelected = route.routeId === selectedRouteId
          return (
            <div
              key={route.routeId}
              onClick={() => onSelect(route.routeId)}
              className={`p-4 rounded-xl border transition-all cursor-pointer hover:bg-white/5 flex flex-col gap-2 ${
                isSelected
                  ? 'bg-white/5 border-stadium-green-500/50 shadow-premium'
                  : 'bg-white/[0.01] border-white/5'
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <h4 className="text-xs font-bold text-slate-100 leading-snug">{route.name}</h4>
                <span
                  className={`text-[9px] border px-1.5 py-0.5 rounded font-semibold whitespace-nowrap ${getSafetyBadgeClass(
                    route.safetyLevel
                  )}`}
                >
                  {route.safetyLevel}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] text-crowd-slate-400">
                <span className="flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-crowd-slate-500" />
                  Distance: <strong className="text-slate-200">{route.distance}</strong>
                </span>
                <span>
                  Est. Time:{' '}
                  <strong className="text-stadium-green-400">{route.estimatedTravelTime}</strong>
                </span>
              </div>

              {route.hazards.length > 0 && (
                <div className="mt-1 flex items-start gap-1.5 bg-warning-orange-950/20 border border-warning-orange-900/20 p-2 rounded-lg text-[9px] text-warning-orange-400">
                  <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{route.hazards[0].description}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
