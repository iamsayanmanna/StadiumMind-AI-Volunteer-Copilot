import React from 'react'
import type { Route, Waypoint, RouteHazard, EmergencyRoute } from '@/types/navigation'
import { Map, Zap } from 'lucide-react'

interface NavigationMapCardProps {
  selectedRoute: Route | null
  activeLocation: Waypoint
  destination: Waypoint | null
  emergencyMode: boolean
  emergencyRoute: EmergencyRoute | null
  hazards: RouteHazard[]
}

export const NavigationMapCard: React.FC<NavigationMapCardProps> = ({
  selectedRoute,
  activeLocation,
  destination,
  emergencyMode,
  emergencyRoute,
  hazards,
}) => {
  // Map dimensions (coordinate grid is 0-100)
  const mapWidth = 400
  const mapHeight = 300

  const getSvgCoords = (wp: Waypoint) => {
    // Map coordinate space 0-100 to SVG viewbox
    const pxX = (wp.x / 100) * mapWidth
    const pxY = (1 - wp.y / 100) * mapHeight // Flip Y axis for standard cartesian grid
    return { x: pxX, y: pxY }
  }

  // Draw selected route line path
  const renderRoutePath = () => {
    if (emergencyMode && emergencyRoute) {
      const points = emergencyRoute.safeExitWaypoints.map((wp) => getSvgCoords(wp))
      const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
      return (
        <path
          d={pathData}
          fill="none"
          stroke="#ef4444"
          strokeWidth="3.5"
          strokeDasharray="6,4"
          className="animate-pulse"
        />
      )
    }

    if (!selectedRoute) return null
    const points = selectedRoute.waypoints.map((wp) => getSvgCoords(wp))
    const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

    const strokeColor =
      selectedRoute.safetyLevel === 'Safe'
        ? '#22c55e'
        : selectedRoute.safetyLevel === 'Caution'
          ? '#f97316'
          : '#ef4444'

    return (
      <path
        d={pathData}
        fill="none"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-500"
      />
    )
  }

  const volunteerCoords = getSvgCoords(activeLocation)
  const destCoords = destination ? getSvgCoords(destination) : null

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col min-h-[380px]">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Map className="w-4 h-4 text-stadium-green-400" />
          Live Tactical Sector Map
        </h3>
        <span className="text-[9px] bg-crowd-slate-900 border border-crowd-slate-800 text-crowd-slate-400 px-2 py-0.5 rounded font-mono uppercase font-bold">
          LUSAIL GRID G-12
        </span>
      </div>

      {/* Grid Canvas area */}
      <div className="relative w-full h-[220px] bg-crowd-slate-950/80 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
        {/* Background stadium grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:20px_20px] opacity-45 pointer-events-none" />

        {/* Stadium outline graphics overlay */}
        <svg
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
        >
          {/* Outer Stadium wall representation */}
          <rect
            x="10"
            y="10"
            width={mapWidth - 20}
            height={mapHeight - 20}
            rx="40"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2"
            strokeDasharray="4,4"
          />

          {/* Central Pitch Circle representation */}
          <circle
            cx={mapWidth / 2}
            cy={mapHeight / 2}
            r="45"
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.5"
          />

          {/* Active Navigation Route Paths */}
          {renderRoutePath()}

          {/* Render Route Hazards */}
          {hazards.map((haz) => {
            const coords = getSvgCoords(haz.affectedWaypoint)
            return (
              <g key={haz.hazardId} className="animate-pulse">
                <circle cx={coords.x} cy={coords.y} r="8" fill="#ef4444" fillOpacity="0.15" />
                <circle cx={coords.x} cy={coords.y} r="3" fill="#ef4444" />
              </g>
            )
          })}

          {/* Volunteer Current Position Node */}
          <g>
            <circle
              cx={volunteerCoords.x}
              cy={volunteerCoords.y}
              r="9"
              fill="#22c55e"
              fillOpacity="0.25"
              className="animate-ping"
            />
            <circle cx={volunteerCoords.x} cy={volunteerCoords.y} r="4" fill="#22c55e" />
          </g>

          {/* Destination Location Node */}
          {destCoords && (
            <g>
              <circle
                cx={destCoords.x}
                cy={destCoords.y}
                r="9"
                fill={emergencyMode ? '#ef4444' : '#3b82f6'}
                fillOpacity="0.25"
                className="animate-ping"
              />
              <circle
                cx={destCoords.x}
                cy={destCoords.y}
                r="4"
                fill={emergencyMode ? '#ef4444' : '#3b82f6'}
              />
            </g>
          )}
        </svg>

        {/* Legend overlays */}
        <div className="absolute bottom-2.5 left-2.5 bg-black/60 border border-white/5 rounded-lg p-2 flex flex-col gap-1 text-[9px] text-crowd-slate-350">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-stadium-green-500" />
            <span>Volunteer Position</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Destination</span>
          </div>
          {hazards.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Route Hazard</span>
            </div>
          )}
          {emergencyMode && (
            <div className="flex items-center gap-1.5 text-alert-red-400 font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>Emergency Waypoint</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
