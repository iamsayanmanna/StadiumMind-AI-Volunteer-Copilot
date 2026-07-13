export interface Waypoint {
  x: number
  y: number
  name: string
}

export interface RouteHazard {
  hazardId: string
  type: string
  severity: 'Low' | 'Medium' | 'High'
  description: string
  affectedWaypoint: Waypoint
}

export interface Route {
  routeId: string
  name: string
  waypoints: Waypoint[]
  hazards: RouteHazard[]
  estimatedTravelTime: string
  distance: string
  safetyLevel: 'Safe' | 'Caution' | 'Danger'
}

export interface NavigationSession {
  sessionId: string
  volunteerId: string
  startLocation: string
  destination: string
  selectedRouteId: string
  navigationStatus: 'Active' | 'Completed' | 'Aborted'
  startedAt: string
  completedAt?: string
}

export interface CrowdHeatmap {
  sectorId: string
  sectorName: string
  densityPercentage: number
  trendFlowStatus: 'Increasing' | 'Stable' | 'Decreasing'
}

export interface SectorStatus {
  sectorId: string
  statusLevel: 'Normal' | 'Congested' | 'Emergency'
  waitingTimeMinutes: number
  throughputPerMinute: number
}

export interface EmergencyRoute {
  emergencyId: string
  triggerDescription: string
  safeExitWaypoints: Waypoint[]
  priorityLevel: 'High' | 'Critical'
}

export interface NavigationRecommendation {
  recommendationId: string
  actionDirectives: string[]
  reasoningDetails: string
  reliabilityPercentage: number
}

export interface AIRouteAnalysis {
  routeId: string
  safetyRiskFactor: number
  hazardWarnings: string[]
  recommendedPathIndex: number
}
