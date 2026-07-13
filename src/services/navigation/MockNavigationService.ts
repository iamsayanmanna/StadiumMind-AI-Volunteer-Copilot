import type { INavigationService } from './INavigationService'
import type { INavigationRepository } from './INavigationRepository'
import type { INavigationAnalyzer } from './INavigationAnalyzer'
import type { INavigationProvider } from './INavigationProvider'
import type { Route, CrowdHeatmap, EmergencyRoute, NavigationSession } from '@/types/navigation'
import { MOCK_CROWD_HEATMAP } from '@/constants/mockNavigation'

export class MockNavigationService implements INavigationService {
  private repository: INavigationRepository
  private analyzer: INavigationAnalyzer
  private provider: INavigationProvider

  constructor(
    repository: INavigationRepository,
    analyzer: INavigationAnalyzer,
    provider: INavigationProvider
  ) {
    this.repository = repository
    this.analyzer = analyzer
    this.provider = provider
  }

  async calculateSmartRoute(start: string, end: string): Promise<Route[]> {
    const startWp = { x: 20, y: 35, name: start }
    const endWp = { x: 80, y: 75, name: end }

    // Retrieve default mock routes
    const routes = await this.repository.getRoutes()

    // Trigger route safety analysis to evaluate hazards
    if (routes.length > 0) {
      await this.analyzer.analyzeRouteSafety(routes[0].routeId)
    }

    // Calculate directions using provider
    const dynamicRoute = await this.provider.getDirections(startWp, endWp)

    return [dynamicRoute, ...routes]
  }

  async getSectorCrowdHeatmap(): Promise<CrowdHeatmap[]> {
    return MOCK_CROWD_HEATMAP
  }

  async getActiveEmergencyRoutes(): Promise<EmergencyRoute[]> {
    return this.repository.getEmergencyRoutes()
  }

  async startSession(
    volunteerId: string,
    start: string,
    dest: string,
    routeId: string
  ): Promise<NavigationSession> {
    const session: NavigationSession = {
      sessionId: `SESS-${Date.now()}`,
      volunteerId,
      startLocation: start,
      destination: dest,
      selectedRouteId: routeId,
      navigationStatus: 'Active',
      startedAt: new Date().toISOString(),
    }
    return this.repository.saveSession(session)
  }

  async getActiveSession(volunteerId: string): Promise<NavigationSession | null> {
    return this.repository.getActiveSession(volunteerId)
  }

  async completeSession(sessionId: string): Promise<NavigationSession> {
    const data = localStorage.getItem('stadiummind_mock_nav_session')
    if (!data) {
      throw new Error('Session not found')
    }
    const session = JSON.parse(data) as NavigationSession
    if (session.sessionId !== sessionId) {
      throw new Error('Session ID mismatch')
    }

    const updated: NavigationSession = {
      ...session,
      navigationStatus: 'Completed',
      completedAt: new Date().toISOString(),
    }
    return this.repository.saveSession(updated)
  }
}
