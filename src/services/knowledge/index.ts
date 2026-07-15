import { MockKnowledgeRepository } from './MockKnowledgeRepository'
import { MockKnowledgeSearchProvider } from './MockKnowledgeSearchProvider'
import { MockGuidanceGenerator } from './MockGuidanceGenerator'
import { MockKnowledgeService } from './MockKnowledgeService'

const repository = new MockKnowledgeRepository()
const searchProvider = new MockKnowledgeSearchProvider()
const guidanceGenerator = new MockGuidanceGenerator()

export const knowledgeService = new MockKnowledgeService(
  repository,
  searchProvider,
  guidanceGenerator
)

export * from './IKnowledgeRepository'
export * from './MockKnowledgeRepository'
export * from './IKnowledgeSearchProvider'
export * from './MockKnowledgeSearchProvider'
export * from './IGuidanceGenerator'
export * from './MockGuidanceGenerator'
export * from './IKnowledgeService'
export * from './MockKnowledgeService'
