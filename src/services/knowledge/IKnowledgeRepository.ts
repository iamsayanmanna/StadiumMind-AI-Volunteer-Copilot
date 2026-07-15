import type { KnowledgeArticle, SOPDocument, FAQItem } from '@/types/knowledge'

export interface IKnowledgeRepository {
  getArticles(): Promise<KnowledgeArticle[]>
  getSOPDocuments(): Promise<SOPDocument[]>
  getFAQItems(): Promise<FAQItem[]>
}
