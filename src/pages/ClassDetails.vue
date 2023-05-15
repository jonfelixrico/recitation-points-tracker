<template>
  <q-page class="q-pt-md relative-position">
    <template v-if="classData">
      <div class="page-width q-mx-auto column q-gutter-y-md">
        <div class="row">
          <q-btn icon="arrow_back" round flat dense @click="$router.back()" />
        </div>

        <q-card>
          <q-card-section class="text-h5 q-pb-none">
            {{ classData.name }}
          </q-card-section>
          <q-card-section>
            {{ classData }}
          </q-card-section>
        </q-card>
      </div>
    </template>
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

    const classData = ref<ClassEntity | null>(null)

    onMounted(async () => {
      loading.show()
      try {
        classData.value = await getClass(String(route.params.classId))
      } catch (e) {
        // TODO improve logging
        console.error(e)
      } finally {
        loading.hide()
      }
    })

    return {
      classData,
    }
  },
})
</script>
