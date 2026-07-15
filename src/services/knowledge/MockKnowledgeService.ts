import type { IKnowledgeService } from './IKnowledgeService'
import type { IKnowledgeRepository } from './IKnowledgeRepository'
import type { IKnowledgeSearchProvider } from './IKnowledgeSearchProvider'
import type { IGuidanceGenerator } from './IGuidanceGenerator'
import type {
  KnowledgeArticle,
  SOPDocument,
  FAQItem,
  SearchResult,
  SearchFilter,
  GuidanceRequest,
  GuidanceResponse,
} from '@/types/knowledge'

export class MockKnowledgeService implements IKnowledgeService {
  private repository: IKnowledgeRepository
  private searchProvider: IKnowledgeSearchProvider
  private guidanceGenerator: IGuidanceGenerator

  constructor(
    repository: IKnowledgeRepository,
    searchProvider: IKnowledgeSearchProvider,
    guidanceGenerator: IGuidanceGenerator
  ) {
    this.repository = repository
    this.searchProvider = searchProvider
    this.guidanceGenerator = guidanceGenerator
  }

  async getArticles(): Promise<KnowledgeArticle[]> {
    return this.repository.getArticles()
  }

  async getSOPDocuments(): Promise<SOPDocument[]> {
    return this.repository.getSOPDocuments()
  }

  async getFAQItems(): Promise<FAQItem[]> {
    return this.repository.getFAQItems()
  }

  async search(
    query: string,
    searchType: 'semantic' | 'keyword' | 'hybrid',
    filter?: SearchFilter
  ): Promise<SearchResult[]> {
    if (searchType === 'semantic') {
      return this.searchProvider.semanticSearch(query, filter)
    } else if (searchType === 'keyword') {
      return this.searchProvider.keywordSearch(query, filter)
    } else {
      // hybrid search: combine both, merge scores, and filter duplicates
      const [semanticResults, keywordResults] = await Promise.all([
        this.searchProvider.semanticSearch(query, filter),
        this.searchProvider.keywordSearch(query, filter),
      ])

      const merged = new Map<string, SearchResult>()

      semanticResults.forEach((r) => merged.set(r.article.articleId, r))

      keywordResults.forEach((r) => {
        const existing = merged.get(r.article.articleId)
        if (existing) {
          existing.score = Math.min(Math.round((existing.score + r.score) / 1.5), 100)
          existing.searchType = 'hybrid'
          existing.matchedTerms = Array.from(new Set([...existing.matchedTerms, ...r.matchedTerms]))
        } else {
          merged.set(r.article.articleId, {
            ...r,
            searchType: 'hybrid',
          })
        }
      })

      return Array.from(merged.values()).sort((a, b) => b.score - a.score)
    }
  }

  async generateGuidance(request: GuidanceRequest): Promise<GuidanceResponse> {
    return this.guidanceGenerator.generateGuidance(request)
  }
}
