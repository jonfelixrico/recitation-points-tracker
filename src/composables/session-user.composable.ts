import { useSessionStore } from 'src/stores/session-store'

/**
 * Get the uid of the session user.
 * @returns
 */
export function useSessionUserId() {
  const { userId } = useSessionStore()
  return userId
}
