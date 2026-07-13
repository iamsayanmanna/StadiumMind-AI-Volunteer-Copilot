import type {
  CommunicationMessage,
  EmergencyBroadcast,
  VoiceCommunicationSession,
  TranslationResult,
} from '@/types/communication'

export interface ICommunicationService {
  sendMessage(
    msgData: Omit<CommunicationMessage, 'messageId' | 'timestamp' | 'status'>
  ): Promise<CommunicationMessage>
  translateMessage(text: string, targetLang: string): Promise<TranslationResult>
  dispatchBroadcast(
    broadcastData: Omit<EmergencyBroadcast, 'broadcastId' | 'dispatchedAt'>
  ): Promise<EmergencyBroadcast>
  triggerVoiceSession(volunteerId: string, lang: string): Promise<VoiceCommunicationSession>
  getMessages(): Promise<CommunicationMessage[]>
  getBroadcasts(): Promise<EmergencyBroadcast[]>
}
