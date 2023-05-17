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
            <q-btn
              unelevated
              no-caps
              color="primary"
              @click="showAddStudentsDialog"
            >
              <div class="row q-gutter-x-sm items-center">
                <q-icon name="add" />
                <div>Add students</div>
              </div>
            </q-btn>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <StudentList
              :students="students"
              @add-click="showAddStudentsDialog"
            />
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import AddStudentsDialog from 'src/components/class-details/AddStudentsDialog.vue'
import StudentList from 'src/components/class-details/StudentList.vue'
import { useClassesAPI } from 'src/composables/classes-api.composable'
import { useStudentAPI } from 'src/composables/student-api.composable'
import { ClassEntity, StudentEntity } from 'src/models/entities'
import { Ref, computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

function useStudentsList(classId: Ref<string>) {
  const { dialog } = useQuasar()

  const { getStudentList } = useStudentAPI()
  const data = ref<StudentEntity[]>([])

  return {
    async load() {
      data.value = await getStudentList(classId.value)
    },

    showDialog() {
      dialog({
        component: AddStudentsDialog,
      })
    },

    data,
  }
}

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
    const route = useRoute()
    const classId = computed(() => String(route.params.classId))

    const { loading } = useQuasar()

    const classData = ref<ClassEntity | null>(null)
    const studentsList = useStudentsList(classId)

    const { getClass } = useClassesAPI()

    onMounted(async () => {
      loading.show()
      try {
        classData.value = await getClass(classId.value)
        await studentsList.load()
      } catch (e) {
        // TODO improve logging
        console.error(e)
      } finally {
        loading.hide()
      }
    })

    return {
      classData,
      students: studentsList.data,
      showAddStudentsDialog: studentsList.showDialog,
    }
  },
})
</script>
