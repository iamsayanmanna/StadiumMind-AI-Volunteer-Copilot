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
  SmartRouteCard,
  NavigationMapCard,
  RouteOptionsPanel,
  CrowdHeatmapCard,
  SectorStatusCard,
  EmergencyRouteCard,
  NavigationTimeline,
  NavigationSummaryCard,
  CommunicationCenter,
  TranslatorCard,
  VoiceAssistantCard,
  BroadcastCenter,
  QuickResponsePanel,
} from '@/components/dashboard'
import {
  MOCK_COPILOT_GUIDANCE,
  MOCK_ASSIGNMENT,
  MOCK_GATE_METRICS,
  MOCK_NOTIFICATIONS,
} from '@/constants/mockDashboard'
import type { Incident, IncidentAnalysis } from '@/types/incident'
import type {
  Route,
  Waypoint,
  CrowdHeatmap,
  EmergencyRoute,
  NavigationRecommendation,
  NavigationSession,
} from '@/types/navigation'
import type {
  CommunicationMessage,
  EmergencyBroadcast,
  LanguageProfile,
  QuickResponseTemplate,
  VoiceCommunicationSession,
  TranslationResult,
} from '@/types/communication'
import { incidentService } from '@/services/incident'
import { navigationService, navigationAnalyzer } from '@/services/navigation'
import { communicationService } from '@/services/communication'
import { MOCK_VOLUNTEER_LOCATION, MOCK_DESTINATIONS } from '@/constants/mockNavigation'
import { SUPPORTED_LANGUAGES, MOCK_QUICK_RESPONSES } from '@/constants/mockCommunication'
import { Radio, Layers, Compass, MessageSquare } from 'lucide-react'

/**
 * Volunteer Operations Dashboard console.
 * Integrates Sector Operations (Module 2.1), Incident Dispatch (Module 2.2), AI Navigation (Module 2.3),
 * and AI Communication & Multilingual Assistant (Module 3.1).
 */
const Dashboard: React.FC = () => {
  useDocumentTitle('Volunteer Dashboard')
  const { user } = useAuth()
  const { showToast } = useToast()

  const [activeTab, setActiveTab] = useState<
    'operations' | 'incidents' | 'navigation' | 'communication'
  >('operations')

  // Incident Module States
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [currentAnalysis, setCurrentAnalysis] = useState<IncidentAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Navigation Module States
  const [destinations] = useState<Waypoint[]>(MOCK_DESTINATIONS)
  const [selectedDestination, setSelectedDestination] = useState<Waypoint | null>(
    MOCK_DESTINATIONS[0]
  )
  const [routes, setRoutes] = useState<Route[]>([])
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null)
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false)
  const [currentRecommendation, setCurrentRecommendation] =
    useState<NavigationRecommendation | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [activeSession, setActiveSession] = useState<NavigationSession | null>(null)
  const [emergencyMode, setEmergencyMode] = useState(false)
  const [emergencyRoute, setEmergencyRoute] = useState<EmergencyRoute | null>(null)
  const [heatmap, setHeatmap] = useState<CrowdHeatmap[]>([])

  // Communication Module States
  const [messages, setMessages] = useState<CommunicationMessage[]>([])
  const [broadcasts, setBroadcasts] = useState<EmergencyBroadcast[]>([])
  const [selectedTargetLang, setSelectedTargetLang] = useState('ar')
  const [languages] = useState<LanguageProfile[]>(SUPPORTED_LANGUAGES)
  const [quickResponses] = useState<QuickResponseTemplate[]>(MOCK_QUICK_RESPONSES)

  // Fetch initial incidents, crowd heatmaps, and communication feeds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const incList = await incidentService.getIncidents()
        setIncidents(incList)

        const mapData = await navigationService.getSectorCrowdHeatmap()
        setHeatmap(mapData)

        const commMsgs = await communicationService.getMessages()
        setMessages(commMsgs)

        const commBcs = await communicationService.getBroadcasts()
        setBroadcasts(commBcs)

        // Initial Route calculations
        if (MOCK_DESTINATIONS.length > 0) {
          const initialDest = MOCK_DESTINATIONS[0]
          setSelectedDestination(initialDest)

          const calculated = await navigationService.calculateSmartRoute(
            MOCK_VOLUNTEER_LOCATION.name,
            initialDest.name
          )
          setRoutes(calculated)
          if (calculated.length > 0) {
            setSelectedRouteId(calculated[0].routeId)
            const rec = await navigationAnalyzer.getNavigationRecommendation(
              MOCK_VOLUNTEER_LOCATION.name,
              initialDest.name
            )
            setCurrentRecommendation(rec)
          }
        }
      } catch (err) {
        console.error('Failed to retrieve initial dashboard details', err)
      }
    }
    fetchData()
  }, [])

  // Combined route update helper
  const updateNavigationRoutes = async (dest: Waypoint | null, isEmergency: boolean) => {
    if (isEmergency) {
      setIsCalculatingRoute(true)
      try {
        const emergencies = await navigationService.getActiveEmergencyRoutes()
        if (emergencies.length > 0) {
          const activeEmerg = emergencies[0]
          setEmergencyRoute(activeEmerg)
          setSelectedRouteId(null)
          setCurrentRecommendation(null)
          showToast('Emergency evacuation routing active!', 'warning')
        }
      } catch {
        showToast('Failed to trigger emergency routing.', 'error')
      } finally {
        setIsCalculatingRoute(false)
      }
      return
    }

    setEmergencyRoute(null)
    if (!dest) return

    setIsCalculatingRoute(true)
    try {
      const calculated = await navigationService.calculateSmartRoute(
        MOCK_VOLUNTEER_LOCATION.name,
        dest.name
      )
      setRoutes(calculated)
      if (calculated.length > 0) {
        const primaryRoute = calculated[0]
        setSelectedRouteId(primaryRoute.routeId)

        const rec = await navigationAnalyzer.getNavigationRecommendation(
          MOCK_VOLUNTEER_LOCATION.name,
          dest.name
        )
        setCurrentRecommendation(rec)
      } else {
        setSelectedRouteId(null)
        setCurrentRecommendation(null)
      }
    } catch {
      showToast('Failed to calculate navigation routes.', 'error')
    } finally {
      setIsCalculatingRoute(false)
    }
  }

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

  // Navigation Sessions
  const handleStartNavigation = async () => {
    if (!selectedRouteId || !selectedDestination) return
    try {
      const sess = await navigationService.startSession(
        profile.uid,
        MOCK_VOLUNTEER_LOCATION.name,
        selectedDestination.name,
        selectedRouteId
      )
      setActiveSession(sess)
      setIsNavigating(true)
      showToast('Navigation session started.', 'success')
    } catch {
      showToast('Failed to start navigation session.', 'error')
    }
  }

  const handleCompleteNavigation = async () => {
    if (!activeSession) return
    try {
      await navigationService.completeSession(activeSession.sessionId)
      setIsNavigating(false)
      setActiveSession(null)
      showToast('Navigation session completed. Destination reached.', 'success')
    } catch {
      showToast('Failed to complete navigation session.', 'error')
    }
  }

  const handleRefreshHeatmap = async () => {
    try {
      const mapData = await navigationService.getSectorCrowdHeatmap()
      setHeatmap(mapData)
      showToast('Crowd heatmap metrics updated.', 'success')
    } catch {
      showToast('Failed to refresh crowd heatmap.', 'error')
    }
  }

  // Communication Handlers
  const handleSendMessage = async (text: string) => {
    try {
      const msg = await communicationService.sendMessage({
        senderId: profile.uid,
        recipientId: 'coordinator-001',
        content: text,
        sourceLang: 'en',
        targetLang: selectedTargetLang,
      })
      setMessages((prev) => [...prev, msg])
      showToast('Message sent to dispatch coordinator.', 'success')
    } catch {
      showToast('Failed to dispatch communication message.', 'error')
    }
  }

  const handleQuickResponseSelect = async (temp: QuickResponseTemplate) => {
    try {
      const msg = await communicationService.sendMessage({
        senderId: profile.uid,
        recipientId: 'coordinator-001',
        content: temp.englishText,
        sourceLang: 'en',
        targetLang: selectedTargetLang,
      })
      setMessages((prev) => [...prev, msg])
      showToast('Quick response message dispatched.', 'success')
    } catch {
      showToast('Failed to dispatch quick response.', 'error')
    }
  }

  const handleSendBroadcast = async (msgText: string, scope: string, sev: 'Alert' | 'Critical') => {
    try {
      const bc = await communicationService.dispatchBroadcast({
        senderId: profile.uid,
        scopeSector: scope,
        severity: sev,
        message: msgText,
      })
      setBroadcasts((prev) => [bc, ...prev])
      showToast(`Emergency broadcast sent to ${scope}.`, 'warning')
    } catch {
      showToast('Failed to send broadcast.', 'error')
    }
  }

  const handleVoiceSession = async (lang: string): Promise<VoiceCommunicationSession> => {
    try {
      showToast('Mic active. Listening to input...', 'info')
      const sess = await communicationService.triggerVoiceSession(profile.uid, lang)
      showToast('Voice session playback synthesis complete.', 'success')
      return sess
    } catch (err) {
      showToast('Speech translation failed.', 'error')
      throw err
    }
  }

  const handleTranslateText = async (
    text: string,
    targetLangCode: string
  ): Promise<TranslationResult> => {
    try {
      const result = await communicationService.translateMessage(text, targetLangCode)
      showToast('Text translation completed.', 'success')
      return result
    } catch (err) {
      showToast('Failed to execute translation.', 'error')
      throw err
    }
  }

  // Fallback profile if user is not fully loaded
  const profile = user || {
    uid: 'mock-vol-104',
    name: 'Lusail Gate Marshal',
    role: 'volunteer',
    assignedSector: 'Lusail Sector C - Gate D',
    languages: ['English', 'Arabic', 'French'],
  }

  const activeRoute = routes.find((r) => r.routeId === selectedRouteId) || null

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
        <div className="flex flex-wrap bg-crowd-slate-950 border border-crowd-slate-800 p-1 rounded-xl w-full md:w-auto gap-1 sm:gap-0">
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
          <button
            onClick={() => setActiveTab('navigation')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 ${
              activeTab === 'navigation'
                ? 'bg-stadium-green-600 text-white shadow-md'
                : 'text-crowd-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            AI Navigation
          </button>
          <button
            onClick={() => setActiveTab('communication')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 ${
              activeTab === 'communication'
                ? 'bg-stadium-green-600 text-white shadow-md'
                : 'text-crowd-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Communication
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
      ) : activeTab === 'incidents' ? (
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
      ) : activeTab === 'navigation' ? (
        <div className="space-y-6 animate-slide-up">
          {/* Navigation Workspace (Desktop: 3-column grid layout, Tablet: 2-column, Mobile: 1-column) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Column 1: Options Selector & AI Recommendation */}
            <div className="space-y-6">
              <RouteOptionsPanel
                destinations={destinations}
                selectedDest={selectedDestination}
                onDestChange={(dest) => {
                  setSelectedDestination(dest)
                  updateNavigationRoutes(dest, emergencyMode)
                }}
                emergencyMode={emergencyMode}
                onEmergencyToggle={(val) => {
                  setEmergencyMode(val)
                  updateNavigationRoutes(selectedDestination, val)
                }}
                isCalculating={isCalculatingRoute}
              />
              <NavigationSummaryCard
                recommendation={currentRecommendation}
                onStartNavigation={handleStartNavigation}
                onCompleteNavigation={handleCompleteNavigation}
                isNavigating={isNavigating}
              />
            </div>

            {/* Column 2: Map Rendering & Route Selection */}
            <div className="space-y-6">
              <NavigationMapCard
                selectedRoute={activeRoute}
                activeLocation={MOCK_VOLUNTEER_LOCATION}
                destination={selectedDestination}
                emergencyMode={emergencyMode}
                emergencyRoute={emergencyRoute}
                hazards={activeRoute ? activeRoute.hazards : []}
              />
              <SmartRouteCard
                routes={routes}
                selectedRouteId={selectedRouteId}
                onSelect={async (id) => {
                  setSelectedRouteId(id)
                  try {
                    const rec = await navigationAnalyzer.getNavigationRecommendation(
                      MOCK_VOLUNTEER_LOCATION.name,
                      selectedDestination?.name || ''
                    )
                    setCurrentRecommendation(rec)
                  } catch {
                    setCurrentRecommendation(null)
                  }
                }}
              />
            </div>

            {/* Column 3: Timeline & Heatmaps */}
            <div className="space-y-6 md:col-span-2 lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-6 lg:gap-0">
              <NavigationTimeline route={activeRoute} />
              <div className="space-y-6">
                <CrowdHeatmapCard heatmap={heatmap} onRefresh={handleRefreshHeatmap} />
                <SectorStatusCard />
                {emergencyMode && emergencyRoute && <EmergencyRouteCard route={emergencyRoute} />}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-slide-up">
          {/* Communication Workspace Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CommunicationCenter
              messages={messages}
              activeUserId={profile.uid}
              onSendMessage={handleSendMessage}
              languages={languages}
              selectedTargetLang={selectedTargetLang}
              onTargetLangChange={(lang) => setSelectedTargetLang(lang)}
            />
            <TranslatorCard languages={languages} onTranslate={handleTranslateText} />
            <VoiceAssistantCard languages={languages} onVoiceSession={handleVoiceSession} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BroadcastCenter broadcasts={broadcasts} onSendBroadcast={handleSendBroadcast} />
            <QuickResponsePanel templates={quickResponses} onSelect={handleQuickResponseSelect} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
