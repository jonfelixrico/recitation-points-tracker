<template>
  <q-page> Test </q-page>
</template>

<script lang="ts">
import { useRecitationsAPI } from 'src/composables/recitations-api.composable'
import { defineComponent } from 'vue'

export default defineComponent({
  async beforeRouteEnter(to) {
    const { getRecitation } = useRecitationsAPI()
    try {
      await getRecitation(String(to.params.recitationId))
    } catch (e) {
      console.error(e)
      // TODO show dialog
      return false
    }
  },
})
</script>
