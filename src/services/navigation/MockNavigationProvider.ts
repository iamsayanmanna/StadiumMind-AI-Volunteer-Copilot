import type { INavigationProvider } from './INavigationProvider'
import type { Route, Waypoint } from '@/types/navigation'
import { MOCK_ROUTES } from '@/constants/mockNavigation'

export class MockNavigationProvider implements INavigationProvider {
  async getDirections(start: Waypoint, end: Waypoint): Promise<Route> {
    // Simulate minor engine routing computation delay of 400ms
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Find if we have a mock route matching the end destination name
    const found = MOCK_ROUTES.find((r) =>
      r.waypoints.some((wp) => wp.name.toLowerCase().includes(end.name.toLowerCase()))
    )

    if (found) {
      return {
        ...found,
        waypoints: [start, ...found.waypoints.slice(1, -1), end],
      }
    }

    // Fallback default route
    return {
      routeId: 'ROUTE-MOCK-GENERIC',
      name: `Direct Path to ${end.name}`,
      waypoints: [start, end],
      hazards: [],
      estimatedTravelTime: '6 mins',
      distance: '400m',
      safetyLevel: 'Safe',
    }
  }
}
