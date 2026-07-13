import React from 'react'
import type { GateMetric } from '@/types/dashboard'

interface CrowdStatusCardProps {
  metrics: GateMetric[]
}

export const CrowdStatusCard: React.FC<CrowdStatusCardProps> = ({ metrics }) => {
  const trendSymbols = {
    increasing: { symbol: '▲', color: 'text-alert-red-400 font-bold' },
    stable: { symbol: '■', color: 'text-crowd-slate-500 font-medium' },
    decreasing: { symbol: '▼', color: 'text-stadium-green-400 font-bold' },
  }

  const riskColors = {
    low: 'bg-stadium-green-950/40 border border-stadium-green-800/40 text-stadium-green-400',
    medium: 'bg-warning-orange-950/45 border border-warning-orange-800/40 text-warning-orange-400',
    high: 'bg-alert-red-950/40 border border-alert-red-800/40 text-alert-red-400',
    critical: 'bg-alert-red-950/60 border border-alert-red-700 text-alert-red-500 animate-pulse',
  }

  return (
    <div className="glass-panel p-5 rounded-2xl space-y-4 shadow-premium relative overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-crowd-slate-400">
          Sector Gate Crowd status Metrics
        </h3>
        <span className="text-[10px] text-stadium-green-500 font-bold uppercase font-mono">
          Live Sensor Logs
        </span>
      </div>

      {/* Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[280px]">
          <thead>
            <tr className="border-b border-white/5 text-[9px] uppercase tracking-wider text-crowd-slate-500 font-semibold">
              <th className="py-2 pr-2">Gate ID</th>
              <th className="py-2 px-2 text-center">Density (%)</th>
              <th className="py-2 px-2 text-center">Queue size</th>
              <th className="py-2 px-2 text-center">Flow Trend</th>
              <th className="py-2 pl-2 text-right">Risk Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs text-slate-200">
            {metrics.map((m) => {
              const trendObj = trendSymbols[m.trend]
              return (
                <tr key={m.gateName} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 pr-2 font-semibold font-mono text-slate-100">{m.gateName}</td>
                  <td className="py-3 px-2 text-center font-mono font-medium">
                    {m.densityPercent}%
                  </td>
                  <td className="py-3 px-2 text-center font-mono">{m.queueLength}</td>
                  <td className="py-3 px-2 text-center font-mono">
                    <span className={`inline-flex items-center space-x-1 ${trendObj.color}`}>
                      <span>{trendObj.symbol}</span>
                      <span className="text-[10px] uppercase font-sans tracking-wide">
                        {m.trend}
                      </span>
                    </span>
                  </td>
                  <td className="py-3 pl-2 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold ${riskColors[m.riskLevel]}`}
                    >
                      {m.riskLevel}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
