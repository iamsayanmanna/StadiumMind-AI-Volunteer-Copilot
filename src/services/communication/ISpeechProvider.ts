export interface ISpeechProvider {
  startSpeechToTextSession(langCode: string): Promise<string>
  synthesizeTextToSpeech(text: string, langCode: string): Promise<void>
}
