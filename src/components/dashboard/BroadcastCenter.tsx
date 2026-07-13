import React, { useState } from 'react'
import type { EmergencyBroadcast } from '@/types/communication'
import { Megaphone, AlertTriangle, Radio } from 'lucide-react'

interface BroadcastCenterProps {
  broadcasts: EmergencyBroadcast[]
  onSendBroadcast: (msg: string, sector: string, severity: 'Alert' | 'Critical') => void
}

export const BroadcastCenter: React.FC<BroadcastCenterProps> = ({
  broadcasts,
  onSendBroadcast,
}) => {
  const [msgText, setMsgText] = useState('')
  const [sector, setSector] = useState('All Sectors')
  const [severity, setSeverity] = useState<'Alert' | 'Critical'>('Alert')

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!msgText.trim()) return
    onSendBroadcast(msgText, sector, severity)
    setMsgText('')
  }

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col h-[350px] justify-between">
      <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-white/5 pb-3">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-stadium-green-400" />
            Tactical Broadcast Center
          </h3>
          <p className="text-[10px] text-crowd-slate-450 uppercase tracking-wider">
            Sector Announcements Dispatcher
          </p>
        </div>

        {/* Input dispatch form */}
        <form
          onSubmit={handleDispatch}
          className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end"
        >
          <div className="sm:col-span-6 space-y-1">
            <label className="block text-[10px] uppercase font-bold text-crowd-slate-500">
              Message Details
            </label>
            <input
              type="text"
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              placeholder="Type announcement..."
              className="w-full px-3 py-2 rounded-lg text-xs bg-crowd-slate-950 border border-crowd-slate-700 text-slate-100 placeholder-crowd-slate-500 focus:outline-none focus:border-stadium-green-500 focus:ring-1 focus:ring-stadium-green-500 transition-all"
            />
          </div>

          <div className="sm:col-span-3 space-y-1">
            <label className="block text-[10px] uppercase font-bold text-crowd-slate-500">
              Sector
            </label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full px-2.5 py-2 rounded-lg text-xs bg-crowd-slate-950 border border-crowd-slate-700 text-slate-100 focus:outline-none focus:border-stadium-green-500 focus:ring-1 focus:ring-stadium-green-500 transition-all"
            >
              <option value="All Sectors">All Sectors</option>
              <option value="Sector A">Sector A</option>
              <option value="Sector B">Sector B</option>
              <option value="Sector C">Sector C</option>
            </select>
          </div>

          <div className="sm:col-span-3 space-y-1">
            <label className="block text-[10px] uppercase font-bold text-crowd-slate-500">
              Severity
            </label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as 'Alert' | 'Critical')}
              className="w-full px-2.5 py-2 rounded-lg text-xs bg-crowd-slate-950 border border-crowd-slate-700 text-slate-100 focus:outline-none focus:border-stadium-green-500 focus:ring-1 focus:ring-stadium-green-500 transition-all"
            >
              <option value="Alert">Alert</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <button
            type="submit"
            className="sm:col-span-12 w-full py-2.5 rounded-lg text-xs font-bold bg-alert-red-650 hover:bg-alert-red-500 text-white focus:outline-none focus:ring-1 focus:ring-alert-red-500 transition-all flex items-center justify-center gap-1.5"
          >
            <Radio className="w-4 h-4" />
            Dispatch Broadcast Alert
          </button>
        </form>

        {/* List of active broadcasts */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {broadcasts.map((bc, idx) => (
            <div
              key={`${bc.broadcastId}-${idx}`}
              className={`p-3 rounded-xl border flex flex-col gap-1 ${
                bc.severity === 'Critical'
                  ? 'bg-alert-red-950/20 border-alert-red-900/30 text-slate-200'
                  : 'bg-white/[0.01] border-white/5 text-slate-200'
              }`}
            >
              <div className="flex justify-between items-center text-[9px] font-bold">
                <span className="flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-alert-red-500" />
                  {bc.scopeSector}
                </span>
                <span
                  className={
                    bc.severity === 'Critical' ? 'text-alert-red-400' : 'text-crowd-slate-450'
                  }
                >
                  {bc.severity}
                </span>
              </div>
              <p className="text-xs leading-relaxed">{bc.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
