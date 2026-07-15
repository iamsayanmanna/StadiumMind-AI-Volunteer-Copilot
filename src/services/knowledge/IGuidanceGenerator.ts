import type { GuidanceRequest, GuidanceResponse } from '@/types/knowledge'

export interface IGuidanceGenerator {
  generateGuidance(request: GuidanceRequest): Promise<GuidanceResponse>
}
