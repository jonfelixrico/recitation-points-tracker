<template>
  <div>
    <q-input label="Username" v-model="credentials.username" />
    <q-input label="Password" type="password" v-model="credentials.password" />
    <q-btn @click="attemptLogin">Log In</q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useAuth } from 'src/composables/auth.composable'

export default defineComponent({
  setup() {
    const { loginViaEmailAndPassword } = useAuth()

    const credentials = reactive<{ username: string; password: string }>({
      username: '',
      password: '',
    })

    async function attemptLogin() {
      const { username, password } = credentials
      await loginViaEmailAndPassword(username, password)
    }

    return {
      attemptLogin,
      credentials,
    }
  },
})
</script>
