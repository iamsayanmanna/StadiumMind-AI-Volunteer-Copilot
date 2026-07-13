import { MockCommunicationRepository } from './MockCommunicationRepository'
import { MockAITranslator } from './MockAITranslator'
import { MockSpeechProvider } from './MockSpeechProvider'
import { MockCommunicationService } from './MockCommunicationService'

const repository = new MockCommunicationRepository()
const translator = new MockAITranslator()
const speechProvider = new MockSpeechProvider()

export const communicationService = new MockCommunicationService(
  repository,
  translator,
  speechProvider
)

export * from './ICommunicationRepository'
export * from './MockCommunicationRepository'
export * from './IAITranslator'
export * from './MockAITranslator'
export * from './ISpeechProvider'
export * from './MockSpeechProvider'
export * from './ICommunicationService'
export * from './MockCommunicationService'
