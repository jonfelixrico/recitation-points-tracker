import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyD3lfxbWXmctREdQkyekt6SXHQDN3yBfwE',
  authDomain: 'recitation-points-tracker-test.firebaseapp.com',
  projectId: 'recitation-points-tracker-test',
  storageBucket: 'recitation-points-tracker-test.appspot.com',
  messagingSenderId: '996746436257',
  appId: '1:996746436257:web:6a3465006cbbf1c8d81ae0',
  measurementId: 'G-9CX8PG3FVC',
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export function useFirebase() {
  return app
}

export function useAnalytics() {
  return analytics
}
