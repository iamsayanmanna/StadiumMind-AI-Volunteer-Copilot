import type { INavigationAnalyzer } from './INavigationAnalyzer'
import type { AIRouteAnalysis, NavigationRecommendation } from '@/types/navigation'
import { MOCK_NAV_RECOMMENDATIONS } from '@/constants/mockNavigation'

export class MockNavigationAnalyzer implements INavigationAnalyzer {
  async analyzeRouteSafety(routeId: string): Promise<AIRouteAnalysis> {
    // Simulate AI processing delay of 500ms
    await new Promise((resolve) => setTimeout(resolve, 500))

    const isRoute1 = routeId === 'ROUTE-001'

    return {
      routeId,
      safetyRiskFactor: isRoute1 ? 65 : 10,
      hazardWarnings: isRoute1
        ? ['High queue density at Central Food Plaza.', 'Crowd flow velocity decreasing.']
        : ['Perimeter path clear. Zero hazards detected.'],
      recommendedPathIndex: isRoute1 ? 1 : 0,
    }
  }

  async getNavigationRecommendation(
    _location: string,
    destination: string
  ): Promise<NavigationRecommendation> {
    // Simulate AI processing delay of 600ms
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Match route recomendation based on query if possible
    if (destination.toLowerCase().includes('medical')) {
      return MOCK_NAV_RECOMMENDATIONS['ROUTE-002']
    }

    return {
      recommendationId: 'REC-NAV-GENERIC',
      actionDirectives: [
        'Proceed using the perimeter access ways.',
        'Maintain visual contact with sector marshal coordinates.',
      ],
      reasoningDetails:
        'Perimeter corridor offers maximum crowd clearance and safe emergency exits overhead.',
      reliabilityPercentage: 95,
    }
  }
}
