import React from 'react'
import { useToast } from '@/context/ToastContext'
import type { AICopilotGuidance } from '@/types/dashboard'

interface AICopilotHeroProps {
  guidance: AICopilotGuidance
}

export const AICopilotHero: React.FC<AICopilotHeroProps> = ({ guidance }) => {
  const { showToast } = useToast()

  const handleAccept = () => {
    showToast('AI tactical plan accepted. Notifying Lusail Operations Command Center.', 'success')
  }

  const handleViewRoute = () => {
    showToast('Routing overlay loaded. Displaying sector passage paths.', 'info')
  }

  const percentScore = Math.round(guidance.confidenceScore * 100)

  return (
    <div className="glass-panel border border-alert-red-500/15 p-6 rounded-2xl relative shadow-premium alert-glow-critical overflow-hidden animate-slide-up">
      {/* Simulation Banner Badge */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-alert-red-500 animate-pulse"></span>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100 font-mono">
            AI Copilot Tactical Intelligence
          </h2>
        </div>
        <span className="bg-energy-gold-500/10 border border-energy-gold-500/20 text-energy-gold-400 font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-semibold">
          Simulation Mode
        </span>
      </div>

      <div className="space-y-4">
        {/* Current Situation */}
        <div className="space-y-1">
          <span className="text-[10px] text-alert-red-400 font-bold uppercase tracking-wider">
            Current Situation
          </span>
          <p className="text-sm text-slate-200 font-medium leading-relaxed">{guidance.situation}</p>
        </div>

        {/* AI Reasoning Panel */}
        <div className="bg-black/30 rounded-xl p-3.5 border border-white/5 space-y-1 text-left">
          <span className="text-[10px] text-stadium-green-400 font-bold uppercase tracking-wider">
            AI Cognitive Reasoning
          </span>
          <p className="text-xs text-crowd-slate-350 leading-relaxed font-mono">
            {guidance.reasoning}
          </p>
        </div>

        {/* Risk Level & Target Gate */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-crowd-slate-400 font-semibold uppercase tracking-wider">
              Operational Risk
            </span>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-alert-red-500"></span>
              <span className="text-xs font-bold text-alert-red-400 uppercase">
                {guidance.operationalRisk.split(' - ')[0]}
              </span>
            </div>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-[10px] text-crowd-slate-400 font-semibold uppercase tracking-wider">
              Sector Location
            </span>
            <span className="block text-xs font-bold text-slate-200">
              {guidance.targetLocation}
            </span>
          </div>
        </div>

        {/* Recommended Action & Expected Outcome */}
        <div className="border-t border-white/5 pt-4 space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] text-stadium-green-400 font-bold uppercase tracking-wider">
              Recommended Action Directive
            </span>
            <p className="text-sm text-slate-100 font-semibold leading-normal">
              {guidance.recommendedAction}
            </p>
          </div>

          <div className="space-y-1 bg-stadium-green-950/10 border border-stadium-green-950/30 rounded-xl p-3 text-left">
            <span className="text-[10px] text-stadium-green-500 font-bold uppercase tracking-wider">
              Expected Outcome Forecast
            </span>
            <p className="text-xs text-slate-300 leading-normal">{guidance.expectedOutcome}</p>
          </div>
        </div>

        {/* Confidence Score progress */}
        <div className="flex items-center space-x-4 border-t border-white/5 pt-4">
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-crowd-slate-450 uppercase text-[10px] tracking-wider">
                Reasoning Reliability
              </span>
              <span className="text-stadium-green-400 font-mono font-bold">{percentScore}%</span>
            </div>
            <div className="h-2 bg-crowd-slate-900 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-stadium-green-600 to-stadium-green-400 shadow-hud-glow transition-all duration-1000"
                style={{ width: `${percentScore}%` }}
              ></div>
            </div>
            <div className="text-[9px] text-crowd-slate-500 uppercase tracking-widest text-left font-semibold">
              {guidance.confidenceDescriptor}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleAccept}
            className="py-2.5 px-4 rounded-lg bg-alert-red-650 hover:bg-alert-red-600 text-white font-semibold text-xs cursor-pointer shadow-premium transition-colors focus:outline-none focus:ring-1 focus:ring-alert-red-500 uppercase tracking-wider"
          >
            Accept Guidance
          </button>
          <button
            onClick={handleViewRoute}
            className="py-2.5 px-4 rounded-lg bg-crowd-slate-900 hover:bg-crowd-slate-800 border border-crowd-slate-800 text-slate-200 font-semibold text-xs cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-stadium-green-500 uppercase tracking-wider"
          >
            View Route
          </button>
        </div>
      </div>
    </div>
  )
}
