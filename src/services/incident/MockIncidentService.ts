import type { IIncidentService } from './IIncidentService'
import type { IIncidentRepository } from './IIncidentRepository'
import type { IAIAnalyzer } from './IAIAnalyzer'
import type { Incident, IncidentAnalysis, IncidentStatus } from '@/types/incident'

export class MockIncidentService implements IIncidentService {
  private repository: IIncidentRepository
  private analyzer: IAIAnalyzer

  constructor(repository: IIncidentRepository, analyzer: IAIAnalyzer) {
    this.repository = repository
    this.analyzer = analyzer
  }

  async submitIncident(
    incidentData: Omit<Incident, 'id' | 'status' | 'timestamp'>
  ): Promise<Incident> {
    return this.repository.create({
      ...incidentData,
      status: 'Reported',
    })
  }

  async analyzeIncident(incidentId: string): Promise<IncidentAnalysis> {
    const incident = await this.repository.getById(incidentId)
    if (!incident) {
      throw new Error(`Incident with ID ${incidentId} not found`)
    }

    // Set to Analyzing status
    await this.repository.updateStatus(incidentId, 'Analyzing')

    // Execute analysis
    const analysis = await this.analyzer.analyzeIncident(incident.description, incident.category)

    // Update status to Assigned once analysis completes
    await this.repository.updateStatus(incidentId, 'Assigned')

    return analysis
  }

  async getIncidents(): Promise<Incident[]> {
    return this.repository.getAll()
  }

  async updateIncidentStatus(incidentId: string, status: IncidentStatus): Promise<Incident> {
    return this.repository.updateStatus(incidentId, status)
  }
}
