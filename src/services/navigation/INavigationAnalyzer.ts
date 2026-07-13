import type { AIRouteAnalysis, NavigationRecommendation } from '@/types/navigation'

export interface INavigationAnalyzer {
  analyzeRouteSafety(routeId: string): Promise<AIRouteAnalysis>
  getNavigationRecommendation(
    location: string,
    destination: string
  ): Promise<NavigationRecommendation>
}
