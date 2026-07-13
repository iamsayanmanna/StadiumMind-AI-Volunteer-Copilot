import type { IAITranslator } from './IAITranslator'
import type { TranslationResult } from '@/types/communication'
import { MOCK_TRANSLATION_MAP } from '@/constants/mockCommunication'

export class MockAITranslator implements IAITranslator {
  async translateText(text: string, targetLang: string): Promise<TranslationResult> {
    // Simulate minor engine processing latency of 500ms
    await new Promise((resolve) => setTimeout(resolve, 500))

    const query = text.trim().toLowerCase()
    let translatedText = `[Translated to ${targetLang}]: ${text}`
    let confidence = 85
    let detectedLanguage = 'en'

    if (MOCK_TRANSLATION_MAP[query]) {
      translatedText = MOCK_TRANSLATION_MAP[query]
      confidence = 98
      detectedLanguage = 'en'
    } else if (targetLang === 'en' && Object.values(MOCK_TRANSLATION_MAP).includes(text)) {
      const keys = Object.keys(MOCK_TRANSLATION_MAP)
      const foundKey = keys.find((key) => MOCK_TRANSLATION_MAP[key] === text)
      if (foundKey) {
        translatedText = foundKey
        confidence = 98
        detectedLanguage = 'ar'
      }
    }

    return {
      translatedText,
      confidence,
      detectedLanguage,
      processingTime: '120ms',
    }
  }

  async detectLanguage(text: string): Promise<string> {
    const isArabic = /[\u0600-\u06FF]/.test(text)
    return isArabic ? 'ar' : 'en'
  }
}
