import { boot } from 'quasar/wrappers'
import { useAuth } from 'src/composables/auth.composable'
import { useSessionStore } from 'src/stores/session-store'

export default boot(() => {
  const sessionStore = useSessionStore()
  const { auth } = useAuth()

  // Persistent listener for auth state changes
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.debug('User %s is now the current logged in user', user.uid)
      sessionStore.setUserId(user.uid)
    } else {
      console.debug('There is no more logged in user')
      sessionStore.setUserId(null)
    }
  })

  /*
   * This one is just a one-time listener.
   * onAuthStateChanged emitting at least once means that Firebase is now aware if there
   * is a logged in user or not.
   */
  return new Promise((resolve) => {
    const unsubscriber = auth.onAuthStateChanged(() => {
      console.debug('Firebase has finished checking for its auth state')
      resolve()
      unsubscriber()
    })
  })
})
