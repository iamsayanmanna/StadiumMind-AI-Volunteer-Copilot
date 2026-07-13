import React, { useState } from 'react'
import type { CommunicationMessage, LanguageProfile } from '@/types/communication'
import { ConversationTimeline } from './ConversationTimeline'
import { LanguageSelector } from './LanguageSelector'
import { MessageSquare, Send } from 'lucide-react'

interface CommunicationCenterProps {
  messages: CommunicationMessage[]
  activeUserId: string
  onSendMessage: (text: string) => void
  languages: LanguageProfile[]
  selectedTargetLang: string
  onTargetLangChange: (langCode: string) => void
}

export const CommunicationCenter: React.FC<CommunicationCenterProps> = ({
  messages,
  activeUserId,
  onSendMessage,
  languages,
  selectedTargetLang,
  onTargetLangChange,
}) => {
  const [inputText, setInputText] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return
    onSendMessage(inputText)
    setInputText('')
  }

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col h-[400px]">
      {/* Header and language select */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/5 pb-3">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-stadium-green-400" />
          Tactical Dispatch Chat
        </h3>

        <div className="w-full sm:w-44">
          <LanguageSelector
            label="Translate Chat to"
            languages={languages}
            selectedCode={selectedTargetLang}
            onChange={onTargetLangChange}
          />
        </div>
      </div>

      {/* Message Timeline */}
      <ConversationTimeline messages={messages} activeUserId={activeUserId} />

      {/* Input area */}
      <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-white/5">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type message to dispatch coordinator..."
          className="flex-1 px-3.5 py-2 rounded-lg text-xs bg-crowd-slate-950 border border-crowd-slate-700 text-slate-100 placeholder-crowd-slate-500 focus:outline-none focus:border-stadium-green-500 focus:ring-1 focus:ring-stadium-green-500 transition-all"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-stadium-green-600 hover:bg-stadium-green-500 text-white focus:outline-none focus:ring-1 focus:ring-stadium-green-400 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
