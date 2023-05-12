import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useFirebase } from './firebase.composable'

export function useAuth() {
  const app = useFirebase()
  const auth = getAuth(app)

  return {
    loginViaEmailAndPassword(email: string, password: string) {
      return signInWithEmailAndPassword(auth, email, password)
    },
  }
}
