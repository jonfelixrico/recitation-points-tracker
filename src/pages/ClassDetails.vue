<template>
  <q-page class="q-pt-md relative-position">
    <template v-if="classData">
      <div class="page-width q-mx-auto column q-gutter-y-md">
        <div class="row items-center q-gutter-x-lg">
          <q-btn icon="arrow_back" round flat dense @click="$router.back()" />
          <div class="text-h4">{{ classData.name }}</div>
        </div>

        <!-- TODO display card data -->

        <q-card>
          <q-card-section class="row items-center justify-between">
            <span class="text-h5"> {{ t('classes.studentList') }} </span>
            <q-btn
              unelevated
              no-caps
              color="primary"
              @click="showAddStudentsDialog"
            >
              <div class="row q-gutter-x-sm items-center">
                <q-icon name="add" />
                <div>{{ t('classes.addStudents') }}</div>
              </div>
            </q-btn>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <StudentList
              :students="students"
              @add-click="showAddStudentsDialog"
              @delete="processStudentDelete"
            />
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-page>
</template>

<script lang="ts">
import { orderBy } from 'lodash'
import { useQuasar } from 'quasar'
import AddStudentsDialog from 'src/components/class-details/AddStudentsDialog.vue'
import StudentList from 'src/components/class-details/StudentList.vue'
import { DraftStudent } from 'src/components/class-details/draft-student.inteface'
import { useClassesAPI } from 'src/composables/classes-api.composable'
import { useStudentAPI } from 'src/composables/student-api.composable'
import { ClassEntity, StudentEntity } from 'src/models/entities'
import { Ref, computed, defineComponent, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

function useStudentsList(classId: Ref<string>) {
  const { dialog, loading } = useQuasar()

  const { getStudentList, createStudents, deleteStudent } = useStudentAPI()
  const data = ref<StudentEntity[]>([])

  async function load() {
    data.value = await getStudentList(classId.value)
  }

  async function saveAddedStudents(value: DraftStudent[]) {
    loading.show()
    try {
      await createStudents(classId.value, value)
      await load()
    } catch (e) {
      // TODO improve logging
      console.error(e)
    } finally {
      loading.hide()
    }
  }

  return {
    load,

    showAddDialog() {
      dialog({
        component: AddStudentsDialog,
      }).onOk(saveAddedStudents)
    },

    async processDelete({ id }: StudentEntity) {
      loading.show()
      try {
        await deleteStudent(classId.value, id)
        console.info('Deleted student %s from class %s', id, classId.value)
        await load()
      } catch (e) {
        // TODO improve logging
        console.error(e)
      }
      loading.hide()
    },

    data: computed(() =>
      orderBy(data.value, ['lastName', 'firstName'], ['asc', 'asc'])
    ),
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

    const { t } = useI18n()

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
      showAddStudentsDialog: studentsList.showAddDialog,
      processStudentDelete: studentsList.processDelete,
      t,
    }
  },
})
</script>
