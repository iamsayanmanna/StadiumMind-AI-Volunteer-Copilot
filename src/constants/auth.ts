import type { VolunteerProfile } from '@/types'

export const AUTH_KEYS = {
  SESSION_STORAGE_KEY: 'stadiummind_session',
} as const

export const AUTH_CONFIG = {
  SESSION_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes session duration
  MAX_LOGIN_ATTEMPTS: 5, // lockout threshold
  LOCKOUT_DURATION_MS: 30 * 1000, // 30 seconds lockout cooldown
} as const

export const MOCK_CREDENTIALS = {
  email: 'volunteer@fifa.com',
  password: 'password123',
} as const

export const MOCK_VOLUNTEER_PROFILE: VolunteerProfile = {
  uid: 'mock-vol-104',
  name: 'Lusail Gate Marshal',
  role: 'volunteer',
  assignedSector: 'Lusail Sector C - Gate D',
  languages: ['English', 'Arabic', 'French'],
}
