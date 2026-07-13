export type MessageStatus = 'Sending' | 'Sent' | 'Delivered' | 'Read' | 'Failed'

export interface CommunicationMessage {
  messageId: string
  senderId: string
  recipientId: string
  content: string
  translatedContent?: string
  sourceLang: string
  targetLang: string
  timestamp: string
  status: MessageStatus
}

export interface TranslationResult {
  translatedText: string
  confidence: number // 0-100
  detectedLanguage: string
  processingTime: string // e.g., "120ms"
}

export interface Conversation {
  conversationId: string
  participants: string[]
  lastMessageAt: string
  lastMessageText: string
}

export interface EmergencyBroadcast {
  broadcastId: string
  senderId: string
  scopeSector: string
  severity: 'Alert' | 'Critical'
  message: string
  dispatchedAt: string
}

export interface TranslationRequest {
  requestId: string
  originalText: string
  targetLanguage: string
  detectedSourceLanguage?: string
}

export interface VoiceCommunicationSession {
  sessionId: string
  volunteerId: string
  status: 'Inactive' | 'Listening' | 'Speaking' | 'Processing'
  transcript?: string
  responseText?: string
  targetLanguage: string
}

export interface QuickResponseTemplate {
  templateId: string
  category: string
  englishText: string
  translatedText: string
}

export interface LanguageProfile {
  languageCode: string
  name: string
  nativeName: string
  isSupportedForVoice: boolean
}
