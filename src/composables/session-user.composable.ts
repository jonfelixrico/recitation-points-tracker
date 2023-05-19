import { useAuth } from './auth.composable'

/**
 * Get the uid of the session user.
 * @returns
 */
export function useSessionUserId() {
  const { auth } = useAuth()

  return auth.currentUser?.uid
}
