import type { CommunicationMessage, EmergencyBroadcast } from '@/types/communication'

export interface ICommunicationRepository {
  getMessages(): Promise<CommunicationMessage[]>
  saveMessage(msg: CommunicationMessage): Promise<CommunicationMessage>
  getBroadcasts(): Promise<EmergencyBroadcast[]>
  saveBroadcast(broadcast: EmergencyBroadcast): Promise<EmergencyBroadcast>
}
