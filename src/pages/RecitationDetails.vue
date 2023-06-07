<template>
  <q-page> Test </q-page>
</template>

<script lang="ts">
import { useRecitationsAPI } from 'src/composables/recitations-api.composable'
import { RecitationEntity } from 'src/models/entities'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  async beforeRouteEnter(to) {
    const { getRecitation } = useRecitationsAPI()
    try {
      return !!(await getRecitation(
        String(to.params.classId),
        String(to.params.recitationId)
      ))
    } catch (e) {
      console.error(e)
      // TODO show dialog
      return false
    }
  },

  setup() {
    const { getRecitation } = useRecitationsAPI()
    const recitation = ref<null | RecitationEntity>(null)
    const route = useRoute()
    onMounted(async () => {
      recitation.value = await getRecitation(
        String(route.params.classId),
        String(route.params.recitationId)
      )
    })
  },
})
</script>
