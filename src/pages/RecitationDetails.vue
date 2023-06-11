<template>
  <q-page class="column items-center q-pt-md">
    <div class="row items-center q-gutter-x-lg page-width">
      <q-btn icon="arrow_back" round flat dense @click="$router.back()" />

      <div v-if="recitation?.name" class="text-h4">{{ recitation.name }}</div>
      <q-skeleton v-else class="col-3 self-stretch" />
    </div>

    <q-card class="col page-width q-mt-md">
      <q-card-section> test </q-card-section>
    </q-card>
  </q-page>
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

    return {
      recitation,
    }
  },
})
</script>
