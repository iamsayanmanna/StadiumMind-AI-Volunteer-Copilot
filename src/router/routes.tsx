/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { ProtectedRoute, SkeletonLoader } from '@/components/shared'

// Lazy load layout pages
const Login = React.lazy(() => import('@/pages/Login'))
const Dashboard = React.lazy(() => import('@/pages/Dashboard'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))

// Suspense loading utility wrapper
const withSuspense = (Component: React.ComponentType) => (
  <Suspense
    fallback={
      <div className="max-w-7xl mx-auto px-4 py-6">
        <SkeletonLoader />
      </div>
    }
  >
    <Component />
  </Suspense>
)

export const routes: RouteObject[] = [
  {
    path: ROUTES.DASHBOARD,
    element: <ProtectedRoute>{withSuspense(Dashboard)}</ProtectedRoute>,
  },
  {
    path: ROUTES.LOGIN,
    element: withSuspense(Login),
  },
  {
    path: '*',
    element: withSuspense(NotFound),
  },
]
