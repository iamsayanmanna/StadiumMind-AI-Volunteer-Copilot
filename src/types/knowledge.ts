export type KnowledgeCategory = 'SOP' | 'Emergency' | 'FAQ' | 'Venue'

export interface KnowledgeArticle {
  articleId: string
  category: KnowledgeCategory
  title: string
  content: string
  tags: string[]
  lastUpdatedAt: string
  version: string
}

export interface SOPDocument {
  docId: string
  code: string
  title: string
  steps: string[]
  criticalNotes?: string
}

export interface FAQItem {
  faqId: string
  question: string
  answer: string
  category: string
}

export interface GuidanceRequest {
  query: string
  category?: KnowledgeCategory
}

export interface GuidanceResponse {
  answer: string
  confidence: number // 0-100
  referencedArticleIds: string[]
  processingTime: number // e.g. milliseconds
  generatedAt: string
}

export interface SearchResult {
  article: KnowledgeArticle
  score: number
  matchedTerms: string[]
  searchType: 'semantic' | 'keyword' | 'hybrid'
}

export interface SearchFilter {
  category?: KnowledgeCategory
  tags?: string[]
}
