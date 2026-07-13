import type { ICommunicationRepository } from './ICommunicationRepository'
import type { CommunicationMessage, EmergencyBroadcast } from '@/types/communication'
import { MOCK_INITIAL_MESSAGES, MOCK_EMERGENCY_BROADCASTS } from '@/constants/mockCommunication'

export class MockCommunicationRepository implements ICommunicationRepository {
  private MESSAGES_KEY = 'stadiummind_mock_comm_messages'
  private BROADCASTS_KEY = 'stadiummind_mock_comm_broadcasts'

  private getStoredMessages(): CommunicationMessage[] {
    try {
      const data = localStorage.getItem(this.MESSAGES_KEY)
      if (!data) {
        this.saveMessages(MOCK_INITIAL_MESSAGES)
        return MOCK_INITIAL_MESSAGES
      }
      return JSON.parse(data)
    } catch {
      return MOCK_INITIAL_MESSAGES
    }
  }

  private saveMessages(messages: CommunicationMessage[]): void {
    try {
      localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages))
    } catch (e) {
      console.error('Failed to save communication messages', e)
    }
  }

  private getStoredBroadcasts(): EmergencyBroadcast[] {
    try {
      const data = localStorage.getItem(this.BROADCASTS_KEY)
      if (!data) {
        this.saveBroadcasts(MOCK_EMERGENCY_BROADCASTS)
        return MOCK_EMERGENCY_BROADCASTS
      }
      return JSON.parse(data)
    } catch {
      return MOCK_EMERGENCY_BROADCASTS
    }
  }

  private saveBroadcasts(broadcasts: EmergencyBroadcast[]): void {
    try {
      localStorage.setItem(this.BROADCASTS_KEY, JSON.stringify(broadcasts))
    } catch (e) {
      console.error('Failed to save broadcasts', e)
    }
  }

  async getMessages(): Promise<CommunicationMessage[]> {
    return this.getStoredMessages()
  }

  async saveMessage(msg: CommunicationMessage): Promise<CommunicationMessage> {
    const messages = this.getStoredMessages()
    const index = messages.findIndex((m) => m.messageId === msg.messageId)
    if (index !== -1) {
      messages[index] = msg
    } else {
      messages.push(msg)
    }
    this.saveMessages(messages)
    return msg
  }

  async getBroadcasts(): Promise<EmergencyBroadcast[]> {
    return this.getStoredBroadcasts()
  }

  async saveBroadcast(broadcast: EmergencyBroadcast): Promise<EmergencyBroadcast> {
    const broadcasts = this.getStoredBroadcasts()
    broadcasts.push(broadcast)
    this.saveBroadcasts(broadcasts)
    return broadcast
  }
}
