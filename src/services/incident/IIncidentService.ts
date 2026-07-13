import type { Incident, IncidentAnalysis, IncidentStatus } from '@/types/incident'

export interface IIncidentService {
  submitIncident(incidentData: Omit<Incident, 'id' | 'status' | 'timestamp'>): Promise<Incident>
  analyzeIncident(incidentId: string): Promise<IncidentAnalysis>
  getIncidents(): Promise<Incident[]>
  updateIncidentStatus(incidentId: string, status: IncidentStatus): Promise<Incident>
}
