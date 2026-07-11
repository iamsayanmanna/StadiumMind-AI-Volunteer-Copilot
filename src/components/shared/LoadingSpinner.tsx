import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text = 'Processing operational data...',
}) => {
  const spinnerSizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-3">
      <div className={`relative ${spinnerSizes[size]}`}>
        {/* Outer glowing track */}
        <div className="absolute inset-0 rounded-full border-2 border-white/5"></div>
        {/* Inner spinning stadium color line */}
        <div className="absolute inset-0 rounded-full border-2 border-t-stadium-green-500 border-r-energy-gold-500 animate-spin"></div>
      </div>
      {text && (
        <span className="text-xs font-medium tracking-wide text-crowd-slate-400 animate-pulse-slow">
          {text}
        </span>
      )}
    </div>
  )
}
