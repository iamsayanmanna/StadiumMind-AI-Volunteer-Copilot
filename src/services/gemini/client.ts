import { GoogleGenAI } from '@google/genai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey && import.meta.env.DEV) {
  console.warn(
    'Google GenAI SDK: API Key is missing. ' +
      'Please set VITE_GEMINI_API_KEY in your .env.local to invoke real models. ' +
      'Falling back to mock services.'
  )
}

// Instantiate client if API key is present.
// Note: If null, the application will use the mock service.
export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null
