import type { IKnowledgeRepository } from './IKnowledgeRepository'
import type { KnowledgeArticle, SOPDocument, FAQItem } from '@/types/knowledge'
import {
  MOCK_KNOWLEDGE_ARTICLES,
  MOCK_SOP_DOCUMENTS,
  MOCK_FAQ_ITEMS,
} from '@/constants/mockKnowledge'

export class MockKnowledgeRepository implements IKnowledgeRepository {
  async getArticles(): Promise<KnowledgeArticle[]> {
    return MOCK_KNOWLEDGE_ARTICLES
  }

  async getSOPDocuments(): Promise<SOPDocument[]> {
    return MOCK_SOP_DOCUMENTS
  }

  async getFAQItems(): Promise<FAQItem[]> {
    return MOCK_FAQ_ITEMS
  }
}
