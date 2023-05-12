<template>
  <q-page class="column">
    <div class="row justify-end q-pa-sm">
      <q-btn no-caps color="primary" unelevated>Add Class</q-btn>
    </div>

    <q-scroll-area v-if="classList.length" class="col">
      <q-list>
        <q-item v-for="item in classList" :key="item.id">
          <q-item-section>
            {{ item.name }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <div v-else class="col flex flex-center">No classes to show</div>
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
