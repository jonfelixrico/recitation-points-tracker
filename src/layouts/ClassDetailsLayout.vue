<template>
  <q-page class="q-pt-md relative-position">
    <div class="page-width q-mx-auto column q-gutter-y-md">
      <div class="row items-center q-gutter-x-lg">
        <q-btn icon="arrow_back" round flat dense @click="$router.back()" />

        <!-- class name -->
        <div v-if="classData?.name" class="text-h4">{{ classData.name }}</div>
        <q-skeleton v-else class="col-3 self-stretch" />

        <!-- navigation -->
        <div class="col row justify-end">
          <q-tabs
            active-color="primary"
            indicator-color="transparent"
            dense
            class="text-weight-medium"
            content-class="q-gutter-x-sm row"
          >
            <q-route-tab
              :to="{ name: 'classDetails' }"
              no-caps
              active-class="bg-primary text-white"
              class="rounded-borders"
              exact
              replace
            >
              <!-- TODO i18nize -->
              Overview
            </q-route-tab>

            <q-route-tab
              :to="{ name: 'classRecitations' }"
              no-caps
              active-class="bg-primary text-white"
              class="rounded-borders"
              exact
              replace
            >
              Recitations
            </q-route-tab>
          </q-tabs>
        </div>
      </div>

      <!-- content -->
      <router-view
        v-if="isLoaded"
        v-model:classData="classData"
        v-model:students="students"
      />
    </div>
  </q-page>
</template>

<!-- We're not using `script setup` because we need `beforeRouteEnter`. -->
<script lang="ts">
import { useQuasar } from 'quasar'
import { useClassesAPI } from 'src/composables/classes-api.composable'
import { useStudentAPI } from 'src/composables/student-api.composable'
import { ClassEntity, StudentEntity } from 'src/models/entities'
import { defineComponent, onBeforeMount, ref } from 'vue'
import { RouteLocation, useRoute } from 'vue-router'

export default defineComponent({
  async beforeRouteEnter({ params }: RouteLocation) {
    const { getClass } = useClassesAPI()
    try {
      await getClass(String(params.classId))
    } catch (e) {
      // TODO add dialog informing the user of the error
      return false
    }
  },

  setup() {
    const { loading } = useQuasar()
    const route = useRoute()

    const { getClass } = useClassesAPI()
    const { getStudentList } = useStudentAPI()

    const classData = ref<ClassEntity | null>(null)
    const students = ref<StudentEntity[]>([])
    const isLoaded = ref(false)

    onBeforeMount(async () => {
      loading.show()
      const id = String(route.params.classId)

      try {
        classData.value = await getClass(id)
        students.value = await getStudentList(id)
      } finally {
        loading.hide()
        isLoaded.value = true
      }
    })

    return {
      classData,
      students,
      isLoaded,
    }
  },
})
</script>
