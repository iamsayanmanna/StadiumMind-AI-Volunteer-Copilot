import type { KnowledgeArticle, SOPDocument, FAQItem } from '@/types/knowledge'

export const MOCK_KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    articleId: 'ART-101',
    category: 'SOP',
    title: 'Standard Gate Pre-Screening Operations',
    content:
      'All spectators entering via Gate C and Gate D must present a valid ticket and matching ID. Ensure pre-screening volunteers check bags for prohibited items before spectators reach turnstiles.',
    tags: ['gate', 'pre-screening', 'tickets'],
    lastUpdatedAt: '2026-07-10T12:00:00Z',
    version: '1.2.0',
  },
  {
    articleId: 'ART-102',
    category: 'Emergency',
    title: 'Emergency Evacuation & Exit Gate Control',
    content:
      'In the event of an evacuation directive, unlock all electronic gates immediately. Direct spectators calmly towards nearest assembly points. Do not permit re-entry until emergency clear is issued.',
    tags: ['evacuation', 'emergency', 'safety'],
    lastUpdatedAt: '2026-07-12T08:30:00Z',
    version: '2.0.1',
  },
  {
    articleId: 'ART-103',
    category: 'FAQ',
    title: 'Ticketing and Scanner Troubleshooting FAQ',
    content:
      'If ticket scanners drop connection, verify scanner sync settings on the network panel. Switch scanner to offline mode if connection is down longer than 2 minutes.',
    tags: ['tickets', 'scanner', 'network'],
    lastUpdatedAt: '2026-07-09T14:45:00Z',
    version: '1.0.4',
  },
  {
    articleId: 'ART-104',
    category: 'Venue',
    title: 'Lusail Stadium Facilities and Assembly Zones',
    content:
      'Lusail Stadium contains 4 primary gates (A, B, C, D) and 6 designated assembly zones outside the perimeter fencing. Zone C is adjacent to the metro plaza entrance.',
    tags: ['stadium', 'assembly', 'gates'],
    lastUpdatedAt: '2026-07-11T16:00:00Z',
    version: '1.1.0',
  },
]

export const MOCK_SOP_DOCUMENTS: SOPDocument[] = [
  {
    docId: 'SOP-001',
    code: 'SOP-GATE-OPS',
    title: 'Gate Marshal Crowd Regulation',
    steps: [
      'Maintain clear corridors in front of turnstiles.',
      'Establish manual pre-screening lines if queues exceed 150 spectators.',
      'Check bag sizes against standard tournament limits.',
      'Coordinate with Sector Coordinator to adjust incoming flow rates.',
    ],
    criticalNotes: 'Bags exceeding 40x40x20cm must be checked at the perimeter storage locker.',
  },
  {
    docId: 'SOP-002',
    code: 'SOP-EVAC',
    title: 'Perimeter Evacuation Directive',
    steps: [
      'Unlock all magnetic gates and emergency locks.',
      'Direct spectators towards outward assembly points.',
      'Establish barrier parameters to prevent re-entry.',
      'Report safety check counts to Sector Command within 5 minutes.',
    ],
    criticalNotes: 'CRITICAL: Never block exit pathways with vehicles or barriers.',
  },
]

export const MOCK_FAQ_ITEMS: FAQItem[] = [
  {
    faqId: 'FAQ-001',
    question: 'Where is the main spectator storage locker located?',
    answer:
      'Spectator storage lockers are located adjacent to Gate B and the Metro Plaza Entrance.',
    category: 'Venue',
  },
  {
    faqId: 'FAQ-002',
    question: 'How do I handle a lost ticket issue?',
    answer:
      'Direct the spectator to the nearest ticketing resolution booth situated outside Gates A and C.',
    category: 'Ticketing',
  },
  {
    faqId: 'FAQ-003',
    question: 'What is the procedure for an unconscious spectator?',
    answer:
      'Immediately call Medical Dispatch. Clear a 2-meter corridor around the individual and notify nearby marshals.',
    category: 'Emergency',
  },
]
