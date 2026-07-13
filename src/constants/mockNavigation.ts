import type {
  Route,
  Waypoint,
  CrowdHeatmap,
  SectorStatus,
  EmergencyRoute,
  NavigationRecommendation,
} from '@/types/navigation'

export const MOCK_VOLUNTEER_LOCATION: Waypoint = {
  x: 20,
  y: 35,
  name: 'Gate C Marshall Station',
}

export const MOCK_DESTINATIONS: Waypoint[] = [
  { x: 80, y: 75, name: 'Medical Station 2 (Sector East)' },
  { x: 50, y: 90, name: 'VIP Entrance Lounge' },
  { x: 10, y: 80, name: 'West Concourse Exit Gate' },
  { x: 85, y: 20, name: 'Gate A Security Control' },
]

export const MOCK_CROWD_HEATMAP: CrowdHeatmap[] = [
  {
    sectorId: 'SEC-A',
    sectorName: 'Sector A - North Gate',
    densityPercentage: 45,
    trendFlowStatus: 'Stable',
  },
  {
    sectorId: 'SEC-B',
    sectorName: 'Sector B - East Concourse',
    densityPercentage: 88,
    trendFlowStatus: 'Increasing',
  },
  {
    sectorId: 'SEC-C',
    sectorName: 'Sector C - South Entrance',
    densityPercentage: 65,
    trendFlowStatus: 'Decreasing',
  },
  {
    sectorId: 'SEC-D',
    sectorName: 'Sector D - VIP Pavilion',
    densityPercentage: 25,
    trendFlowStatus: 'Stable',
  },
]

export const MOCK_SECTOR_STATUSES: Record<string, SectorStatus> = {
  'SEC-A': {
    sectorId: 'SEC-A',
    statusLevel: 'Normal',
    waitingTimeMinutes: 5,
    throughputPerMinute: 65,
  },
  'SEC-B': {
    sectorId: 'SEC-B',
    statusLevel: 'Congested',
    waitingTimeMinutes: 22,
    throughputPerMinute: 40,
  },
  'SEC-C': {
    sectorId: 'SEC-C',
    statusLevel: 'Normal',
    waitingTimeMinutes: 12,
    throughputPerMinute: 55,
  },
  'SEC-D': {
    sectorId: 'SEC-D',
    statusLevel: 'Normal',
    waitingTimeMinutes: 3,
    throughputPerMinute: 80,
  },
}

export const MOCK_ROUTES: Route[] = [
  {
    routeId: 'ROUTE-001',
    name: 'Primary Access Path (via Concourse B)',
    waypoints: [
      { x: 20, y: 35, name: 'Gate C Marshall Station' },
      { x: 45, y: 40, name: 'Central Food Plaza' },
      { x: 80, y: 75, name: 'Medical Station 2 (Sector East)' },
    ],
    hazards: [
      {
        hazardId: 'HAZ-101',
        type: 'Crowd Accumulation',
        severity: 'Medium',
        description: 'Temporary queue buildup near food plaza exit.',
        affectedWaypoint: { x: 45, y: 40, name: 'Central Food Plaza' },
      },
    ],
    estimatedTravelTime: '8 mins',
    distance: '520m',
    safetyLevel: 'Caution',
  },
  {
    routeId: 'ROUTE-002',
    name: 'Tactical Bypass Route (Outer Gate Ring)',
    waypoints: [
      { x: 20, y: 35, name: 'Gate C Marshall Station' },
      { x: 15, y: 60, name: 'Outer Ring Corridor C-2' },
      { x: 60, y: 75, name: 'East Ring Transit Deck' },
      { x: 80, y: 75, name: 'Medical Station 2 (Sector East)' },
    ],
    hazards: [],
    estimatedTravelTime: '11 mins',
    distance: '740m',
    safetyLevel: 'Safe',
  },
]

export const MOCK_EMERGENCY_ROUTES: EmergencyRoute[] = [
  {
    emergencyId: 'EMERG-911',
    triggerDescription: 'Sector B Overcrowding Lockout Protocol Active.',
    safeExitWaypoints: [
      { x: 20, y: 35, name: 'Gate C Marshall Station' },
      { x: 10, y: 80, name: 'West Concourse Exit Gate' },
    ],
    priorityLevel: 'Critical',
  },
]

export const MOCK_NAV_RECOMMENDATIONS: Record<string, NavigationRecommendation> = {
  'ROUTE-001': {
    recommendationId: 'REC-NAV-001',
    actionDirectives: [
      'Avoid central plaza checkpoint due to peak transit density.',
      'Slight detour via outer ring route is recommended.',
    ],
    reasoningDetails:
      'Central Concourse is currently at 88% capacity. Taking outer bypass reduces risk of delay by 6 minutes.',
    reliabilityPercentage: 92,
  },
  'ROUTE-002': {
    recommendationId: 'REC-NAV-002',
    actionDirectives: [
      'Outer perimeter pathway is completely clear.',
      'Maintain steady walking speed to bypass transit queues.',
    ],
    reasoningDetails:
      'No active safety hazards or congestion points reported along the outer perimeter deck.',
    reliabilityPercentage: 98,
  },
}
