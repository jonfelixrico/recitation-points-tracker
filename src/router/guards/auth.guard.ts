import { useAuth } from 'src/composables/auth.composable'
import { NavigationGuardWithThis } from 'vue-router'

export const authGuard: NavigationGuardWithThis<undefined> = (to) => {
  const { auth } = useAuth()

  if (!to.meta.public && !auth.currentUser) {
    return {
      name: 'login',
      query: {
        redirectedFrom: to.fullPath,
      },
    }
  }
}
