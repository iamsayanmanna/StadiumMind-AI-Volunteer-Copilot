import type { IKnowledgeSearchProvider } from './IKnowledgeSearchProvider'
import type { SearchResult, SearchFilter } from '@/types/knowledge'
import { MOCK_KNOWLEDGE_ARTICLES } from '@/constants/mockKnowledge'

export class MockKnowledgeSearchProvider implements IKnowledgeSearchProvider {
  async semanticSearch(query: string, filter?: SearchFilter): Promise<SearchResult[]> {
    // Simulate vector embedding analysis latency of 400ms
    await new Promise((resolve) => setTimeout(resolve, 400))

    const term = query.toLowerCase()
    const results: SearchResult[] = []

    for (const article of MOCK_KNOWLEDGE_ARTICLES) {
      if (filter?.category && article.category !== filter.category) continue

      let score = 50
      const matchedTerms: string[] = []

      if (article.title.toLowerCase().includes(term)) {
        score += 35
        matchedTerms.push(term)
      }
      if (article.content.toLowerCase().includes(term)) {
        score += 15
        matchedTerms.push(term)
      }
      if (article.tags.some((tag) => tag.toLowerCase().includes(term))) {
        score += 20
        matchedTerms.push(term)
      }

      if (score > 50) {
        results.push({
          article,
          score: Math.min(score, 100),
          matchedTerms,
          searchType: 'semantic',
        })
      }
    }

    return results.sort((a, b) => b.score - a.score)
  }

  async keywordSearch(query: string, filter?: SearchFilter): Promise<SearchResult[]> {
    // Simulate standard index search latency of 200ms
    await new Promise((resolve) => setTimeout(resolve, 200))

    const term = query.toLowerCase()
    const results: SearchResult[] = []

    for (const article of MOCK_KNOWLEDGE_ARTICLES) {
      if (filter?.category && article.category !== filter.category) continue

      const matchedTerms: string[] = []
      let matched = false

      if (article.title.toLowerCase().includes(term)) {
        matchedTerms.push(term)
        matched = true
      }
      if (article.content.toLowerCase().includes(term)) {
        matchedTerms.push(term)
        matched = true
      }

      if (matched) {
        results.push({
          article,
          score: 80,
          matchedTerms,
          searchType: 'keyword',
        })
      }
    }

    return results.sort((a, b) => b.score - a.score)
  }
}
