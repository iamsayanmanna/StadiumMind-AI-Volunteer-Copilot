import type { SearchResult, SearchFilter } from '@/types/knowledge'

export interface IKnowledgeSearchProvider {
  semanticSearch(query: string, filter?: SearchFilter): Promise<SearchResult[]>
  keywordSearch(query: string, filter?: SearchFilter): Promise<SearchResult[]>
}
