export const ROUTES = {
  DASHBOARD: '/',
  LOGIN: '/login',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
