import React from 'react'
import type { VolunteerProfile } from '@/types'

interface VolunteerProfileCardProps {
  profile: VolunteerProfile
}

export const VolunteerProfileCard: React.FC<VolunteerProfileCardProps> = ({ profile }) => {
  return (
    <div className="glass-panel p-5 rounded-2xl space-y-4 shadow-premium relative overflow-hidden animate-slide-up">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-crowd-slate-400">
          Volunteer Marshal Profile
        </h3>
        <span className="flex items-center space-x-1 bg-stadium-green-950/80 border border-stadium-green-800 px-2 py-0.5 rounded-full text-[9px] text-stadium-green-400 font-semibold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-stadium-green-500 animate-pulse"></span>
          <span>Active Duty</span>
        </span>
      </div>

      {/* Profile Specs */}
      <div className="space-y-3.5">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-stadium-green-600 to-energy-gold-500 flex items-center justify-center font-bold text-white shadow-hud-glow">
            {profile.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">{profile.name}</h4>
            <p className="text-[10px] text-crowd-slate-450 font-mono tracking-wider">
              ID: {profile.uid.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3 text-xs">
          <div>
            <span className="block text-[9px] text-crowd-slate-450 uppercase tracking-wider">
              Assigned Zone
            </span>
            <span className="font-semibold text-slate-200">{profile.assignedSector}</span>
          </div>
          <div>
            <span className="block text-[9px] text-crowd-slate-450 uppercase tracking-wider">
              Shift Duration
            </span>
            <span className="font-semibold text-slate-200">10:00 - 18:00 AST</span>
          </div>
        </div>

        {/* Languages HUD */}
        <div className="border-t border-white/5 pt-3 space-y-1">
          <span className="text-[9px] text-crowd-slate-455 uppercase tracking-wider block">
            Multilingual Support Profile
          </span>
          <div className="flex flex-wrap gap-1.5">
            {profile.languages.map((lang) => (
              <span
                key={lang}
                className="bg-crowd-slate-900 border border-crowd-slate-800 text-crowd-slate-350 text-[10px] px-2 py-0.5 rounded"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
