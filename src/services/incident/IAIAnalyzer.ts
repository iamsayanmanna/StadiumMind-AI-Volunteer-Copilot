import type { IncidentAnalysis } from '@/types/incident'

export interface IAIAnalyzer {
  analyzeIncident(description: string, category?: string): Promise<IncidentAnalysis>
}
