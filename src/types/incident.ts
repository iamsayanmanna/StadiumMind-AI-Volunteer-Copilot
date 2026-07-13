export type IncidentPriority = 'Low' | 'Medium' | 'High' | 'Critical'

export type IncidentStatus = 'Reported' | 'Analyzing' | 'Assigned' | 'Resolved'

export type IncidentCategory = 'Crowd Control' | 'Medical' | 'Security' | 'Facilities' | 'Other'

export interface Incident {
  id: string
  status: IncidentStatus
  priority: IncidentPriority
  category: IncidentCategory
  location: string
  description: string
  photoUrl?: string
  timestamp: string
}

export interface IncidentAnalysis {
  category: IncidentCategory
  riskScore: number // 0-100
  recommendation: string
  estimatedResolutionTime: string // e.g. "15 mins"
  confidence: number // 0-100
}

export interface TimelineEvent {
  id: string
  timestamp: string
  status: IncidentStatus
  description: string
}
