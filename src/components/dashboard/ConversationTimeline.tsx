import React from 'react'
import type { CommunicationMessage } from '@/types/communication'
import { Check, CheckCheck } from 'lucide-react'

interface ConversationTimelineProps {
  messages: CommunicationMessage[]
  activeUserId: string
}

export const ConversationTimeline: React.FC<ConversationTimelineProps> = ({
  messages,
  activeUserId,
}) => {
  const getStatusIcon = (status: CommunicationMessage['status']) => {
    switch (status) {
      case 'Sending':
        return <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-ping" />
      case 'Sent':
        return <Check className="w-3 h-3 text-slate-400" />
      case 'Delivered':
        return <CheckCheck className="w-3 h-3 text-slate-400" />
      case 'Read':
        return <CheckCheck className="w-3 h-3 text-stadium-green-400" />
      default:
        return <span className="text-red-500 text-[8px]">!</span>
    }
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar min-h-[220px]">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-crowd-slate-500 py-8">
          <p className="text-xs font-semibold">No messages yet</p>
          <p className="text-[10px] text-crowd-slate-650">
            Select quick replies or type a message below.
          </p>
        </div>
      ) : (
        messages.map((msg, idx) => {
          const isMe = msg.senderId === activeUserId
          return (
            <div
              key={`${msg.messageId}-${idx}`}
              className={`flex flex-col max-w-[80%] ${isMe ? 'self-end ml-auto text-right' : 'self-start mr-auto text-left'}`}
            >
              <div
                className={`p-3 rounded-2xl border text-left ${
                  isMe
                    ? 'bg-stadium-green-950/20 border-stadium-green-800 text-slate-100 rounded-tr-none'
                    : 'bg-crowd-slate-900/50 border-crowd-slate-800 text-slate-100 rounded-tl-none'
                }`}
              >
                <p className="text-xs font-medium leading-relaxed">{msg.content}</p>
                {msg.translatedContent && (
                  <p className="text-[10px] text-stadium-green-400 font-mono mt-1 pt-1 border-t border-white/5">
                    {msg.translatedContent}
                  </p>
                )}
              </div>

              {/* Status and timestamp */}
              <div
                className={`flex items-center gap-1 mt-1 text-[8px] text-crowd-slate-500 justify-end`}
              >
                <span>
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {isMe && getStatusIcon(msg.status)}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
