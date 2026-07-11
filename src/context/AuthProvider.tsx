import React, { useState, useEffect, useCallback, useRef } from 'react'
import type { VolunteerProfile } from '@/types'
import { AUTH_KEYS, AUTH_CONFIG, MOCK_CREDENTIALS, MOCK_VOLUNTEER_PROFILE } from '@/constants/auth'
import { AuthContext } from './AuthContext'
import type { StoredSession } from './AuthContext'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<VolunteerProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [expiredNotification, setExpiredNotification] = useState(false)
  const checkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearExpiredNotification = useCallback(() => {
    setExpiredNotification(false)
  }, [])

  const logout = useCallback((sessionExpired = false) => {
    setUser(null)
    localStorage.removeItem(AUTH_KEYS.SESSION_STORAGE_KEY)
    if (sessionExpired) {
      setExpiredNotification(true)
    }
  }, [])

  const verifySession = useCallback(() => {
    const sessionStr = localStorage.getItem(AUTH_KEYS.SESSION_STORAGE_KEY)
    if (sessionStr) {
      try {
        const session: StoredSession = JSON.parse(sessionStr)
        const elapsed = Date.now() - session.loginTime
        if (elapsed > AUTH_CONFIG.SESSION_TIMEOUT_MS) {
          logout(true)
        } else {
          setUser(session.user)
          setExpiredNotification(false)
        }
      } catch {
        logout(false)
      }
    }
    setLoading(false)
  }, [logout])

  // Initialize and run periodic verification
  useEffect(() => {
    // Defer verifySession to avoid synchronous state updates in effect body
    const deferTimer = setTimeout(() => {
      verifySession()
    }, 0)

    checkIntervalRef.current = setInterval(() => {
      const sessionStr = localStorage.getItem(AUTH_KEYS.SESSION_STORAGE_KEY)
      if (sessionStr) {
        try {
          const session: StoredSession = JSON.parse(sessionStr)
          const elapsed = Date.now() - session.loginTime
          if (elapsed > AUTH_CONFIG.SESSION_TIMEOUT_MS) {
            logout(true)
          }
        } catch {
          logout(false)
        }
      }
    }, 10000) // Check every 10 seconds

    return () => {
      clearTimeout(deferTimer)
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current)
      }
    }
  }, [verifySession, logout])

  const login = useCallback(async (email: string, password: string, rememberMe: boolean) => {
    // Simulate network verification latency
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (
      email.toLowerCase() === MOCK_CREDENTIALS.email.toLowerCase() &&
      password === MOCK_CREDENTIALS.password
    ) {
      const profile = MOCK_VOLUNTEER_PROFILE
      setUser(profile)
      setExpiredNotification(false)

      const sessionData: StoredSession = {
        user: profile,
        loginTime: Date.now(),
        rememberMe,
      }

      localStorage.setItem(AUTH_KEYS.SESSION_STORAGE_KEY, JSON.stringify(sessionData))
    } else {
      throw new Error('Invalid email address or volunteer access code.')
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        expiredNotification,
        clearExpiredNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
