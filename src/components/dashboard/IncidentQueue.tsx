import React, { useState } from 'react'
import type { Incident, IncidentStatus } from '@/types/incident'
import { AlertCircle, Clock, MapPin, CheckCircle2 } from 'lucide-react'

interface IncidentQueueProps {
  incidents: Incident[]
  selectedId: string | null
  onSelect: (incident: Incident) => void
}

type FilterType = 'All' | 'Active' | 'Assigned' | 'Resolved'

export const IncidentQueue: React.FC<IncidentQueueProps> = ({
  incidents,
  selectedId,
  onSelect,
}) => {
  const [filter, setFilter] = useState<FilterType>('All')

  const filteredIncidents = incidents.filter((inc) => {
    if (filter === 'All') return true
    if (filter === 'Active') return inc.status === 'Reported' || inc.status === 'Analyzing'
    if (filter === 'Assigned') return inc.status === 'Assigned'
    if (filter === 'Resolved') return inc.status === 'Resolved'
    return true
  })

  const getPriorityBadgeClass = (priority: Incident['priority']) => {
    switch (priority) {
      case 'Critical':
        return 'bg-alert-red-950/80 border-alert-red-800 text-alert-red-400'
      case 'High':
        return 'bg-warning-orange-950/80 border-warning-orange-800 text-warning-orange-400'
      case 'Medium':
        return 'bg-blue-950/80 border-blue-800 text-blue-400'
      default:
        return 'bg-crowd-slate-900 border-crowd-slate-700 text-crowd-slate-400'
    }
  }

  const getStatusIcon = (status: IncidentStatus) => {
    switch (status) {
      case 'Resolved':
        return <CheckCircle2 className="w-3.5 h-3.5 text-stadium-green-400" />
      case 'Assigned':
        return <Clock className="w-3.5 h-3.5 text-blue-400" />
      case 'Analyzing':
        return <AlertCircle className="w-3.5 h-3.5 text-warning-orange-400 animate-pulse" />
      default:
        return <AlertCircle className="w-3.5 h-3.5 text-slate-450" />
    }
  }

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col h-[400px]">
      {/* Header and Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/5 pb-3">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          Active Operations Queue
          <span className="text-[10px] bg-crowd-slate-900 border border-crowd-slate-700 px-1.5 py-0.5 rounded font-mono text-crowd-slate-400">
            {incidents.length}
          </span>
        </h3>

        {/* Filter controls */}
        <div className="flex gap-1 bg-crowd-slate-950 border border-crowd-slate-800 p-0.5 rounded-lg self-start sm:self-auto">
          {(['All', 'Active', 'Assigned', 'Resolved'] as FilterType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
                filter === tab
                  ? 'bg-stadium-green-600 text-white shadow-sm'
                  : 'text-crowd-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Incident List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {filteredIncidents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-crowd-slate-500 py-8">
            <CheckCircle2 className="w-8 h-8 opacity-40 mb-2" />
            <p className="text-xs font-semibold">Queue Clear</p>
            <p className="text-[10px] text-crowd-slate-650">
              No incidents match this status filter.
            </p>
          </div>
        ) : (
          filteredIncidents.map((incident) => {
            const isSelected = incident.id === selectedId
            return (
              <div
                key={incident.id}
                onClick={() => onSelect(incident)}
                className={`p-3 rounded-xl border transition-all cursor-pointer hover:bg-white/5 flex flex-col justify-between gap-2.5 ${
                  isSelected
                    ? 'bg-white/5 border-stadium-green-500/50 shadow-premium'
                    : 'bg-white/[0.01] border-white/5'
                }`}
              >
                {/* ID & Priority Header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(incident.status)}
                    <span className="text-xs font-bold text-slate-100 font-mono">
                      {incident.id}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] border px-1.5 py-0.5 rounded-md font-semibold tracking-wide ${getPriorityBadgeClass(
                      incident.priority
                    )}`}
                  >
                    {incident.priority}
                  </span>
                </div>

                {/* Location & Text details */}
                <p className="text-xs text-slate-350 line-clamp-2 leading-relaxed">
                  {incident.description}
                </p>

                {/* Footer metadata */}
                <div className="flex justify-between items-center text-[10px] text-crowd-slate-400 pt-1 border-t border-white/[0.03]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-crowd-slate-500" />
                    {incident.location}
                  </span>
                  <span>
                    {new Date(incident.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
