import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ROUTES } from '@/constants/routes'
import { AUTH_CONFIG } from '@/constants/auth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

// Credentials schema validation using Zod
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address (e.g. name@fifa.com).'),
  password: z.string().min(6, 'Access code must be at least 6 characters.'),
  rememberMe: z.boolean(),
})

type LoginFormInputs = z.infer<typeof loginSchema>

const Login: React.FC = () => {
  useDocumentTitle('Login')
  const { user, login, expiredNotification, clearExpiredNotification } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  // Lockout & loading management local states
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const isLoginCancelledRef = useRef(false)

  // Prepopulate email if "Remember Me" email was stored
  const getRememberedEmail = () => {
    try {
      return localStorage.getItem('stadiummind_remembered_email') || ''
    } catch {
      return ''
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: getRememberedEmail(),
      password: '',
      rememberMe: !!getRememberedEmail(),
    },
  })

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate(ROUTES.DASHBOARD)
    }
  }, [user, navigate])

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutTimeLeft <= 0) return

    const timer = setInterval(() => {
      setLockoutTimeLeft((prev) => {
        if (prev <= 1) {
          setFailedAttempts(0)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [lockoutTimeLeft])

  // ESC Key listener to abort simulated loading
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLoggingIn) {
        isLoginCancelledRef.current = true
        setIsLoggingIn(false)
        showToast('Login operation cancelled.', 'warning')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLoggingIn, showToast])

  // Clean expired notification state on unmount
  useEffect(() => {
    return () => {
      clearExpiredNotification()
    }
  }, [clearExpiredNotification])

  const onSubmit = async (data: LoginFormInputs) => {
    // Check rate limit lockout state
    if (failedAttempts >= AUTH_CONFIG.MAX_LOGIN_ATTEMPTS) {
      showToast('Maximum failed attempts reached. Please wait.', 'error')
      return
    }

    isLoginCancelledRef.current = false
    setIsLoggingIn(true)

    try {
      await login(data.email, data.password, data.rememberMe)

      // If user aborted via ESC key, ignore promise settlement
      if (isLoginCancelledRef.current) return

      setIsLoggingIn(false)

      // Cache email if Remember Me checked
      if (data.rememberMe) {
        localStorage.setItem('stadiummind_remembered_email', data.email)
      } else {
        localStorage.removeItem('stadiummind_remembered_email')
      }

      showToast('Welcome back, Gate Marshal! Syncing sector logs.', 'success')
      navigate(ROUTES.DASHBOARD)
    } catch (err) {
      // If user aborted via ESC key, ignore promise settlement
      if (isLoginCancelledRef.current) return

      setIsLoggingIn(false)
      const nextFailures = failedAttempts + 1
      setFailedAttempts(nextFailures)

      const errMsg = err instanceof Error ? err.message : 'Authentication failure.'
      showToast(errMsg, 'error')

      if (nextFailures >= AUTH_CONFIG.MAX_LOGIN_ATTEMPTS) {
        setLockoutTimeLeft(AUTH_CONFIG.LOCKOUT_DURATION_MS / 1000)
        showToast('Brute force lockout triggered. Portal disabled for 30s.', 'warning')
      }
    }
  }

  // eslint-disable-next-line react-hooks/refs
  const handleFormSubmit = handleSubmit(onSubmit)
  const isLockedOut = lockoutTimeLeft > 0

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 relative">
      <div className="max-w-md w-full glass-panel p-8 rounded-2xl space-y-6 shadow-premium relative animate-slide-up">
        {/* Session Expired Banner Alert */}
        {expiredNotification && (
          <div
            className="p-3 bg-warning-orange-600/10 border border-warning-orange-500/25 rounded-lg text-xs text-warning-orange-500 text-left font-medium animate-pulse"
            role="alert"
          >
            ⚠️ Session expired. For security, please enter your credentials again.
          </div>
        )}

        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-100">
            Lusail Volunteer Portal
          </h2>
          <p className="text-xs text-crowd-slate-400">
            Sign in to access crowd assessment logs and translation aids.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Input
            id="email-field"
            type="email"
            label="Email Address"
            placeholder="volunteer@fifa.com"
            disabled={isLoggingIn || isLockedOut}
            error={errors.email?.message}
            autoFocus
            {...register('email')}
          />

          <Input
            id="password-field"
            type="password"
            label="Volunteer Access Code"
            placeholder="••••••"
            disabled={isLoggingIn || isLockedOut}
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex items-center justify-between text-xs font-medium text-crowd-slate-400">
            <label
              htmlFor="remember-me-checkbox"
              className="flex items-center space-x-2 cursor-pointer select-none"
            >
              <input
                id="remember-me-checkbox"
                type="checkbox"
                disabled={isLoggingIn || isLockedOut}
                className="rounded bg-crowd-slate-950 border-crowd-slate-700 text-stadium-green-500 focus:ring-stadium-green-500 focus:ring-opacity-20"
                {...register('rememberMe')}
              />
              <span>Remember my badge</span>
            </label>
          </div>

          <div className="pt-2">
            {isLockedOut ? (
              <div
                className="w-full text-center text-xs font-semibold py-3 px-4 rounded-lg bg-alert-red-600/10 border border-alert-red-500/20 text-alert-red-500"
                role="status"
              >
                Security Lockout: Retry in {lockoutTimeLeft}s
              </div>
            ) : (
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLoggingIn}
                disabled={isLoggingIn}
              >
                Authorize Badge
              </Button>
            )}
          </div>
        </form>

        {/* Credentials hints card */}
        <div className="glass-panel-light p-4 rounded-xl text-left border border-white/5 space-y-1">
          <h3 className="text-xs font-bold text-stadium-green-500 uppercase tracking-wide">
            Development Session Hints
          </h3>
          <p className="text-[10px] text-slate-300 leading-normal">
            Email:{' '}
            <code className="text-slate-100 bg-black/30 px-1 py-0.5 rounded">
              volunteer@fifa.com
            </code>
            <br />
            Access Code:{' '}
            <code className="text-slate-100 bg-black/30 px-1 py-0.5 rounded">password123</code>
          </p>
          {isLoggingIn && (
            <p className="text-[9px] text-warning-orange-500 font-mono pt-1">
              Press [ESC] to cancel simulated validation.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
