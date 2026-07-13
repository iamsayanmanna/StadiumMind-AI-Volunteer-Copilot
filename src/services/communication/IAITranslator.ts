import type { TranslationResult } from '@/types/communication'

export interface IAITranslator {
  translateText(text: string, targetLang: string): Promise<TranslationResult>
  detectLanguage(text: string): Promise<string>
}
