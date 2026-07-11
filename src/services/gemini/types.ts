export interface GenerationConfig {
  temperature?: number
  topK?: number
  topP?: number
  maxOutputTokens?: number
  responseMimeType?: 'text/plain' | 'application/json'
  responseSchema?: Record<string, unknown>
}

export interface PromptRequest {
  promptText: string
  systemInstruction?: string
  config?: GenerationConfig
}

export interface GeminiResponse<T = string> {
  content: T
  usageMetadata?: {
    promptTokenCount: number
    candidatesTokenCount: number
    totalTokenCount: number
  }
}

export type CopilotModel = 'gemini-2.5-flash' | 'gemini-2.5-pro'
