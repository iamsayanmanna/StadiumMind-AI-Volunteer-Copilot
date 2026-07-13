import type { INavigationRepository } from './INavigationRepository'
import type { Route, SectorStatus, EmergencyRoute, NavigationSession } from '@/types/navigation'
import {
  MOCK_ROUTES,
  MOCK_SECTOR_STATUSES,
  MOCK_EMERGENCY_ROUTES,
} from '@/constants/mockNavigation'

export class MockNavigationRepository implements INavigationRepository {
  private SESSION_KEY = 'stadiummind_mock_nav_session'

  async getRoutes(): Promise<Route[]> {
    return MOCK_ROUTES
  }

  async getSectorStatus(sectorId: string): Promise<SectorStatus | null> {
    return MOCK_SECTOR_STATUSES[sectorId] || null
  }

  async getEmergencyRoutes(): Promise<EmergencyRoute[]> {
    return MOCK_EMERGENCY_ROUTES
  }

  async saveSession(session: NavigationSession): Promise<NavigationSession> {
    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))
    } catch (e) {
      console.error('Failed to persist navigation session', e)
    }
    return session
  }

  async getActiveSession(volunteerId: string): Promise<NavigationSession | null> {
    try {
      const data = localStorage.getItem(this.SESSION_KEY)
      if (data) {
        const session = JSON.parse(data) as NavigationSession
        if (session.volunteerId === volunteerId && session.navigationStatus === 'Active') {
          return session
        }
      }
    } catch {
      return null
    }
    return null
  }
}
