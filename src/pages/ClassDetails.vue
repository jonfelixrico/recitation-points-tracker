<template>
  <q-page>{{ classData }}</q-page>
</template>

<script lang="ts">
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

    const classData = ref<ClassEntity | null>(null)

    onMounted(async () => {
      classData.value = await getClass(String(route.params.classId))
    })

    return {
      classData,
    }
  },
})
</script>
