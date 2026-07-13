import React, { useState } from 'react'
import type { LanguageProfile, TranslationResult } from '@/types/communication'
import { LanguageSelector } from './LanguageSelector'
import { Languages, Loader2 } from 'lucide-react'

interface TranslatorCardProps {
  languages: LanguageProfile[]
  onTranslate: (text: string, targetLang: string) => Promise<TranslationResult>
}

export const TranslatorCard: React.FC<TranslatorCardProps> = ({ languages, onTranslate }) => {
  const [inputText, setInputText] = useState('')
  const [targetLang, setTargetLang] = useState('ar')
  const [result, setResult] = useState<TranslationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTranslate = async () => {
    if (!inputText.trim()) return
    setIsLoading(true)
    try {
      const res = await onTranslate(inputText, targetLang)
      setResult(res)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col h-[400px] justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div className="border-b border-white/5 pb-3">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Languages className="w-4 h-4 text-stadium-green-400" />
            AI Translator Utility
          </h3>
          <p className="text-[10px] text-crowd-slate-450 uppercase tracking-wider">
            Quick text-to-text translations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-semibold text-crowd-slate-400 uppercase tracking-wider">
              Original Text Input
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter message to translate..."
              className="w-full px-3 py-2 rounded-lg text-xs bg-crowd-slate-950 border border-crowd-slate-700 text-slate-100 placeholder-crowd-slate-500 focus:outline-none focus:border-stadium-green-500 focus:ring-1 focus:ring-stadium-green-500 transition-all"
            />
          </div>

          <LanguageSelector
            label="Translate to"
            languages={languages}
            selectedCode={targetLang}
            onChange={(code) => setTargetLang(code)}
          />
        </div>

        {/* Translation Results */}
        {result && !isLoading && (
          <div className="bg-white/5 border border-white/5 p-3 rounded-xl space-y-2">
            <p className="text-[10px] uppercase font-bold text-stadium-green-400">
              Translation Result (Confidence: {result.confidence}%)
            </p>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              {result.translatedText}
            </p>
            <div className="flex justify-between items-center text-[8px] text-crowd-slate-500 font-mono">
              <span>Detected Language: {result.detectedLanguage}</span>
              <span>Processing time: {result.processingTime}</span>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleTranslate}
        disabled={isLoading || !inputText.trim()}
        className="w-full py-2.5 rounded-lg text-xs font-bold bg-stadium-green-600 hover:bg-stadium-green-500 text-white focus:outline-none focus:ring-1 focus:ring-stadium-green-400 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing & Translating...
          </>
        ) : (
          'Execute Translation'
        )}
      </button>
    </div>
  )
}
