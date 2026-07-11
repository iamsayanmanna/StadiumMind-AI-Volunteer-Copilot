import { createContext, useContext } from 'react'
import type { VolunteerProfile } from '@/types'

export interface StoredSession {
  user: VolunteerProfile
  loginTime: number
  rememberMe: boolean
}

export interface AuthContextType {
  user: VolunteerProfile | null
  loading: boolean
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>
  logout: (sessionExpired?: boolean) => void
  expiredNotification: boolean
  clearExpiredNotification: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
