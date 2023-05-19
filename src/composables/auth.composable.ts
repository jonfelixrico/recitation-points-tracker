import {
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { useFirebase } from './firebase.composable'
import { FirebaseApp } from 'firebase/app'

const EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST

let hasAuthEmulatorConnected = false
function getAuthInstance(app: FirebaseApp) {
  if (!EMULATOR_HOST) {
    return getAuth(app)
  }

  const auth = getAuth(app)

  if (!hasAuthEmulatorConnected) {
    // Observation: we'll get an `auth/emulator-config-failed` error if called more than once.
    connectAuthEmulator(auth, EMULATOR_HOST)
    hasAuthEmulatorConnected = true

    console.debug('Connected to auth emulator %s', EMULATOR_HOST)
  }

  return auth
}

export function useAuth() {
  const app = useFirebase()
  const auth = getAuthInstance(app)

  return {
    async loginViaEmailAndPassword(email: string, password: string) {
      // Firebase doesnt persist session past page life by default. Need to set this to persist longer.
      await auth.setPersistence(browserLocalPersistence)

      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log('User %s has logged in', credentials.user.uid)

      return credentials
    },

    async signOut() {
      await signOut(auth)
    },

    auth,
  }
}
