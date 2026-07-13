import React from 'react'
import type { CrowdHeatmap } from '@/types/navigation'
import { Users, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'

interface CrowdHeatmapCardProps {
  heatmap: CrowdHeatmap[]
  onRefresh: () => void
}

export const CrowdHeatmapCard: React.FC<CrowdHeatmapCardProps> = ({ heatmap, onRefresh }) => {
  const getDensityColor = (density: number) => {
    if (density < 40)
      return 'text-stadium-green-400 bg-stadium-green-950/40 border-stadium-green-800'
    if (density < 75)
      return 'text-warning-orange-400 bg-warning-orange-950/40 border-warning-orange-800'
    return 'text-alert-red-400 bg-alert-red-950/40 border-alert-red-800'
  }

  const getDensityProgressColor = (density: number) => {
    if (density < 40) return 'bg-stadium-green-500'
    if (density < 75) return 'bg-warning-orange-500'
    return 'bg-alert-red-500'
  }

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col h-[350px]">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Users className="w-4 h-4 text-stadium-green-400" />
          Crowd Intelligence Heatmap
        </h3>
        <button
          onClick={onRefresh}
          className="text-crowd-slate-450 hover:text-slate-200 transition-colors p-1"
          aria-label="Refresh heatmap logs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
        {heatmap.map((item) => (
          <div key={item.sectorId} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-200">{item.sectorName}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-crowd-slate-400">
                  {item.trendFlowStatus === 'Increasing' ? (
                    <TrendingUp className="w-3 h-3 text-alert-red-400 inline mr-0.5" />
                  ) : item.trendFlowStatus === 'Decreasing' ? (
                    <TrendingDown className="w-3 h-3 text-stadium-green-400 inline mr-0.5" />
                  ) : null}
                  {item.trendFlowStatus}
                </span>
                <span
                  className={`text-[9px] border px-1.5 py-0.5 rounded font-semibold ${getDensityColor(item.densityPercentage)}`}
                >
                  {item.densityPercentage}%
                </span>
              </div>
            </div>

            <div className="w-full h-1.5 bg-crowd-slate-900 rounded-full overflow-hidden">
              <div
                className={`h-full ${getDensityProgressColor(item.densityPercentage)} transition-all duration-500`}
                style={{ width: `${item.densityPercentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
