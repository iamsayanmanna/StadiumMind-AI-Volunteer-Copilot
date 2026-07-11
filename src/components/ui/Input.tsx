import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

/**
 * Accessible React input wrapper with ref forwarding for React Hook Form.
 * Automates ARIA accessibility mappings for validation errors.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || Math.random().toString(36).substring(2, 9)
    const errorId = `${inputId}-error`

    return (
      <div className="space-y-1.5 w-full text-left">
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-crowd-slate-400 uppercase tracking-wider"
        >
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-crowd-slate-950 border border-crowd-slate-700 text-slate-100 placeholder-crowd-slate-600 focus:outline-none focus:border-stadium-green-500 focus:ring-1 focus:ring-stadium-green-500 disabled:opacity-50 transition-all ${
            error
              ? 'border-alert-red-500/80 focus:border-alert-red-500 focus:ring-alert-red-500'
              : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className="text-xs text-alert-red-500 font-medium tracking-wide animate-slide-up"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
