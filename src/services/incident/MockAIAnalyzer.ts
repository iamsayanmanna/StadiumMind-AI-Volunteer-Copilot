import type { IAIAnalyzer } from './IAIAnalyzer'
import type { IncidentAnalysis, IncidentCategory } from '@/types/incident'
import { MOCK_AI_ANALYSIS_RESPONSES } from '@/constants/mockIncidents'

export class MockAIAnalyzer implements IAIAnalyzer {
  async analyzeIncident(description: string, category?: string): Promise<IncidentAnalysis> {
    // Simulate network delay to make UI load states visible
    await new Promise((resolve) => setTimeout(resolve, 800))

    let matchedCategory: IncidentCategory = 'Other'
    const descLower = description.toLowerCase()

    if (category && Object.keys(MOCK_AI_ANALYSIS_RESPONSES).includes(category)) {
      matchedCategory = category as IncidentCategory
    } else if (
      descLower.includes('heat') ||
      descLower.includes('injury') ||
      descLower.includes('medical') ||
      descLower.includes('faint') ||
      descLower.includes('hurt')
    ) {
      matchedCategory = 'Medical'
    } else if (
      descLower.includes('crowd') ||
      descLower.includes('gate') ||
      descLower.includes('rush') ||
      descLower.includes('queue') ||
      descLower.includes('bottleneck')
    ) {
      matchedCategory = 'Crowd Control'
    } else if (
      descLower.includes('fight') ||
      descLower.includes('security') ||
      descLower.includes('barrier') ||
      descLower.includes('theft') ||
      descLower.includes('police')
    ) {
      matchedCategory = 'Security'
    } else if (
      descLower.includes('leak') ||
      descLower.includes('water') ||
      descLower.includes('facilities') ||
      descLower.includes('broken') ||
      descLower.includes('light')
    ) {
      matchedCategory = 'Facilities'
    }

    return {
      ...MOCK_AI_ANALYSIS_RESPONSES[matchedCategory],
    }
  }
}
