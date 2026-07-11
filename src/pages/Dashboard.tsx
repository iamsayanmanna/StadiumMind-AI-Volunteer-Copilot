import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/**
 * Volunteer Dashboard placeholder.
 * Accessible only by authenticated volunteers.
 */
const Dashboard: React.FC = () => {
  useDocumentTitle('Volunteer Dashboard')
  const { user } = useAuth()

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div className="glass-panel p-8 rounded-2xl hud-border-green relative overflow-hidden">
        {/* Glow background rings */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-stadium-green-600/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-energy-gold-600/5 rounded-full blur-2xl pointer-events-none"></div>

        <h2 className="text-2xl font-bold text-slate-100 mb-2">
          Welcome Back, {user?.name || 'Marshal'}
        </h2>
        <p className="text-sm text-crowd-slate-400 leading-relaxed mb-6">
          Your marshaling session is active for the sector:{' '}
          <strong className="text-slate-200">{user?.assignedSector}</strong>. Use this copilot to
          track gate congestion logs and access translation assists.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-panel-light p-4 rounded-xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stadium-green-500 mb-1">
              Active Integration Services
            </h3>
            <ul className="text-xs space-y-1.5 text-slate-350">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-stadium-green-500 mr-2"></span>
                Firebase Client App (Initialized)
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-stadium-green-500 mr-2"></span>
                Google GenAI SDK (Initialized client)
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-stadium-green-500 mr-2"></span>
                Tailwind CSS v4 (Compiling CSS-first directives)
              </li>
            </ul>
          </div>

          <div className="glass-panel-light p-4 rounded-xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-energy-gold-400 mb-1">
              Next Milestones (Roadmap)
            </h3>
            <ul className="text-xs space-y-1.5 text-slate-350">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-energy-gold-500 mr-2"></span>
                Setup Firestore & Crowd Report collections
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-energy-gold-500 mr-2"></span>
                Implement Gemini Crowd Density agent prompts
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-energy-gold-500 mr-2"></span>
                Implement translation & multilingual hooks
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
