export type AlertLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export interface VolunteerProfile {
  uid: string
  name: string
  role: 'volunteer' | 'coordinator' | 'admin'
  assignedSector: string
  languages: string[]
}

export interface CrowdIncidentReport {
  id: string
  reporterId: string
  sector: string
  description: string
  alertLevel: AlertLevel
  status: 'PENDING' | 'RESOLVING' | 'RESOLVED'
  timestamp: string
}
