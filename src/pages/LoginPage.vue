<template>
  <div>
    <q-btn @click="doAnonymousLogin">Log In</q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from 'src/composables/auth.composable'

export default defineComponent({
  setup() {
    const { doAnonymousLogin } = useAuth()

    return {
      doAnonymousLogin,
    }
  },
})
</script>
