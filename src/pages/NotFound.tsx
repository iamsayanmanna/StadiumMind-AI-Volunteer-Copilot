import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ROUTES } from '@/constants/routes'

/**
 * 404 Fallback page.
 * Uses useDocumentTitle and redirects users to dashboard/login depending on auth status.
 */
const NotFound: React.FC = () => {
  useDocumentTitle('Page Not Found')
  const { user } = useAuth()

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-panel p-8 rounded-2xl text-center space-y-6 border-warning-orange-500/20 shadow-premium animate-slide-up">
        {/* Not Found Indicator */}
        <div className="h-16 w-16 bg-warning-orange-600/10 border border-warning-orange-500/30 rounded-full flex items-center justify-center mx-auto text-warning-orange-500 text-2xl font-bold">
          ?
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Path Not Found</h2>
          <p className="text-xs text-crowd-slate-400 leading-relaxed">
            The requested operational layout could not be located in the volunteer copilot
            directory.
          </p>
        </div>

        <Link
          to={user ? ROUTES.DASHBOARD : ROUTES.LOGIN}
          className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-stadium-green-600 hover:bg-stadium-green-500 cursor-pointer shadow-premium transition-colors focus:outline-none focus:ring-1 focus:ring-stadium-green-500"
        >
          {user ? 'Return to Dashboard' : 'Return to Login'}
        </Link>
      </div>
    </div>
  )
}

export default NotFound
export { NotFound }
