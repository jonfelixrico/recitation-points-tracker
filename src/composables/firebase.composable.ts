import { FirebaseApp, initializeApp } from 'firebase/app'

let app: FirebaseApp

export function useFirebase() {
  if (!app) {
    const FIREBASE_CONFIG = {
      apiKey: 'AIzaSyDHmM_wlcfQ8YMC97TzbDTrdN9nFpKbRIo',
      authDomain: 'recitation-tracker.firebaseapp.com',
      projectId: 'recitation-tracker',
      storageBucket: 'recitation-tracker.appspot.com',
      messagingSenderId: '382796561868',
      appId: '1:382796561868:web:4689db3eedcd0e41bf3169',
    }

    app = initializeApp(FIREBASE_CONFIG)
  }

  return app
}
