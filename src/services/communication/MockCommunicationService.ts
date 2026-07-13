import type { ICommunicationService } from './ICommunicationService'
import type { ICommunicationRepository } from './ICommunicationRepository'
import type { IAITranslator } from './IAITranslator'
import type { ISpeechProvider } from './ISpeechProvider'
import type {
  CommunicationMessage,
  EmergencyBroadcast,
  VoiceCommunicationSession,
  TranslationResult,
} from '@/types/communication'

export class MockCommunicationService implements ICommunicationService {
  private repository: ICommunicationRepository
  private translator: IAITranslator
  private speechProvider: ISpeechProvider

  constructor(
    repository: ICommunicationRepository,
    translator: IAITranslator,
    speechProvider: ISpeechProvider
  ) {
    this.repository = repository
    this.translator = translator
    this.speechProvider = speechProvider
  }

  async sendMessage(
    msgData: Omit<CommunicationMessage, 'messageId' | 'timestamp' | 'status'>
  ): Promise<CommunicationMessage> {
    const messageId = `MSG-${Date.now()}`
    const timestamp = new Date().toISOString()

    const newMsg: CommunicationMessage = {
      ...msgData,
      messageId,
      timestamp,
      status: 'Sent',
    }

    try {
      const transResult = await this.translator.translateText(msgData.content, msgData.targetLang)
      newMsg.translatedContent = transResult.translatedText
    } catch {
      newMsg.translatedContent = undefined
    }

    await this.repository.saveMessage(newMsg)
    return newMsg
  }

  async translateMessage(text: string, targetLang: string): Promise<TranslationResult> {
    return this.translator.translateText(text, targetLang)
  }

  async dispatchBroadcast(
    broadcastData: Omit<EmergencyBroadcast, 'broadcastId' | 'dispatchedAt'>
  ): Promise<EmergencyBroadcast> {
    const broadcastId = `BC-${Date.now()}`
    const dispatchedAt = new Date().toISOString()

    const newBroadcast: EmergencyBroadcast = {
      ...broadcastData,
      broadcastId,
      dispatchedAt,
    }

    await this.repository.saveBroadcast(newBroadcast)
    return newBroadcast
  }

  async triggerVoiceSession(volunteerId: string, lang: string): Promise<VoiceCommunicationSession> {
    const transcript = await this.speechProvider.startSpeechToTextSession(lang)

    const targetTextLang = lang === 'ar' ? 'en' : 'ar'
    const translation = await this.translator.translateText(transcript, targetTextLang)

    await this.speechProvider.synthesizeTextToSpeech(translation.translatedText, targetTextLang)

    return {
      sessionId: `V-SESS-${Date.now()}`,
      volunteerId,
      status: 'Speaking',
      transcript,
      responseText: translation.translatedText,
      targetLanguage: targetTextLang,
    }
  }

  async getMessages(): Promise<CommunicationMessage[]> {
    return this.repository.getMessages()
  }

  async getBroadcasts(): Promise<EmergencyBroadcast[]> {
    return this.repository.getBroadcasts()
  }
}
