import React from 'react'
import { Activity, Clock, ShieldCheck } from 'lucide-react'

export const SectorStatusCard: React.FC = () => {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col h-[350px] justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div className="border-b border-white/5 pb-3">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-stadium-green-400" />
            Sector Performance HUD
          </h3>
          <p className="text-[10px] text-crowd-slate-450 uppercase tracking-wider">
            Sector C - Gate D telemetry
          </p>
        </div>

        {/* Info stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-crowd-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stadium-green-400" />
              Avg. Queue Time
            </span>
            <div className="text-lg font-extrabold text-slate-100 font-mono">12 mins</div>
            <span className="text-[9px] text-stadium-green-400">Normal Flow</span>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-crowd-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Throughput Rate
            </span>
            <div className="text-lg font-extrabold text-slate-100 font-mono">55/min</div>
            <span className="text-[9px] text-crowd-slate-400">Gates operating stable</span>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-crowd-slate-500 leading-normal border-t border-white/5 pt-3">
        System telemetry updates every 15s. All validation protocols are verified by Lusail Gate
        Operations coordinator.
      </div>
    </div>
  )
}
