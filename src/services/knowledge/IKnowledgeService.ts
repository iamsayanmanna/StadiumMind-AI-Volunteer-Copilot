import type {
  KnowledgeArticle,
  SOPDocument,
  FAQItem,
  SearchResult,
  SearchFilter,
  GuidanceRequest,
  GuidanceResponse,
} from '@/types/knowledge'

export interface IKnowledgeService {
  getArticles(): Promise<KnowledgeArticle[]>
  getSOPDocuments(): Promise<SOPDocument[]>
  getFAQItems(): Promise<FAQItem[]>
  search(
    query: string,
    searchType: 'semantic' | 'keyword' | 'hybrid',
    filter?: SearchFilter
  ): Promise<SearchResult[]>
  generateGuidance(request: GuidanceRequest): Promise<GuidanceResponse>
}
