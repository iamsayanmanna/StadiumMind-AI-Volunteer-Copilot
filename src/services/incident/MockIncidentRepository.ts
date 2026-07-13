import type { IIncidentRepository } from './IIncidentRepository'
import type { Incident, IncidentStatus } from '@/types/incident'
import { INITIAL_MOCK_INCIDENTS } from '@/constants/mockIncidents'

export class MockIncidentRepository implements IIncidentRepository {
  private STORAGE_KEY = 'stadiummind_mock_incidents'

  private getIncidents(): Incident[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY)
      if (!data) {
        this.saveIncidents(INITIAL_MOCK_INCIDENTS)
        return INITIAL_MOCK_INCIDENTS
      }
      return JSON.parse(data)
    } catch {
      return INITIAL_MOCK_INCIDENTS
    }
  }

  private saveIncidents(incidents: Incident[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(incidents))
    } catch (e) {
      console.error('Failed to persist mock incidents', e)
    }
  }

  async getAll(): Promise<Incident[]> {
    return this.getIncidents()
  }

  async getById(id: string): Promise<Incident | null> {
    const incidents = this.getIncidents()
    return incidents.find((inc) => inc.id === id) || null
  }

  async create(incident: Omit<Incident, 'id' | 'timestamp'>): Promise<Incident> {
    const incidents = this.getIncidents()
    const newIncident: Incident = {
      ...incident,
      id: `INC-2026-${String(incidents.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString(),
    }
    incidents.push(newIncident)
    this.saveIncidents(incidents)
    return newIncident
  }

  async updateStatus(id: string, status: IncidentStatus): Promise<Incident> {
    const incidents = this.getIncidents()
    const index = incidents.findIndex((inc) => inc.id === id)
    if (index === -1) {
      throw new Error(`Incident with ID ${id} not found`)
    }
    incidents[index] = { ...incidents[index], status }
    this.saveIncidents(incidents)
    return incidents[index]
  }
}
