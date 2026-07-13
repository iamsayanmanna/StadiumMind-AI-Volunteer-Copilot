import React, { useState } from 'react'
import { useToast } from '@/context/ToastContext'
import type { AssignmentDetail } from '@/types/dashboard'

interface CurrentAssignmentCardProps {
  assignment: AssignmentDetail
}

export const CurrentAssignmentCard: React.FC<CurrentAssignmentCardProps> = ({ assignment }) => {
  const { showToast } = useToast()
  const [status, setStatus] = useState<AssignmentDetail['status']>(assignment.status)

  const handleComplete = () => {
    setStatus('completed')
    showToast('Assignment logged as COMPLETED. Notifying sector lead.', 'success')
  }

  const priorityColors = {
    low: 'text-crowd-slate-400 bg-crowd-slate-900 border-crowd-slate-800',
    medium: 'text-warning-orange-400 bg-warning-orange-950/20 border-warning-orange-900/35',
    high: 'text-alert-red-400 bg-alert-red-950/20 border-alert-red-900/35',
    critical: 'text-alert-red-500 bg-alert-red-950/40 border-alert-red-900/50 animate-pulse',
  }

  return (
    <div className="glass-panel p-5 rounded-2xl space-y-4 shadow-premium relative overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-crowd-slate-400">
          Active Assignment Task
        </h3>
        <span
          className={`px-2 py-0.5 border rounded-full text-[9px] uppercase tracking-wider font-semibold ${priorityColors[assignment.priority]}`}
        >
          {assignment.priority} Priority
        </span>
      </div>

      {/* Task Details */}
      <div className="space-y-4">
        <div>
          <span className="text-[9px] text-crowd-slate-450 uppercase tracking-wider block">
            Objective directive
          </span>
          <p
            className={`text-sm font-semibold leading-normal ${status === 'completed' ? 'line-through text-crowd-slate-500' : 'text-slate-100'}`}
          >
            {assignment.task}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs border-t border-white/5 pt-3">
          <div>
            <span className="block text-[9px] text-crowd-slate-450 uppercase tracking-wider">
              Deployment Area
            </span>
            <span className="font-bold text-slate-200">{assignment.targetGate}</span>
          </div>
          <div>
            <span className="block text-[9px] text-crowd-slate-450 uppercase tracking-wider">
              Target ETA Response
            </span>
            <span className="font-mono font-bold text-stadium-green-400">
              {status === 'completed' ? '--' : `Under ${assignment.etaMinutes} mins`}
            </span>
          </div>
        </div>

        {/* Complete Trigger button */}
        <div className="border-t border-white/5 pt-3">
          {status === 'completed' ? (
            <div className="w-full text-center py-2 px-4 rounded-lg bg-stadium-green-950/20 border border-stadium-green-900/30 text-stadium-green-400 text-xs font-semibold uppercase tracking-wider">
              ✓ Task Logged Completed
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="w-full py-2.5 px-4 rounded-lg bg-stadium-green-600 hover:bg-stadium-green-500 text-white font-semibold text-xs cursor-pointer shadow-premium transition-colors focus:outline-none focus:ring-1 focus:ring-stadium-green-500 uppercase tracking-wider"
            >
              Mark Completed
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
