import type { Route, SectorStatus, EmergencyRoute, NavigationSession } from '@/types/navigation'

export interface INavigationRepository {
  getRoutes(): Promise<Route[]>
  getSectorStatus(sectorId: string): Promise<SectorStatus | null>
  getEmergencyRoutes(): Promise<EmergencyRoute[]>
  saveSession(session: NavigationSession): Promise<NavigationSession>
  getActiveSession(volunteerId: string): Promise<NavigationSession | null>
}
