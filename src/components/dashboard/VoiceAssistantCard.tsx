import React, { useState } from 'react'
import type { LanguageProfile, VoiceCommunicationSession } from '@/types/communication'
import { LanguageSelector } from './LanguageSelector'
import { Mic, Volume2, Loader2 } from 'lucide-react'

interface VoiceAssistantCardProps {
  languages: LanguageProfile[]
  onVoiceSession: (lang: string) => Promise<VoiceCommunicationSession>
}

export const VoiceAssistantCard: React.FC<VoiceAssistantCardProps> = ({
  languages,
  onVoiceSession,
}) => {
  const [selectedLang, setSelectedLang] = useState('ar')
  const [isRecording, setIsRecording] = useState(false)
  const [session, setSession] = useState<VoiceCommunicationSession | null>(null)

  const handleStartSession = async () => {
    setIsRecording(true)
    try {
      const res = await onVoiceSession(selectedLang)
      setSession(res)
    } catch (e) {
      console.error(e)
    } finally {
      setIsRecording(false)
    }
  }

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col h-[350px] justify-between relative overflow-hidden">
      <div className="space-y-4">
        {/* Header */}
        <div className="border-b border-white/5 pb-3">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Mic className="w-4 h-4 text-stadium-green-400 animate-pulse" />
            Voice Assistant Console
          </h3>
          <p className="text-[10px] text-crowd-slate-450 uppercase tracking-wider">
            Speech translation aid
          </p>
        </div>

        <div className="w-full">
          <LanguageSelector
            label="Speak In"
            languages={languages.filter((l) => l.isSupportedForVoice)}
            selectedCode={selectedLang}
            onChange={(code) => setSelectedLang(code)}
          />
        </div>

        {/* Waves Animation */}
        {isRecording && (
          <div className="flex justify-center items-center gap-1 py-4 h-[70px]">
            <div className="w-1 h-8 bg-stadium-green-500 animate-pulse" />
            <div className="w-1 h-12 bg-stadium-green-500 animate-pulse delay-75" />
            <div className="w-1 h-6 bg-stadium-green-500 animate-pulse delay-150" />
            <div className="w-1 h-10 bg-stadium-green-500 animate-pulse delay-200" />
          </div>
        )}

        {/* Translation Speech outputs */}
        {session && !isRecording && (
          <div className="bg-white/5 border border-white/5 p-3.5 rounded-xl space-y-2">
            <div className="space-y-0.5">
              <span className="text-[9px] uppercase font-bold text-crowd-slate-500">
                Transcript
              </span>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {session.transcript}
              </p>
            </div>
            {session.responseText && (
              <div className="space-y-0.5 border-t border-white/5 pt-2 flex items-center gap-2">
                <div className="flex-1">
                  <span className="text-[9px] uppercase font-bold text-stadium-green-400">
                    Response Playback
                  </span>
                  <p className="text-xs text-stadium-green-400 font-medium leading-relaxed font-mono">
                    {session.responseText}
                  </p>
                </div>
                <Volume2 className="w-4 h-4 text-stadium-green-400 flex-shrink-0 animate-bounce" />
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={handleStartSession}
        disabled={isRecording}
        className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
          isRecording
            ? 'bg-alert-red-650 text-white'
            : 'bg-stadium-green-600 hover:bg-stadium-green-500 text-white focus:outline-none focus:ring-1 focus:ring-stadium-green-400'
        }`}
      >
        {isRecording ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Listening to voice input...
          </>
        ) : (
          'Simulate Mic Record'
        )}
      </button>
    </div>
  )
}
