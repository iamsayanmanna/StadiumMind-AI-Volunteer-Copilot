import type { Route, Waypoint } from '@/types/navigation'

export interface INavigationProvider {
  getDirections(start: Waypoint, end: Waypoint): Promise<Route>
}
