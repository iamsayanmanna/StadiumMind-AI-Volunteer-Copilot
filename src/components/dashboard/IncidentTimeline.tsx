import React from 'react'
import type { IncidentStatus } from '@/types/incident'
import { Check } from 'lucide-react'

interface IncidentTimelineProps {
  status: IncidentStatus
}

interface TimelineStep {
  status: IncidentStatus
  label: string
  description: string
}

export const IncidentTimeline: React.FC<IncidentTimelineProps> = ({ status }) => {
  const steps: TimelineStep[] = [
    {
      status: 'Reported',
      label: 'Incident Created',
      description: 'Incident log created by Sector Marshal and queued in system.',
    },
    {
      status: 'Analyzing',
      label: 'AI Analyzed',
      description: 'StadiumMind AI processed description and suggested response protocols.',
    },
    {
      status: 'Assigned',
      label: 'Incident Assigned',
      description: 'Response marshals or field medical units dispatched to location.',
    },
    {
      status: 'Resolved',
      label: 'Incident Resolved',
      description: 'Sector clear. Case resolved and closed in active logs.',
    },
  ]

  const getStatusIndex = (currentStatus: IncidentStatus) => {
    switch (currentStatus) {
      case 'Reported':
        return 0
      case 'Analyzing':
        return 1
      case 'Assigned':
        return 2
      case 'Resolved':
        return 3
      default:
        return 0
    }
  }

  const activeIndex = getStatusIndex(status)

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col h-[400px]">
      <div className="border-b border-white/5 pb-3">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          Case Resolution Timeline
        </h3>
        <p className="text-[10px] text-crowd-slate-450 mt-0.5 uppercase tracking-wider">
          TACTICAL LIFECYCLE TRACKING
        </p>
      </div>

      <div className="flex-1 relative pl-6 space-y-6 pt-2">
        {/* Vertical line connector */}
        <div className="absolute left-2.5 top-4 bottom-8 w-0.5 bg-crowd-slate-800" />

        {steps.map((step, idx) => {
          const isCompleted = idx < activeIndex || status === 'Resolved'
          const isActive = idx === activeIndex && status !== 'Resolved'
          const isPending = idx > activeIndex && status !== 'Resolved'

          return (
            <div key={step.status} className="relative flex gap-4 items-start select-none">
              {/* Step indicator node */}
              <div
                className={`absolute -left-5 w-5 h-5 rounded-full flex items-center justify-center border transition-all z-10 ${
                  isCompleted
                    ? 'bg-stadium-green-600 border-stadium-green-600 text-white'
                    : isActive
                      ? 'bg-crowd-slate-950 border-warning-orange-500 text-warning-orange-500 animate-pulse'
                      : 'bg-crowd-slate-950 border-crowd-slate-800 text-crowd-slate-600'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3 h-3" />
                ) : isActive ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-warning-orange-500" />
                ) : (
                  <span className="w-1 h-1 rounded-full bg-crowd-slate-700" />
                )}
              </div>

              {/* Text content details */}
              <div className="space-y-0.5">
                <h4
                  className={`text-xs font-bold transition-colors ${
                    isActive
                      ? 'text-warning-orange-400'
                      : isCompleted
                        ? 'text-slate-200'
                        : 'text-crowd-slate-500'
                  }`}
                >
                  {step.label}
                </h4>
                <p
                  className={`text-[10px] leading-relaxed transition-colors ${
                    isPending ? 'text-crowd-slate-600' : 'text-crowd-slate-400'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
