<template>
  <q-page class="column">
    <div class="col" v-if="classData">
      {{ classData }}
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { useClassesAPI } from 'src/composables/classes-api.composable'
import { ClassEntity } from 'src/models/entities'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  async beforeRouteEnter(to) {
    const { getClass } = useClassesAPI()
    try {
      await getClass(String(to.params.classId))
    } catch (e) {
      return false
    }
  },

  setup() {
    const { getClass } = useClassesAPI()
    const route = useRoute()
    const { loading } = useQuasar()

    const data = ref<ClassEntity | null>(null)

    onMounted(async () => {
      loading.show()
      try {
        data.value = await getClass(String(route.params.classId))
      } catch (e) {
        // TODO improve logging
        console.error(e)
      } finally {
        loading.hide()
      }
    })

    return {
      classData: data,
    }
  },
})
</script>
