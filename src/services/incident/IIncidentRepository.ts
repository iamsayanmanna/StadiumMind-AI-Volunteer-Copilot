import type { Incident, IncidentStatus } from '@/types/incident'

export interface IIncidentRepository {
  getAll(): Promise<Incident[]>
  getById(id: string): Promise<Incident | null>
  create(incident: Omit<Incident, 'id' | 'timestamp'>): Promise<Incident>
  updateStatus(id: string, status: IncidentStatus): Promise<Incident>
}
