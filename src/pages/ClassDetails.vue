<template>
  <q-page class="q-pt-md relative-position">
    <template v-if="classData">
      <div class="page-width q-mx-auto column q-gutter-y-md">
        <div class="row items-center q-gutter-x-lg">
          <q-btn icon="arrow_back" round flat dense @click="$router.back()" />
          <div class="text-h4">{{ classData.name }}</div>
        </div>

        <q-card>
          <q-card-section>
            {{ classData }}
          </q-card-section>
          <q-separator />
        </q-card>

        <q-card>
          <q-card-section class="row items-center justify-between">
            <span class="text-h5"> Students </span>
            <q-btn unelevated no-caps color="primary">
              <div class="row q-gutter-x-sm items-center">
                <q-icon name="add" />
                <div>Add students</div>
              </div>
            </q-btn>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <StudentList :students="studentsData" />
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import StudentList from 'src/components/class-details/StudentList.vue'
import { useClassesAPI } from 'src/composables/classes-api.composable'
import { useStudentAPI } from 'src/composables/student-api.composable'
import { ClassEntity, StudentEntity } from 'src/models/entities'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: { StudentList },

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
    const { getStudentList } = useStudentAPI()

    const route = useRoute()
    const classId = String(route.params.classId)

    const { loading } = useQuasar()

    const classData = ref<ClassEntity | null>(null)
    const studentsData = ref<StudentEntity[]>([])

    onMounted(async () => {
      loading.show()
      try {
        classData.value = await getClass(classId)
        studentsData.value = await getStudentList(classId)
      } catch (e) {
        // TODO improve logging
        console.error(e)
      } finally {
        loading.hide()
      }
    })

    return {
      classData,
      studentsData,
    }
  },
})
</script>
