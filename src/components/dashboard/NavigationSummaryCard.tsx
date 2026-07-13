import React from 'react'
import type { NavigationRecommendation } from '@/types/navigation'
import { Sparkles, Check, Play } from 'lucide-react'

interface NavigationSummaryCardProps {
  recommendation: NavigationRecommendation | null
  onStartNavigation: () => void
  onCompleteNavigation: () => void
  isNavigating: boolean
}

export const NavigationSummaryCard: React.FC<NavigationSummaryCardProps> = ({
  recommendation,
  onStartNavigation,
  onCompleteNavigation,
  isNavigating,
}) => {
  if (!recommendation) {
    return (
      <div className="glass-panel p-6 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center h-[380px] text-crowd-slate-500 text-xs">
        <Sparkles className="w-8 h-8 opacity-40 text-crowd-slate-500 mb-3" />
        Choose destination path to display safety recommendations.
      </div>
    )
  }

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col h-[380px] justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-stadium-green-500/5 blur-3xl pointer-events-none" />

      <div className="space-y-3.5">
        {/* Header */}
        <div className="border-b border-white/5 pb-3">
          <span className="text-[9px] bg-stadium-green-950/80 border border-stadium-green-800 text-stadium-green-400 px-2 py-0.5 rounded font-mono uppercase font-bold tracking-wide">
            🤖 Routing Telemetry
          </span>
          <h3 className="text-base font-bold text-slate-100 mt-1.5 flex items-center gap-2">
            AI Safety Directives
          </h3>
        </div>

        {/* Action Directives */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-crowd-slate-500">
            Action Directives
          </span>
          <ul className="space-y-1">
            {recommendation.actionDirectives.map((dir, idx) => (
              <li key={idx} className="text-xs text-slate-200 font-medium flex items-start gap-1.5">
                <span className="text-stadium-green-400 font-bold">•</span>
                <span>{dir}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* AI Reasoning */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-3 space-y-1.5">
          <span className="text-[9px] font-bold text-stadium-green-400 uppercase tracking-widest">
            AI Tactical Reasoning
          </span>
          <p className="text-[10px] text-slate-300 leading-normal">
            {recommendation.reasoningDetails}
          </p>
        </div>

        {/* Reliability indicator */}
        <div className="flex justify-between items-center text-[10px] text-crowd-slate-400">
          <span>Guidance Confidence Index:</span>
          <strong className="text-slate-200">{recommendation.reliabilityPercentage}% Match</strong>
        </div>
      </div>

      {/* Button Controls */}
      <div className="pt-3 border-t border-white/5">
        {isNavigating ? (
          <button
            onClick={onCompleteNavigation}
            className="w-full py-2.5 rounded-lg text-xs font-bold bg-stadium-green-600 hover:bg-stadium-green-500 text-white focus:outline-none focus:ring-1 focus:ring-stadium-green-400 transition-all flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            Complete Navigation Route
          </button>
        ) : (
          <button
            onClick={onStartNavigation}
            className="w-full py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all flex items-center justify-center gap-1.5"
          >
            <Play className="w-4 h-4 fill-current" />
            Start Session Route
          </button>
        )}
      </div>
    </div>
  )
}
