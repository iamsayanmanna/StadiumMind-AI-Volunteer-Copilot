import type {
  LanguageProfile,
  QuickResponseTemplate,
  CommunicationMessage,
  EmergencyBroadcast,
  Conversation,
} from '@/types/communication'

export const SUPPORTED_LANGUAGES: LanguageProfile[] = [
  { languageCode: 'en', name: 'English', nativeName: 'English', isSupportedForVoice: true },
  { languageCode: 'ar', name: 'Arabic', nativeName: 'العربية', isSupportedForVoice: true },
  { languageCode: 'es', name: 'Spanish', nativeName: 'Español', isSupportedForVoice: true },
  { languageCode: 'fr', name: 'French', nativeName: 'Français', isSupportedForVoice: true },
  { languageCode: 'zh', name: 'Chinese', nativeName: '中文', isSupportedForVoice: false },
]

export const MOCK_QUICK_RESPONSES: QuickResponseTemplate[] = [
  {
    templateId: 'QR-001',
    category: 'Directives',
    englishText: 'Please queue in an orderly fashion at Gate D.',
    translatedText: 'الرجاء الوقوف في الطابور بنظام عند البوابة D.',
  },
  {
    templateId: 'QR-002',
    category: 'Medical',
    englishText: 'First aid unit has been dispatched to your sector.',
    translatedText: 'تم إرسال وحدة الإسعافات الأولية إلى قطاعك.',
  },
  {
    templateId: 'QR-003',
    category: 'Security',
    englishText: 'Please present your stadium badge for validation.',
    translatedText: 'الرجاء إبراز بطاقة الاستاد الخاصة بك للتحقق.',
  },
  {
    templateId: 'QR-004',
    category: 'Directions',
    englishText: 'Restrooms are located on the upper concourse level.',
    translatedText: 'تقع المراحيض في مستوى البهو العلوي.',
  },
]

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    conversationId: 'CONV-001',
    participants: ['volunteer-104', 'coordinator-001'],
    lastMessageAt: new Date(Date.now() - 300000).toISOString(), // 5 mins ago
    lastMessageText: 'Sector B checkpoint is operating normally.',
  },
]

export const MOCK_INITIAL_MESSAGES: CommunicationMessage[] = [
  {
    messageId: 'MSG-001',
    senderId: 'coordinator-001',
    recipientId: 'volunteer-104',
    content: 'Gate Marshal, confirm crowd density at sector entry.',
    translatedContent: 'مارشال البوابة، أكد كثافة الحشود عند مدخل القطاع.',
    sourceLang: 'en',
    targetLang: 'ar',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    status: 'Read',
  },
  {
    messageId: 'MSG-002',
    senderId: 'volunteer-104',
    recipientId: 'coordinator-001',
    content: 'Sector B checkpoint is operating normally.',
    translatedContent: 'نقطة تفتيش القطاع B تعمل بشكل طبيعي.',
    sourceLang: 'en',
    targetLang: 'ar',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    status: 'Read',
  },
]

export const MOCK_EMERGENCY_BROADCASTS: EmergencyBroadcast[] = [
  {
    broadcastId: 'BC-101',
    senderId: 'admin-001',
    scopeSector: 'All Sectors',
    severity: 'Alert',
    message: 'General alert: Shift rotation active. Report status feeds to your coordinators.',
    dispatchedAt: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
  },
]

export const MOCK_TRANSLATION_MAP: Record<string, string> = {
  hello: 'مرحبا',
  'how are you?': 'كيف حالك؟',
  'where is the medical station?': 'أين تقع المحطة الطبية؟',
  'exit gate is closed': 'بوابة الخروج مغلقة',
  'please wait': 'الرجاء الانتظار',
}
