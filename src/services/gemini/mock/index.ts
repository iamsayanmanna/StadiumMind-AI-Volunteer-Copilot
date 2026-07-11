import type { GeminiResponse } from '../types'

/**
 * Mock delay helper to simulate network and generative latency.
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Mock crowd density and gate risk analysis.
 */
export const mockAnalyzeCrowdStatus = async (rawReport: string): Promise<GeminiResponse> => {
  await delay(1200) // Simulate AI model thinking time
  return {
    content:
      `### MOCK OPERATIONAL ASSESSMENT\n` +
      `**Raw Input:** "${rawReport}"\n\n` +
      `**Risk Category:** MEDIUM\n` +
      `**Crowd Status:** Queuing pressure detected at gate bottleneck.\n\n` +
      `**Recommended Actions:**\n` +
      `- Redirect non-ticket holders away from current turnstile queues.\n` +
      `- Mobilize standard sector-C volunteers to guide crowd flow.\n` +
      `- Broadcast visual directional signs.`,
    usageMetadata: {
      promptTokenCount: 64,
      candidatesTokenCount: 112,
      totalTokenCount: 176,
    },
  }
}

/**
 * Mock translation and pronunciation guide response.
 */
export const mockTranslatePhrase = async (
  phrase: string,
  targetLanguage: string
): Promise<GeminiResponse> => {
  await delay(800)
  return {
    content:
      `### MOCK TRANSLATION\n` +
      `**Source:** "${phrase}"\n` +
      `**Target Language:** ${targetLanguage}\n\n` +
      `**Translated Text:** "مرحباً بكم في استاد لوسيل، يرجى تجهيز التذاكر الخاصة بكم"\n` +
      `**Pronunciation:** "Marhaban bikum fee istad Lusail, yurja tajheez al-tathakir..."\n\n` +
      `**Context Note:** Standard stadium welcome phrase with formal hospitality tone.`,
    usageMetadata: {
      promptTokenCount: 45,
      candidatesTokenCount: 95,
      totalTokenCount: 140,
    },
  }
}
