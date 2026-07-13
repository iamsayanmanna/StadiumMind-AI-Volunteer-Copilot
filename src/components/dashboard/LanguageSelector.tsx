import React from 'react'
import type { LanguageProfile } from '@/types/communication'

interface LanguageSelectorProps {
  languages: LanguageProfile[]
  selectedCode: string
  onChange: (code: string) => void
  label: string
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedCode,
  onChange,
  label,
}) => {
  return (
    <div className="space-y-1.5 text-left w-full">
      <label className="block text-[10px] font-semibold text-crowd-slate-400 uppercase tracking-wider">
        {label}
      </label>
      <select
        value={selectedCode}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg text-xs bg-crowd-slate-950 border border-crowd-slate-700 text-slate-100 focus:outline-none focus:border-stadium-green-500 focus:ring-1 focus:ring-stadium-green-500 transition-all"
      >
        {languages.map((lang) => (
          <option key={lang.languageCode} value={lang.languageCode}>
            {lang.name} ({lang.nativeName})
          </option>
        ))}
      </select>
    </div>
  )
}
