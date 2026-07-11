import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled rendering error:', error, errorInfo)
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-crowd-slate-950 text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full glass-panel border-alert-red-500/20 p-8 rounded-2xl text-center space-y-6 alert-glow-critical animate-slide-up">
            {/* Warning Indicator */}
            <div className="h-16 w-16 bg-alert-red-600/10 border border-alert-red-500/30 rounded-full flex items-center justify-center mx-auto text-alert-red-500 text-3xl font-bold">
              !
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tight text-slate-100">
                Application Crash Detected
              </h2>
              <p className="text-xs text-crowd-slate-400 leading-relaxed">
                StadiumMind encountered an unexpected layout rendering exception. Operational safety
                logs have been captured in the browser console.
              </p>
            </div>

            {this.state.error && (
              <details className="text-left bg-black/40 rounded-lg p-3 text-[10px] text-slate-400 font-mono max-h-32 overflow-y-auto border border-white/5">
                <summary className="cursor-pointer font-sans font-medium text-xs text-slate-300 select-none pb-1">
                  View Error Diagnostics
                </summary>
                <p className="whitespace-pre-wrap leading-normal pt-1 text-alert-red-400">
                  {this.state.error.toString()}
                </p>
              </details>
            )}

            <button
              onClick={this.handleReload}
              className="w-full inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-alert-red-600 hover:bg-alert-red-500 cursor-pointer shadow-premium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-alert-red-500"
            >
              Reload Application
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
