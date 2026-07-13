export interface AICopilotGuidance {
  situation: string
  reasoning: string
  operationalRisk: string
  recommendedAction: string
  expectedOutcome: string
  confidenceScore: number
  confidenceDescriptor: 'High Confidence' | 'Medium Confidence' | 'Low Confidence'
  targetLocation: string
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'
export type TrendDirection = 'increasing' | 'stable' | 'decreasing'

export interface GateMetric {
  gateName: string
  densityPercent: number
  queueLength: number
  trend: TrendDirection
  riskLevel: RiskLevel
}

export interface AssignmentDetail {
  task: string
  priority: RiskLevel
  etaMinutes: number
  targetGate: string
  status: 'pending' | 'in-progress' | 'completed'
}

export type NotificationType =
  'crowd_alert' | 'medical_request' | 'translation_needed' | 'security_update'

export interface NotificationItem {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  location: string
  severity: 'low' | 'medium' | 'high' | 'critical'
}
