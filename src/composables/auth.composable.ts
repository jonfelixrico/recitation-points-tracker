import { getAuth, signInAnonymously } from 'firebase/auth'

export function useAuth() {
  return {
    doAnonymousLogin() {
      const auth = getAuth()
      return signInAnonymously(auth)
    },
  }
}
