import type { Route, CrowdHeatmap, EmergencyRoute, NavigationSession } from '@/types/navigation'

export interface INavigationService {
  calculateSmartRoute(start: string, end: string): Promise<Route[]>
  getSectorCrowdHeatmap(): Promise<CrowdHeatmap[]>
  getActiveEmergencyRoutes(): Promise<EmergencyRoute[]>
  startSession(
    volunteerId: string,
    start: string,
    dest: string,
    routeId: string
  ): Promise<NavigationSession>
  getActiveSession(volunteerId: string): Promise<NavigationSession | null>
  completeSession(sessionId: string): Promise<NavigationSession>
}
