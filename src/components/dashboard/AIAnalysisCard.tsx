import React from 'react'
import type { IncidentAnalysis } from '@/types/incident'
import { Check, ShieldAlert, Zap, Loader2 } from 'lucide-react'

interface AIAnalysisCardProps {
  incidentId: string | null
  analysis: IncidentAnalysis | null
  isAnalyzing: boolean
  onAccept: () => void
  onEscalate: () => void
}

export const AIAnalysisCard: React.FC<AIAnalysisCardProps> = ({
  incidentId,
  analysis,
  isAnalyzing,
  onAccept,
  onEscalate,
}) => {
  if (!incidentId) {
    return (
      <div className="glass-panel p-6 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center min-h-[350px] text-crowd-slate-400">
        <ShieldAlert className="w-8 h-8 text-crowd-slate-500 mb-3 opacity-60" />
        <p className="text-sm font-semibold">No Incident Selected</p>
        <p className="text-xs text-crowd-slate-500 max-w-xs mt-1">
          Select a pending incident from the active queue to view automated AI telemetry analysis.
        </p>
      </div>
    )
  }

  if (isAnalyzing) {
    return (
      <div className="glass-panel p-6 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center min-h-[350px]">
        <Loader2 className="w-8 h-8 text-stadium-green-500 animate-spin mb-3" />
        <p className="text-sm font-bold text-slate-200">Executing Tactical Analysis...</p>
        <p className="text-xs text-crowd-slate-400 mt-1">
          StadiumMind AI is processing natural language incident description for ID {incidentId}.
        </p>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="glass-panel p-6 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center min-h-[350px] text-crowd-slate-400">
        <p className="text-sm">Analysis not generated yet.</p>
      </div>
    )
  }

  // Determine risk score bar colors
  const getRiskColor = (score: number) => {
    if (score < 40) return 'bg-stadium-green-500'
    if (score < 75) return 'bg-warning-orange-500'
    return 'bg-alert-red-500'
  }

  const getRiskText = (score: number) => {
    if (score < 40) return 'Low Risk'
    if (score < 75) return 'Moderate'
    return 'Critical Risk'
  }

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 text-left relative overflow-hidden flex flex-col justify-between min-h-[350px]">
      {/* Background glowing indicator */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-stadium-green-500/5 blur-3xl pointer-events-none" />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-white/5 pb-3">
          <div>
            <span className="text-[9px] bg-stadium-green-950/80 border border-stadium-green-800 text-stadium-green-400 px-2 py-0.5 rounded font-mono uppercase font-bold tracking-wide">
              🤖 AI Copilot Analysis
            </span>
            <h3 className="text-base font-bold text-slate-100 mt-1.5">
              Incident {incidentId} Assessment
            </h3>
          </div>
          <span className="text-[10px] bg-slate-800 border border-slate-700 text-slate-350 px-2 py-0.5 rounded font-mono">
            SIMULATION
          </span>
        </div>

        {/* Grid Analytics Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-crowd-slate-500">
              Suggested Category
            </span>
            <div className="text-xs font-bold text-slate-200">{analysis.category}</div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-crowd-slate-500">
              Confidence Index
            </span>
            <div className="text-xs font-bold text-slate-200">{analysis.confidence}%</div>
          </div>
        </div>

        {/* Risk Score indicator */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] uppercase font-bold text-crowd-slate-500">
            <span>Operational Risk Index</span>
            <span className="font-mono text-slate-200">
              {analysis.riskScore}/100 ({getRiskText(analysis.riskScore)})
            </span>
          </div>
          <div className="w-full h-1.5 bg-crowd-slate-900 rounded-full overflow-hidden">
            <div
              className={`h-full ${getRiskColor(analysis.riskScore)} transition-all duration-500`}
              style={{ width: `${analysis.riskScore}%` }}
            />
          </div>
        </div>

        {/* AI Actionable recommendation */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 space-y-2">
          <span className="text-[10px] font-bold text-stadium-green-400 uppercase tracking-widest flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            Response Directive
          </span>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {analysis.recommendation}
          </p>
          <div className="text-[10px] text-crowd-slate-400 font-medium pt-1">
            Est. Resolution window:{' '}
            <strong className="text-slate-200">{analysis.estimatedResolutionTime}</strong>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4 border-t border-white/5 mt-4">
        <button
          onClick={onEscalate}
          className="flex-1 px-4 py-2.5 rounded-lg text-xs font-bold bg-alert-red-950/30 border border-alert-red-900/40 text-alert-red-400 hover:bg-alert-red-900/20 focus:outline-none focus:ring-1 focus:ring-alert-red-500 transition-all flex items-center justify-center gap-1.5"
        >
          Escalate Case
        </button>

        <button
          onClick={onAccept}
          className="flex-1 px-4 py-2.5 rounded-lg text-xs font-bold bg-stadium-green-600 hover:bg-stadium-green-500 text-white focus:outline-none focus:ring-1 focus:ring-stadium-green-400 transition-all flex items-center justify-center gap-1.5"
        >
          <Check className="w-4 h-4" />
          Accept Guidance
        </button>
      </div>
    </div>
  )
}
