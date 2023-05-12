<template>
  <div class="window-width window-height flex flex-center">
    <q-form @submit.prevent="attemptLogin">
      <q-card class="form-card-width">
        <q-card-section class="column q-gutter-y-sm">
          <q-input label="Username" v-model="credentials.username" outlined />
          <q-input
            label="Password"
            type="password"
            v-model="credentials.password"
            outlined
          />
          <q-btn type="submit" color="primary" no-caps>Log In</q-btn>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useAuth } from 'src/composables/auth.composable'
import { useRouter } from 'vue-router'

function usePostLoginRedirect() {
  const router = useRouter()

  return {
    successRedirect() {
      const { redirectedFrom } = router.currentRoute.value.query
      if (redirectedFrom) {
        return router.push({
          path: String(redirectedFrom),
        })
      } else {
        return router.push({
          name: 'home',
        })
      }
    },
  }
}

export default defineComponent({
  setup() {
    const { loginViaEmailAndPassword } = useAuth()

    const credentials = reactive<{ username: string; password: string }>({
      username: '',
      password: '',
    })

    const { successRedirect } = usePostLoginRedirect()

    async function attemptLogin() {
      const { username, password } = credentials
      try {
        await loginViaEmailAndPassword(username, password)
        await successRedirect()
      } catch (e) {
        console.log(e)
      }
    }

    return {
      attemptLogin,
      credentials,
    }
  },
})
</script>

<style lang="scss">
.form-card-width {
  width: 500px;
}
</style>
