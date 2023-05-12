import {
  connectAuthEmulator,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useFirebase } from './firebase.composable'
import { FirebaseApp } from 'firebase/app'

const EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST
if (EMULATOR_HOST) {
  console.debug('Using %s for emulator host', EMULATOR_HOST)
}

function getAuthInstance(app: FirebaseApp) {
  if (!EMULATOR_HOST) {
    return getAuth(app)
  }

  const auth = getAuth(app)
  connectAuthEmulator(auth, EMULATOR_HOST)
  return auth
}

export function useAuth() {
  const app = useFirebase()
  const auth = getAuthInstance(app)

  return {
    loginViaEmailAndPassword(email: string, password: string) {
      return signInWithEmailAndPassword(auth, email, password)
    },
  }
}
