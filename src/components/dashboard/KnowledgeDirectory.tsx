import React, { useState, useEffect } from 'react'
import {
  Search,
  FileText,
  HelpCircle,
  Cpu,
  BookOpen,
  Tag,
  Filter,
  Sparkles,
  Clock,
  ArrowRight,
  Info,
} from 'lucide-react'
import { knowledgeService } from '@/services/knowledge'
import type {
  KnowledgeArticle,
  SOPDocument,
  FAQItem,
  SearchResult,
  KnowledgeCategory,
  GuidanceResponse,
} from '@/types/knowledge'

export const KnowledgeDirectory: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'qa' | 'articles' | 'sops' | 'faqs'>('qa')

  // Data States
  const [articles, setArticles] = useState<KnowledgeArticle[]>([])
  const [sops, setSops] = useState<SOPDocument[]>([])
  const [faqs, setFaqs] = useState<FAQItem[]>([])

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'semantic' | 'keyword' | 'hybrid'>('hybrid')
  const [categoryFilter, setCategoryFilter] = useState<KnowledgeCategory | 'ALL'>('ALL')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Q&A AI Assistant States
  const [qaQuery, setQaQuery] = useState('')
  const [qaResponse, setQaResponse] = useState<GuidanceResponse | null>(null)
  const [isGeneratingGuidance, setIsGeneratingGuidance] = useState(false)

  // Load Initial Data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [arts, docSops, faqItems] = await Promise.all([
          knowledgeService.getArticles(),
          knowledgeService.getSOPDocuments(),
          knowledgeService.getFAQItems(),
        ])
        setArticles(arts)
        setSops(docSops)
        setFaqs(faqItems)
      } catch (err) {
        console.error('Failed to load knowledge assets', err)
      }
    }
    loadData()
  }, [])

  // Execute Search
  const runSearch = async (
    queryText: string,
    type: 'semantic' | 'keyword' | 'hybrid',
    category: KnowledgeCategory | 'ALL'
  ) => {
    if (!queryText.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const filter = category !== 'ALL' ? { category } : undefined
      const results = await knowledgeService.search(queryText, type, filter)
      setSearchResults(results)
    } catch (err) {
      console.error('Search failed', err)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    runSearch(searchQuery, searchType, categoryFilter)
  }

  const handleSearchTypeChange = (type: 'semantic' | 'keyword' | 'hybrid') => {
    setSearchType(type)
    runSearch(searchQuery, type, categoryFilter)
  }

  const handleCategoryFilterChange = (category: KnowledgeCategory | 'ALL') => {
    setCategoryFilter(category)
    runSearch(searchQuery, searchType, category)
  }

  // Execute AI Guidance Generator
  const handleGenerateGuidance = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!qaQuery.trim()) return

    setIsGeneratingGuidance(true)
    setQaResponse(null)
    try {
      const res = await knowledgeService.generateGuidance({
        query: qaQuery,
      })
      setQaResponse(res)
    } catch (err) {
      console.error('Guidance generation failed', err)
    } finally {
      setIsGeneratingGuidance(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sub-tab sidebar selector */}
      <div className="lg:col-span-3 space-y-2">
        <div className="bg-crowd-slate-950 border border-crowd-slate-800 rounded-2xl p-4 space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-crowd-slate-500 px-3 mb-2">
            Knowledge Navigation
          </h3>
          <button
            onClick={() => setActiveSubTab('qa')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${
              activeSubTab === 'qa'
                ? 'bg-stadium-green-600/10 text-stadium-green-400 border-l-2 border-stadium-green-500 pl-3.5'
                : 'text-crowd-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Cpu className="w-4 h-4" />
            AI Copilot Q&A
          </button>
          <button
            onClick={() => setActiveSubTab('articles')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${
              activeSubTab === 'articles'
                ? 'bg-stadium-green-600/10 text-stadium-green-400 border-l-2 border-stadium-green-500 pl-3.5'
                : 'text-crowd-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Knowledge Articles
          </button>
          <button
            onClick={() => setActiveSubTab('sops')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${
              activeSubTab === 'sops'
                ? 'bg-stadium-green-600/10 text-stadium-green-400 border-l-2 border-stadium-green-500 pl-3.5'
                : 'text-crowd-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            SOP Checklists
          </button>
          <button
            onClick={() => setActiveSubTab('faqs')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all ${
              activeSubTab === 'faqs'
                ? 'bg-stadium-green-600/10 text-stadium-green-400 border-l-2 border-stadium-green-500 pl-3.5'
                : 'text-crowd-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            FAQ Directory
          </button>
        </div>
      </div>

      {/* Main content display window */}
      <div className="lg:col-span-9 space-y-6">
        {activeSubTab === 'qa' && (
          <div className="bg-crowd-slate-950 border border-crowd-slate-800 rounded-2xl p-6 space-y-6 animate-fade-in">
            <div className="flex items-start justify-between border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-stadium-green-400 animate-pulse" />
                  AI Guidance Generator
                </h3>
                <p className="text-xs text-crowd-slate-400 mt-1">
                  Ask natural language questions to generate instant, context-aware operational
                  guidance.
                </p>
              </div>
              <span className="text-[10px] bg-white/5 text-slate-400 border border-white/10 px-2 py-0.5 rounded uppercase font-mono font-bold tracking-wider">
                Vertex Search / Gemini RAG
              </span>
            </div>

            <form onSubmit={handleGenerateGuidance} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={qaQuery}
                  onChange={(e) => setQaQuery(e.target.value)}
                  placeholder="e.g. What is the procedure if a spectator passes out or loses a ticket?"
                  className="w-full bg-crowd-slate-900 border border-crowd-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder:text-crowd-slate-500 focus:outline-none focus:border-stadium-green-500 transition-colors pr-12"
                />
                <button
                  type="submit"
                  disabled={isGeneratingGuidance || !qaQuery.trim()}
                  className="absolute right-2 top-2 p-2 bg-stadium-green-600 hover:bg-stadium-green-500 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setQaQuery('How do we handle emergency gate evacuation?')}
                  className="text-xs bg-white/5 hover:bg-white/10 text-crowd-slate-300 px-3 py-1.5 rounded-lg border border-white/5 transition-colors"
                >
                  "Emergency Evacuation"
                </button>
                <button
                  type="button"
                  onClick={() => setQaQuery('What to do if scanner offline?')}
                  className="text-xs bg-white/5 hover:bg-white/10 text-crowd-slate-300 px-3 py-1.5 rounded-lg border border-white/5 transition-colors"
                >
                  "Scanner Connection Issue"
                </button>
              </div>
            </form>

            {isGeneratingGuidance && (
              <div className="py-8 flex flex-col items-center justify-center space-y-3">
                <div className="w-8 h-8 border-2 border-stadium-green-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-crowd-slate-400 animate-pulse">
                  Consulting knowledge graph & generating synthesis...
                </p>
              </div>
            )}

            {qaResponse && (
              <div className="bg-crowd-slate-900/50 border border-crowd-slate-800/80 rounded-xl p-5 space-y-4 animate-slide-up">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-stadium-green-500 animate-ping"></span>
                    <span className="text-xs font-bold text-stadium-green-400">
                      Response Synthesized
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-crowd-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {qaResponse.processingTime} ms
                    </span>
                    <span>Confidence: {qaResponse.confidence}%</span>
                  </div>
                </div>

                <div className="text-sm text-slate-200 leading-relaxed font-medium">
                  {qaResponse.answer}
                </div>

                {qaResponse.referencedArticleIds.length > 0 && (
                  <div className="border-t border-white/5 pt-3 mt-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-crowd-slate-500 mb-2">
                      Referenced System Materials
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {qaResponse.referencedArticleIds.map((id) => (
                        <div
                          key={id}
                          className="flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-slate-300 font-mono cursor-pointer hover:bg-white/10 transition-colors"
                          onClick={() => {
                            setActiveSubTab('articles')
                            setSearchQuery(id)
                            setSearchType('hybrid')
                            setCategoryFilter('ALL')
                            runSearch(id, 'hybrid', 'ALL')
                          }}
                        >
                          <FileText className="w-3.5 h-3.5 text-stadium-green-500" />
                          {id}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'articles' && (
          <div className="space-y-6 animate-fade-in">
            {/* Search filter controls */}
            <div className="bg-crowd-slate-950 border border-crowd-slate-800 rounded-2xl p-5 space-y-4">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles e.g. Gate, Evacuation, Scanner..."
                    className="w-full bg-crowd-slate-900 border border-crowd-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-crowd-slate-500 focus:outline-none focus:border-stadium-green-500 transition-colors"
                  />
                  <Search className="absolute right-3.5 top-3 w-4.5 h-4.5 text-crowd-slate-500" />
                </div>
                <button
                  type="submit"
                  className="bg-stadium-green-600 hover:bg-stadium-green-500 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-lg"
                >
                  Search
                </button>
              </form>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4">
                {/* Search Type Switcher */}
                <div className="flex items-center gap-2 bg-crowd-slate-900 border border-crowd-slate-800 p-1 rounded-lg text-xs">
                  <button
                    onClick={() => handleSearchTypeChange('semantic')}
                    className={`px-3 py-1 rounded ${
                      searchType === 'semantic'
                        ? 'bg-stadium-green-600 text-white font-bold'
                        : 'text-crowd-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Semantic
                  </button>
                  <button
                    onClick={() => handleSearchTypeChange('keyword')}
                    className={`px-3 py-1 rounded ${
                      searchType === 'keyword'
                        ? 'bg-stadium-green-600 text-white font-bold'
                        : 'text-crowd-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Keyword
                  </button>
                  <button
                    onClick={() => handleSearchTypeChange('hybrid')}
                    className={`px-3 py-1 rounded ${
                      searchType === 'hybrid'
                        ? 'bg-stadium-green-600 text-white font-bold'
                        : 'text-crowd-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Hybrid AI
                  </button>
                </div>

                {/* Category filters */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-crowd-slate-500 flex items-center gap-1 font-medium">
                    <Filter className="w-3.5 h-3.5" /> Filter Category:
                  </span>
                  <div className="flex gap-1.5">
                    {['ALL', 'SOP', 'Emergency', 'FAQ', 'Venue'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryFilterChange(cat as KnowledgeCategory | 'ALL')}
                        className={`px-2.5 py-1 rounded-md border text-[11px] font-bold uppercase transition-colors ${
                          categoryFilter === cat
                            ? 'bg-white/10 text-white border-white/20'
                            : 'bg-transparent text-crowd-slate-400 border-crowd-slate-800 hover:border-crowd-slate-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results pane */}
            <div className="space-y-4">
              {isSearching ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-2 bg-crowd-slate-950 border border-crowd-slate-800 rounded-2xl">
                  <div className="w-6 h-6 border-2 border-stadium-green-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs text-crowd-slate-400 font-medium">
                    Executing hybrid vector match...
                  </span>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs text-crowd-slate-400 font-bold">
                      {searchResults.length} Match{searchResults.length > 1 ? 'es' : ''} Found
                    </span>
                    <span className="text-[10px] text-stadium-green-400 uppercase font-mono font-bold tracking-wider">
                      Sorted by relevance score
                    </span>
                  </div>

                  {searchResults.map((res) => (
                    <div
                      key={res.article.articleId}
                      className="bg-crowd-slate-950 border border-crowd-slate-800/80 hover:border-crowd-slate-700/80 rounded-2xl p-5 space-y-3 transition-all hover:translate-y-[-2px]"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="bg-stadium-green-950 text-stadium-green-400 border border-stadium-green-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                              {res.article.category}
                            </span>
                            <span className="text-slate-400 text-xs font-mono">
                              {res.article.articleId}
                            </span>
                            <span className="text-[10px] bg-white/5 border border-white/10 text-crowd-slate-400 px-1.5 py-0.5 rounded font-mono">
                              v{res.article.version}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-slate-100 mt-1">
                            {res.article.title}
                          </h4>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-bold text-stadium-green-400">
                            {res.score}% Match
                          </div>
                          <div className="text-[9px] text-crowd-slate-500 uppercase tracking-widest font-bold font-mono">
                            {res.searchType}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-crowd-slate-300 leading-relaxed font-medium">
                        {res.article.content}
                      </p>

                      <div className="flex flex-wrap items-center justify-between border-t border-white/5 pt-3 gap-2">
                        {/* Matched terms */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-crowd-slate-500 font-bold uppercase tracking-wider">
                            Matched:
                          </span>
                          <div className="flex gap-1">
                            {res.matchedTerms.map((term, i) => (
                              <span
                                key={i}
                                className="text-[10px] bg-stadium-green-950/40 text-stadium-green-400 px-2 py-0.5 rounded border border-stadium-green-900/30"
                              >
                                {term}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Article Tags */}
                        <div className="flex items-center gap-1 text-[11px] text-crowd-slate-400">
                          <Tag className="w-3 h-3 text-crowd-slate-500" />
                          {res.article.tags.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-2 bg-crowd-slate-950 border border-crowd-slate-800 rounded-2xl text-center">
                  <Info className="w-8 h-8 text-crowd-slate-500" />
                  <span className="text-sm text-slate-300 font-bold">No Match Found</span>
                  <span className="text-xs text-crowd-slate-500">
                    Try adjusting filters or typing alternative keywords.
                  </span>
                </div>
              ) : (
                <div className="space-y-4">
                  {articles.map((art) => (
                    <div
                      key={art.articleId}
                      className="bg-crowd-slate-950 border border-crowd-slate-800 rounded-2xl p-5 space-y-3"
                    >
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-stadium-green-950 text-stadium-green-400 border border-stadium-green-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                            {art.category}
                          </span>
                          <span className="text-slate-400 text-xs font-mono">{art.articleId}</span>
                          <span className="text-[10px] bg-white/5 border border-white/10 text-crowd-slate-400 px-1.5 py-0.5 rounded font-mono">
                            v{art.version}
                          </span>
                        </div>
                        <span className="text-[10px] text-crowd-slate-500 font-mono">
                          Last Updated: {new Date(art.lastUpdatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-100">{art.title}</h4>
                      <p className="text-sm text-crowd-slate-300 leading-relaxed font-medium">
                        {art.content}
                      </p>
                      <div className="flex justify-between items-center border-t border-white/5 pt-3 text-[11px] text-crowd-slate-400 flex-wrap gap-2">
                        <div className="flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5 text-crowd-slate-500" />
                          {art.tags.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeSubTab === 'sops' && (
          <div className="space-y-6 animate-fade-in">
            {sops.map((sop) => (
              <div
                key={sop.docId}
                className="bg-crowd-slate-950 border border-crowd-slate-800 rounded-2xl p-6 space-y-4"
              >
                <div className="flex justify-between items-start flex-wrap gap-2 border-b border-white/5 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[9px] font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                        SOP Standard
                      </span>
                      <span className="text-slate-400 text-xs font-mono font-semibold">
                        {sop.code}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-100 mt-1">{sop.title}</h4>
                  </div>
                  <span className="text-[10px] bg-white/5 text-crowd-slate-400 px-2 py-1 rounded font-mono">
                    ID: {sop.docId}
                  </span>
                </div>

                <div className="space-y-2">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-crowd-slate-500">
                    Execution Steps Checklist
                  </h5>
                  <div className="space-y-2">
                    {sop.steps.map((step, idx) => (
                      <label
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-crowd-slate-900 border border-crowd-slate-800/60 rounded-xl cursor-pointer hover:border-crowd-slate-700 transition-colors"
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5 rounded border-crowd-slate-800 text-stadium-green-600 focus:ring-stadium-green-500 focus:ring-offset-crowd-slate-950"
                        />
                        <span className="text-xs text-slate-300 font-medium leading-relaxed">
                          {step}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {sop.criticalNotes && (
                  <div className="bg-rose-950/20 border border-rose-900/30 p-4 rounded-xl flex items-start gap-3">
                    <span className="text-xs bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded font-mono">
                      CRITICAL
                    </span>
                    <p className="text-xs text-rose-300 font-medium leading-relaxed">
                      {sop.criticalNotes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'faqs' && (
          <div className="space-y-4 animate-fade-in">
            {faqs.map((faq) => (
              <details
                key={faq.faqId}
                className="group bg-crowd-slate-950 border border-crowd-slate-800 rounded-2xl p-4 transition-all [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-stadium-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[9px] bg-white/5 border border-white/10 text-crowd-slate-400 px-2 py-0.5 rounded font-mono uppercase font-bold tracking-wider">
                        {faq.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-200 mt-1 leading-relaxed">
                        {faq.question}
                      </h4>
                    </div>
                  </div>
                  <span className="ml-1.5 flex-shrink-0 transition-transform duration-300 group-open:-rotate-180">
                    <ArrowRight className="w-4 h-4 text-crowd-slate-400 rotate-90" />
                  </span>
                </summary>

                <div className="mt-4 border-t border-white/5 pt-3 pl-8">
                  <p className="text-xs text-crowd-slate-300 leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                  <div className="flex justify-between items-center mt-3 text-[10px] text-crowd-slate-500 font-mono">
                    <span>ID: {faq.faqId}</span>
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
