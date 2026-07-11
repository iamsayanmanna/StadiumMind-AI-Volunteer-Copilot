# StadiumMind API Specification

This document details the interfaces for external integrations (Firebase and Google Gemini).

## 1. Firebase Integration

### Anonymous Authentication

- **Hook/Service:** `signInAnonymously()`
- **Firebase Method:** `signInAnonymously(auth)`
- **Behavior:** Dynamically signs in local volunteer device. Resolves a `User` object.

### Firestore Collections

#### Collection: `crowd_reports`

Stores volunteer observations and AI hazard risk recommendations.

```typescript
interface CrowdReportDoc {
  id?: string
  reporterId: string
  sector: string // E.g., "Gate D", "Sector 104"
  description: string // Raw observation text
  alertLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  aiAnalysis?: {
    riskLevel: string
    summary: string
    recommendations: string[]
  }
  timestamp: string // ISO string
}
```

---

## 2. Gemini Integration (Google GenAI SDK)

### Initialization

- **Package:** `@google/genai`
- **Instance:** `new GoogleGenAI({ apiKey: string })`

### Content Generation Interface

- **Method:** `ai.models.generateContent`
- **Parameters:**

```typescript
interface GenerateContentParams {
  model: 'gemini-2.5-flash' | 'gemini-2.5-pro'
  contents: string | Array<{ text: string }>
  config?: {
    systemInstruction?: string
    temperature?: number
    responseMimeType?: 'application/json' | 'text/plain'
    responseSchema?: Record<string, unknown>
  }
}
```

- **Fallback Simulation:** Handled locally via `mockAnalyzeCrowdStatus` and `mockTranslatePhrase` when API keys are absent.
