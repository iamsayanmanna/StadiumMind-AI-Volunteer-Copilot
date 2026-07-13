import type {
  AICopilotGuidance,
  GateMetric,
  AssignmentDetail,
  NotificationItem,
} from '@/types/dashboard'

export const MOCK_COPILOT_GUIDANCE: AICopilotGuidance = {
  situation:
    'Crowd congestion building rapidly at Gate C outer perimeter due to ticket reader sync latency.',
  reasoning:
    'Ticket queue flow has slowed by 42% while arrivals from Metro station remain high. Inflow exceeds processing capacity by 150 spectators/min.',
  operationalRisk:
    'High - Risk of queue spillover into vehicle access lanes within 8 minutes if flow rate is not modified.',
  recommendedAction:
    'Redirect 2 marshals from low-density Gate D to Gate C to establish manual queue pre-screening lines and distribute flow.',
  expectedOutcome:
    'Reduce Gate C outer queue density by 30% and processing latency from 4.5 minutes to under 2 minutes.',
  confidenceScore: 0.94,
  confidenceDescriptor: 'High Confidence',
  targetLocation: 'Gate C Outer Perimeter',
}

export const MOCK_ASSIGNMENT: AssignmentDetail = {
  task: 'Redirection Duty to Gate C Outer (Support Pre-Screening)',
  priority: 'high',
  etaMinutes: 4,
  targetGate: 'Gate C',
  status: 'in-progress',
}

export const MOCK_GATE_METRICS: GateMetric[] = [
  {
    gateName: 'Gate A',
    densityPercent: 35,
    queueLength: 28,
    trend: 'stable',
    riskLevel: 'low',
  },
  {
    gateName: 'Gate B',
    densityPercent: 62,
    queueLength: 145,
    trend: 'increasing',
    riskLevel: 'medium',
  },
  {
    gateName: 'Gate C',
    densityPercent: 88,
    queueLength: 320,
    trend: 'increasing',
    riskLevel: 'critical',
  },
  {
    gateName: 'Gate D',
    densityPercent: 18,
    queueLength: 12,
    trend: 'decreasing',
    riskLevel: 'low',
  },
]

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'crowd_alert',
    title: 'Crowd Alert: Bottleneck at Metro exit',
    message:
      'Congestion spike detected at Main Metro Entrance exit stairs. High density flow towards Sector C.',
    timestamp: '11:24',
    location: 'Metro Plaza exit',
    severity: 'high',
  },
  {
    id: 'notif-2',
    type: 'medical_request',
    title: 'Medical Request: Sector B Concourse',
    message:
      'Spectator showing heat exhaustion symptoms. Medical team dispatched; local marshals to assist route clearing.',
    timestamp: '11:20',
    location: 'Sector B Concourse',
    severity: 'medium',
  },
  {
    id: 'notif-3',
    type: 'translation_needed',
    title: 'Translation Assistance: Gate B entrance',
    message:
      'Group of French-speaking spectators experiencing ticketing issues. Translation support requested.',
    timestamp: '11:15',
    location: 'Gate B turnstiles',
    severity: 'low',
  },
  {
    id: 'notif-4',
    type: 'security_update',
    title: 'Security Update: VIP Lane Shift',
    message:
      'VIP access lane 4 closed temporarily. General access traffic redirected to lanes 1-3.',
    timestamp: '11:02',
    location: 'Gate A VIP Entry',
    severity: 'low',
  },
]
