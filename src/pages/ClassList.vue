<template>
  <q-page class="column page-width q-mx-auto">
    <div class="row justify-end q-pa-sm border-bottom">
      <q-btn no-caps color="primary" unelevated @click="showCreateDialog">
        <!-- TODO i18nize this -->
        Add Class
      </q-btn>
    </div>

    <div class="col flex flex-center" v-if="isLoading">
      <q-spinner color="primary" />
    </div>

    <div class="col relative-position" v-else-if="data.length">
      <q-scroll-area class="fit absolute">
        <q-item
          v-for="item in data"
          :key="item.id"
          clickable
          @click="navigateToDetailsPage(item.id)"
        >
          <q-item-section>{{ item.name }}</q-item-section>
        </q-item>
      </q-scroll-area>
    </div>

    <div v-else-if="!data.length" class="col flex flex-center">
      <!-- TODO i18nize this -->
      No classes to show
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import CreateClassDialog from 'src/components/create-class/CreateClassDialog.vue'
import { useClassesAPI } from 'src/composables/classes-api.composable'
import { ClassEntity } from 'src/models/entities'
import { defineComponent, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

function useCreateClassDialog() {
  const $q = useQuasar()
  const { createClass } = useClassesAPI()
  const router = useRouter()

  return {
    async showDialog() {
      $q.dialog({
        // TODO use the one under create-class
        component: CreateClassDialog,
      }).onOk(async (data: Omit<ClassEntity, 'id'>) => {
        const { id } = await createClass(data)

        await router.push({
          name: 'classDetails',
          params: {
            classId: id,
          },
        })
      })
    },
  }
}

function useClassList() {
  const { getClassList } = useClassesAPI()
  const classList = ref<ClassEntity[]>([])
  const isLoading = ref(false)

  return {
    data: classList,
    isLoading,

    async load() {
      isLoading.value = true
      try {
        classList.value = await getClassList()
      } catch (e) {
        // TODO improve this logging
        console.error(e)
      } finally {
        isLoading.value = false
      }
    },
  }
}

export default defineComponent({
  setup() {
    const { showDialog: showCreateDialog } = useCreateClassDialog()

    const router = useRouter()

    const classList = useClassList()

    onBeforeMount(async () => {
      await classList.load()
    })

    return {
      classList,
      showCreateDialog,

      navigateToDetailsPage(classId: string) {
        router.push({
          name: 'classDetails',
          params: { classId },
        })
      },

      data: classList.data,
      isLoading: classList.isLoading,
    }
  },
})
</script>
