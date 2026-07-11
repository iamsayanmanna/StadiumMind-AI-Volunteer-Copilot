import { auth } from './config'
import {
  signInAnonymously as fbSignInAnonymously,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
} from 'firebase/auth'
import type { User } from 'firebase/auth'

/**
 * Sign in anonymously for rapid volunteer onboarding.
 * Placed here as a placeholder structure for auth.
 */
export const signInAnonymously = async (): Promise<User> => {
  try {
    const credential = await fbSignInAnonymously(auth)
    return credential.user
  } catch (error) {
    console.error('Firebase Auth: Anonymous sign in failed', error)
    throw error
  }
}

/**
 * Sign out current volunteer user.
 */
export const signOut = async (): Promise<void> => {
  try {
    await fbSignOut(auth)
  } catch (error) {
    console.error('Firebase Auth: Sign out failed', error)
    throw error
  }
}

/**
 * Subscribe to authentication state changes.
 */
export const onAuthStateChange = (callback: (user: User | null) => void): (() => void) => {
  return fbOnAuthStateChanged(auth, callback)
}
