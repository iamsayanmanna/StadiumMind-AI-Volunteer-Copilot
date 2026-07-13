import { MockIncidentRepository } from './MockIncidentRepository'
import { MockAIAnalyzer } from './MockAIAnalyzer'
import { MockIncidentService } from './MockIncidentService'

const repository = new MockIncidentRepository()
const analyzer = new MockAIAnalyzer()

export const incidentService = new MockIncidentService(repository, analyzer)

export * from './IIncidentRepository'
export * from './MockIncidentRepository'
export * from './IAIAnalyzer'
export * from './MockAIAnalyzer'
export * from './IIncidentService'
export * from './MockIncidentService'
