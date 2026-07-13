import type { Incident, IncidentAnalysis } from '@/types/incident'

export const INITIAL_MOCK_INCIDENTS: Incident[] = [
  {
    id: 'INC-2026-001',
    status: 'Assigned',
    priority: 'Critical',
    category: 'Medical',
    location: 'Sector C3 - Row 12',
    description:
      'Spectator experiencing heat exhaustion symptoms. Requires water and basic medical assessment.',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: 'INC-2026-002',
    status: 'Reported',
    priority: 'High',
    category: 'Crowd Control',
    location: 'Gate D - Ticket Turnstiles',
    description:
      'Sudden rush of spectators at Gate D. Turnstile validation rate is slow, creating a bottleneck.',
    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
  },
  {
    id: 'INC-2026-003',
    status: 'Resolved',
    priority: 'Low',
    category: 'Facilities',
    location: 'Concourse B - South Restrooms',
    description:
      'Minor water leakage reported on the floor of the restrooms. Cleaning crew dispatched.',
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
]

export const MOCK_AI_ANALYSIS_RESPONSES: Record<string, IncidentAnalysis> = {
  Medical: {
    category: 'Medical',
    riskScore: 85,
    recommendation:
      'Deploy nearest medical response unit with hydration packs. Advise the marshal to escort patient to shade.',
    estimatedResolutionTime: '10 mins',
    confidence: 94,
  },
  'Crowd Control': {
    category: 'Crowd Control',
    riskScore: 78,
    recommendation:
      'Open backup bypass lane D-2. Re-route marshals from low-density Gate E to assist ticket checking.',
    estimatedResolutionTime: '15 mins',
    confidence: 90,
  },
  Security: {
    category: 'Security',
    riskScore: 90,
    recommendation:
      'Notify Sector Safety Officer. Position nearest response team near the gate barrier line.',
    estimatedResolutionTime: '12 mins',
    confidence: 96,
  },
  Facilities: {
    category: 'Facilities',
    riskScore: 35,
    recommendation:
      'Issue work-order to Facilities Shift Lead. Dispatch janitorial crew to deploy warning signs.',
    estimatedResolutionTime: '30 mins',
    confidence: 88,
  },
  Other: {
    category: 'Other',
    riskScore: 40,
    recommendation: 'Investigate incident report details and verify with sector marshal.',
    estimatedResolutionTime: '20 mins',
    confidence: 80,
  },
}
