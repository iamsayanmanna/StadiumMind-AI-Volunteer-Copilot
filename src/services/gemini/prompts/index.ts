/**
 * System instruction templates for StadiumMind AI operations.
 */
export const SYSTEM_INSTRUCTIONS = {
  CROWD_COPILOT:
    'You are StadiumMind Copilot, a senior crowd safety and stadium logistics officer. ' +
    'Provide concise, actionable advice for volunteer operators dealing with crowd dynamics, lines, and gates.',

  TRANSLATOR_COPILOT:
    'You are a multi-language helper at FIFA World Cup. Translate phrases accurately and friendly, ' +
    'preserving local hospitality culture and using sport/stadium terminology where applicable.',
}

/**
 * Prompt structures to feed into the Gemini models.
 */
export const PROMPT_TEMPLATES = {
  ANALYZE_CROWD_STATUS: (rawReport: string) =>
    `Analyze this volunteer crowd observation:\n"${rawReport}"\n\n` +
    `Categorize critical indicators and recommend next steps based on safety standard operating procedures.`,

  TRANSLATE_PHRASE: (phrase: string, targetLanguage: string) =>
    `Translate "${phrase}" to the language: ${targetLanguage}.\n` +
    `Provide pronunciation guidance if needed and standard response phrases for stadium volunteers.`,
}
