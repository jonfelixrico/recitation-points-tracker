import {
  connectAuthEmulator,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useFirebase } from './firebase.composable'

const EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST
if (EMULATOR_HOST) {
  console.debug('Using %s for emulator host', EMULATOR_HOST)
}

function getAuthInstance() {
  if (!EMULATOR_HOST) {
    const app = useFirebase()
    return getAuth(app)
  }

  const auth = getAuth()
  connectAuthEmulator(auth, EMULATOR_HOST)
  return auth
}

export function useAuth() {
  const auth = getAuthInstance()

  return {
    loginViaEmailAndPassword(email: string, password: string) {
      return signInWithEmailAndPassword(auth, email, password)
    },
  }
}
