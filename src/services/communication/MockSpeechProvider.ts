import type { ISpeechProvider } from './ISpeechProvider'

export class MockSpeechProvider implements ISpeechProvider {
  async startSpeechToTextSession(langCode: string): Promise<string> {
    // Simulate audio recording wait latency of 1200ms
    await new Promise((resolve) => setTimeout(resolve, 1200))

    if (langCode === 'ar') {
      return 'أين تقع المحطة الطبية؟'
    }
    return 'where is the medical station?'
  }

  async synthesizeTextToSpeech(text: string, langCode: string): Promise<void> {
    // Simulate speaker playback synthesis latency of 800ms
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.log(`[Mock TTS Playback] "${text}" synthesized in ${langCode}`)
  }
}
