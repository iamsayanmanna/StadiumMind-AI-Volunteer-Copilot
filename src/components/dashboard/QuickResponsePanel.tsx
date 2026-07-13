import React from 'react'
import type { QuickResponseTemplate } from '@/types/communication'
import { Reply } from 'lucide-react'

interface QuickResponsePanelProps {
  templates: QuickResponseTemplate[]
  onSelect: (template: QuickResponseTemplate) => void
}

export const QuickResponsePanel: React.FC<QuickResponsePanelProps> = ({ templates, onSelect }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col h-[350px]">
      <div className="border-b border-white/5 pb-3">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Reply className="w-4 h-4 text-stadium-green-400" />
          Quick Responses
        </h3>
        <p className="text-[10px] text-crowd-slate-450 uppercase tracking-wider">
          Pre-translated announcements
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {templates.map((temp) => (
          <div
            key={temp.templateId}
            onClick={() => onSelect(temp)}
            className="p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 transition-all cursor-pointer space-y-1 text-left"
          >
            <div className="flex justify-between items-center">
              <span className="text-[8px] bg-crowd-slate-900 border border-crowd-slate-700 px-1.5 py-0.5 rounded font-mono text-crowd-slate-400">
                {temp.category}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-200">{temp.englishText}</p>
            <p className="text-[10px] text-stadium-green-400 font-medium font-mono dir-rtl">
              {temp.translatedText}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
