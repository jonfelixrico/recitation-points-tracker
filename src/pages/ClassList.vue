<template>
  <q-page>
    <q-list>
      <q-item v-for="item in classList" :key="item.id">
        <q-item-section>
          {{ item.name }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { useClassesAPI } from 'src/composables/classes-api.composable'
import { ClassEntity } from 'src/models/entities'
import { defineComponent, ref, onBeforeMount } from 'vue'

export default defineComponent({
  setup() {
    const { getClassList } = useClassesAPI()

    const classList = ref<ClassEntity[]>([])

    onBeforeMount(async () => {
      try {
        classList.value = await getClassList()
      } catch (e) {
        console.error(e)
      }
    })

    return {
      classList,
    }
  },
})
</script>
