import { useFirebase } from './firebase.composable'
import { FirebaseApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST

let isEmulatorConnected = false
function getFirestoreInstance(app: FirebaseApp) {
  if (!EMULATOR_HOST) {
    return getFirestore(app)
  }

  const firestore = getFirestore(app)

  if (!isEmulatorConnected) {
    const url = new URL(EMULATOR_HOST)

    // Observation: we'll get an error if called more than once.
    connectFirestoreEmulator(firestore, url.hostname, Number(url.port))
    isEmulatorConnected = true

    console.debug('Connected to Firestore emulator %s', EMULATOR_HOST)
  }

  return firestore
}

export function useFirestore() {
  const app = useFirebase()
  const firestore = getFirestoreInstance(app)

  return { firestore }
}
