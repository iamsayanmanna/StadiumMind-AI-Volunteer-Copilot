import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useToast } from '@/context/ToastContext'
import {
  AICopilotHero,
  VolunteerProfileCard,
  CurrentAssignmentCard,
  CrowdStatusCard,
  QuickActions,
  NotificationsCard,
  IncidentForm,
  AIAnalysisCard,
  IncidentQueue,
  IncidentTimeline,
} from '@/components/dashboard'
import {
  MOCK_COPILOT_GUIDANCE,
  MOCK_ASSIGNMENT,
  MOCK_GATE_METRICS,
  MOCK_NOTIFICATIONS,
} from '@/constants/mockDashboard'
import type { Incident, IncidentAnalysis } from '@/types/incident'
import { incidentService } from '@/services/incident'
import { Radio, Layers } from 'lucide-react'

/**
 * Volunteer Operations Dashboard console.
 * Integrates Sector Operations (Module 2.1) and Incident Dispatch (Module 2.2).
 */
const Dashboard: React.FC = () => {
  useDocumentTitle('Volunteer Dashboard')
  const { user } = useAuth()
  const { showToast } = useToast()

  const [activeTab, setActiveTab] = useState<'operations' | 'incidents'>('operations')

  // Incident Module States
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [currentAnalysis, setCurrentAnalysis] = useState<IncidentAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Fetch initial incidents list
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const list = await incidentService.getIncidents()
        setIncidents(list)
      } catch (err) {
        console.error('Failed to retrieve incidents list', err)
      }
    }
    fetchIncidents()
  }, [])

  // Event handler for selecting an incident and running/retrieving AI analysis
  const selectIncidentAndAnalyze = async (incident: Incident | null) => {
    setSelectedIncident(incident)
    if (!incident) {
      setCurrentAnalysis(null)
      return
    }

    if (incident.status === 'Reported') {
      setIsAnalyzing(true)
      showToast(`AI analysis initiated for incident ${incident.id}...`, 'info')
      try {
        const analysis = await incidentService.analyzeIncident(incident.id)
        setCurrentAnalysis(analysis)
        showToast(`AI analysis completed for incident ${incident.id}.`, 'success')

        // Re-fetch local cache to retrieve status changes
        const list = await incidentService.getIncidents()
        setIncidents(list)
        const updated = list.find((inc) => inc.id === incident.id)
        if (updated) {
          setSelectedIncident(updated)
        }
      } catch {
        showToast('Failed to analyze incident details.', 'error')
      } finally {
        setIsAnalyzing(false)
      }
    } else {
      try {
        const analysis = await incidentService.analyzeIncident(incident.id)
        setCurrentAnalysis(analysis)
      } catch {
        setCurrentAnalysis(null)
      }
    }
  }

  const handleIncidentSubmitted = (newIncident: Incident) => {
    setIncidents((prev) => [newIncident, ...prev])
    selectIncidentAndAnalyze(newIncident)
  }

  const handleAcceptRecommendation = async () => {
    if (!selectedIncident) return
    try {
      const updated = await incidentService.updateIncidentStatus(selectedIncident.id, 'Resolved')
      showToast(`Incident ${selectedIncident.id} resolved successfully.`, 'success')
      setIncidents((prev) => prev.map((inc) => (inc.id === selectedIncident.id ? updated : inc)))
      setSelectedIncident(updated)
    } catch {
      showToast('Failed to resolve incident.', 'error')
    }
  }

  const handleEscalateIncident = async () => {
    if (!selectedIncident) return
    showToast(`Incident ${selectedIncident.id} escalated to Command Center.`, 'warning')
  }

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
      {/* HUD Header area */}
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

        {/* Tab Selection Switcher */}
        <div className="flex bg-crowd-slate-950 border border-crowd-slate-800 p-1 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setActiveTab('operations')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 ${
              activeTab === 'operations'
                ? 'bg-stadium-green-600 text-white shadow-md'
                : 'text-crowd-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Sector Operations
          </button>
          <button
            onClick={() => setActiveTab('incidents')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 ${
              activeTab === 'incidents'
                ? 'bg-stadium-green-600 text-white shadow-md'
                : 'text-crowd-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            Incident Dispatch
          </button>
        </div>
      </div>

      {/* Main Tab Views */}
      {activeTab === 'operations' ? (
        <div className="space-y-6">
          {/* Main Grid Layout for Module 2.1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-slide-up">
            {/* Column 1: AI Hero and Active Task */}
            <div className="lg:col-span-7 space-y-6">
              <AICopilotHero guidance={MOCK_COPILOT_GUIDANCE} />
              <CurrentAssignmentCard assignment={MOCK_ASSIGNMENT} />
            </div>

            {/* Column 2: Crowd Status & Quick Actions */}
            <div className="lg:col-span-5 space-y-6">
              <CrowdStatusCard metrics={MOCK_GATE_METRICS} />
              <QuickActions />
            </div>
          </div>

          {/* Grid Layout Row 2: Profile & Operational Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5">
              <VolunteerProfileCard profile={profile} />
            </div>
            <div className="lg:col-span-7">
              <NotificationsCard notifications={MOCK_NOTIFICATIONS} />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-slide-up">
          {/* Grid Layout for Module 2.2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Left Column: Form & Queue */}
            <div className="lg:col-span-7 space-y-6">
              <IncidentForm onIncidentSubmitted={handleIncidentSubmitted} />
              <IncidentQueue
                incidents={incidents}
                selectedId={selectedIncident?.id || null}
                onSelect={(inc) => selectIncidentAndAnalyze(inc)}
              />
            </div>

            {/* Right Column: AI Analysis & Lifecycle timeline */}
            <div className="lg:col-span-5 space-y-6">
              <AIAnalysisCard
                incidentId={selectedIncident?.id || null}
                analysis={currentAnalysis}
                isAnalyzing={isAnalyzing}
                onAccept={handleAcceptRecommendation}
                onEscalate={handleEscalateIncident}
              />
              {selectedIncident && <IncidentTimeline status={selectedIncident.status} />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
