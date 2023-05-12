<template>
  <q-page class="column">
    <div class="row justify-end q-pa-sm">
      <q-btn no-caps color="primary" unelevated @click="showCreateDialog"
        >Add Class</q-btn
      >
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
import { useQuasar } from 'quasar'
import ClassCreationDialog from 'src/components/ClassCreationDialog.vue'
import { useClassesAPI } from 'src/composables/classes-api.composable'
import { ClassEntity } from 'src/models/entities'
import { defineComponent, ref, onBeforeMount } from 'vue'
import { nanoid } from 'nanoid'
import { useRouter } from 'vue-router'

function useClassCreationDialog() {
  const $q = useQuasar()
  const { createClass } = useClassesAPI()
  const router = useRouter()

  return {
    async showDialog() {
      $q.dialog({
        component: ClassCreationDialog,
      }).onOk(async (data: Omit<ClassEntity, 'id'>) => {
        const classId = nanoid()

        await createClass({
          ...data,
          id: classId,
        })

        await router.push({
          name: 'classDetails',
          params: {
            classId,
          },
        })
      })
    },
  }
}

export default defineComponent({
  setup() {
    const { showDialog: showCreateDialog } = useClassCreationDialog()

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
      showCreateDialog,
    }
  },
})
</script>
