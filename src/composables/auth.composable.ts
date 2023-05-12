import { getAuth, signInAnonymously } from 'firebase/auth'
import { useFirebase } from './firebase.composable'

export function useAuth() {
  const app = useFirebase()
  const auth = getAuth(app)

  return {
    doAnonymousLogin() {
      return signInAnonymously(auth)
    },
  }
}
