import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/constants/routes'
import { SkeletonLoader } from './SkeletonLoader'

interface ProtectedRouteProps {
  children: React.ReactElement
}

/**
 * Route guard component that checks the AuthContext state.
 * Shows a loading skeleton during initialization.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <SkeletonLoader />
      </div>
    )
  }

  if (!user) {
    // Redirect unauthenticated session to Login
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return children
}
