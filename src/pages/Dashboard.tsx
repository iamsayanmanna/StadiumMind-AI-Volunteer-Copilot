import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import {
  AICopilotHero,
  VolunteerProfileCard,
  CurrentAssignmentCard,
  CrowdStatusCard,
  QuickActions,
  NotificationsCard,
} from '@/components/dashboard'
import {
  MOCK_COPILOT_GUIDANCE,
  MOCK_ASSIGNMENT,
  MOCK_GATE_METRICS,
  MOCK_NOTIFICATIONS,
} from '@/constants/mockDashboard'

/**
 * Volunteer Operations Dashboard console.
 * Displays real-time tactical crowd assessments, assignment controls, and AI guidance feeds.
 */
const Dashboard: React.FC = () => {
  useDocumentTitle('Volunteer Dashboard')
  const { user } = useAuth()

  // Fallback profile if user is not fully loaded
  const profile = user || {
    uid: 'mock-vol-104',
    name: 'Lusail Gate Marshal',
    role: 'volunteer',
    assignedSector: 'Lusail Sector C - Gate D',
    languages: ['English', 'Arabic', 'French'],
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Console Top Header area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-4 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            <span>StadiumMind Operations HUD</span>
            <span className="text-[10px] bg-stadium-green-950 text-stadium-green-400 border border-stadium-green-800 px-2 py-0.5 rounded font-mono uppercase tracking-widest font-bold">
              Lusail Center
            </span>
          </h2>
          <p className="text-xs text-crowd-slate-400 mt-1">
            Real-time AI-powered tactical console for tournament marshals.
          </p>
        </div>
        <div className="text-right text-xs font-mono text-crowd-slate-450 hidden md:block">
          <div>SYS STATUS: ACTIVE</div>
          <div>LUSAIL LOC: 25.4208° N, 51.4908° E</div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Column 1: AI Hero and Active Task (Span 7 on large screen) */}
        <div className="lg:col-span-7 space-y-6">
          <AICopilotHero guidance={MOCK_COPILOT_GUIDANCE} />
          <CurrentAssignmentCard assignment={MOCK_ASSIGNMENT} />
        </div>

        {/* Column 2: Crowd Status & Quick Actions (Span 5 on large screen) */}
        <div className="lg:col-span-5 space-y-6">
          <CrowdStatusCard metrics={MOCK_GATE_METRICS} />
          <QuickActions />
        </div>
      </div>

      {/* Grid Layout Row 2: Profile & Operational Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* Profile Card (Span 5 on large screen) */}
        <div className="lg:col-span-5">
          <VolunteerProfileCard profile={profile} />
        </div>

        {/* Alerts Card (Span 7 on large screen) */}
        <div className="lg:col-span-7">
          <NotificationsCard notifications={MOCK_NOTIFICATIONS} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
