import type { IGuidanceGenerator } from './IGuidanceGenerator'
import type { GuidanceRequest, GuidanceResponse } from '@/types/knowledge'

export class MockGuidanceGenerator implements IGuidanceGenerator {
  async generateGuidance(request: GuidanceRequest): Promise<GuidanceResponse> {
    // Simulate LLM inference delay of 600ms
    await new Promise((resolve) => setTimeout(resolve, 600))

    const query = request.query.toLowerCase()
    let answer =
      'Based on general operational procedures, please direct the spectator to standard help desks or check safety parameters.'
    let confidence = 85
    let referencedArticleIds = ['ART-101']

    if (query.includes('evacuate') || query.includes('emergency')) {
      answer =
        'EMERGENCY PROTOCOL: Clear routes instantly, release all magnetic locks, and direct spectators outwards towards Zone C Metro Plaza assembly points.'
      confidence = 98
      referencedArticleIds = ['ART-102']
    } else if (query.includes('scanner') || query.includes('sync') || query.includes('ticket')) {
      answer =
        'TICKETING/SCANNER PROTOCOL: Double-check network connection. Toggle the device to offline scanner operation mode if connectivity is lost.'
      confidence = 94
      referencedArticleIds = ['ART-103']
    }

    return {
      answer,
      confidence,
      referencedArticleIds,
      processingTime: 145, // 145ms
      generatedAt: new Date().toISOString(),
    }
  }
}
