import React from 'react'
import type { NotificationItem } from '@/types/dashboard'

interface NotificationsCardProps {
  notifications: NotificationItem[]
}

export const NotificationsCard: React.FC<NotificationsCardProps> = ({ notifications }) => {
  const typeLabels = {
    crowd_alert: '🚨 Crowd Alert',
    medical_request: '🏥 Medical Request',
    translation_needed: '🗣️ Translation Assist',
    security_update: '🛡️ Security Update',
  }

  const severityColors = {
    low: 'text-crowd-slate-400 border-crowd-slate-800 bg-crowd-slate-950/20',
    medium: 'text-warning-orange-400 border-warning-orange-950/40 bg-warning-orange-950/25',
    high: 'text-alert-red-400 border-alert-red-950/40 bg-alert-red-950/25',
    critical: 'text-alert-red-500 border-alert-red-900 bg-alert-red-950/40 animate-pulse',
  }

  return (
    <div className="glass-panel p-5 rounded-2xl space-y-4 shadow-premium relative overflow-hidden animate-slide-up flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-crowd-slate-400">
          Tactical Operations Logs
        </h3>
        <span className="bg-alert-red-650/15 border border-alert-red-500/20 text-alert-red-400 font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold">
          {notifications.length} Alerts
        </span>
      </div>

      {/* Notifications Queue List */}
      <div className="space-y-3 overflow-y-auto max-h-[300px] flex-1 pr-1 scrollbar-thin">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-3 rounded-xl border flex flex-col gap-1.5 transition-all duration-150 hover:bg-white/5 ${severityColors[notif.severity]}`}
          >
            {/* Header row */}
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="uppercase tracking-wider">{typeLabels[notif.type]}</span>
              <span className="font-mono text-crowd-slate-450">{notif.timestamp}</span>
            </div>

            {/* Description */}
            <p className="text-[11px] leading-relaxed text-slate-200">{notif.message}</p>

            {/* Location footer */}
            <div className="flex items-center justify-between text-[9px] font-semibold text-crowd-slate-450 border-t border-white/5 pt-1.5">
              <span>Location: {notif.location}</span>
              <span className="uppercase tracking-widest">{notif.severity} threat</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
