<template>
  <div class="column q-gutter-y-md">
    <!-- display card data -->

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
          :students="studentsModel"
          @add-click="showAddStudentsDialog"
          @delete="processStudentDelete"
        />
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="row justify-between">
        <div class="text-h5">{{ t('classes.seatPlan') }}</div>
        <q-btn color="primary" unelevated no-caps @click="editSeatPlan">
          <div class="row q-gutter-x-sm items-center">
            <q-icon name="edit" />
            <div>{{ t('classes.editSeatPlan') }}</div>
          </div>
        </q-btn>
      </q-card-section>

      <q-separator />

      <SeatPlanSectionContent
        class="seating-visualizer"
        :seating-arrangement="classDataModel.seatingArrangement"
        :students="studentsModel"
      />
    </q-card>
  </div>
</template>

<script lang="ts">
import { orderBy } from 'lodash'
import { useQuasar } from 'quasar'
import AddStudentsDialog from 'src/components/class-details/AddStudentsDialog.vue'
import SeatPlanSectionContent from 'src/components/class-details/SeatPlanSectionContent.vue'
import StudentList from 'src/components/class-details/StudentList.vue'
import { DraftStudent } from 'src/components/class-details/draft-student.inteface'
import { useClassSeatPlanEdit } from 'src/components/class-seat-plan/class-seat-plan-edit-dialog.composable'
import { useClassesAPI } from 'src/composables/classes-api.composable'
import { useStudentAPI } from 'src/composables/student-api.composable'
import { ClassEntity, StudentEntity } from 'src/models/entities'
import { PropType, Ref, computed, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

function useStudentsList(classId: Ref<string>, data: Ref<StudentEntity[]>) {
  const { dialog, loading, notify } = useQuasar()
  const { t } = useI18n()

  const { getStudentList, createStudents, deleteStudent } = useStudentAPI()

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

    async processDelete({ id, firstName, lastName }: StudentEntity) {
      loading.show()
      try {
        await deleteStudent(classId.value, id)
        console.info('Deleted student %s from class %s', id, classId.value)

        const formattedName = t('common.nameFormat', {
          firstName,
          lastName,
        })

        notify({
          message: t('classes.notifs.studentDeleteSuccess', {
            name: `<b>${formattedName}</b>`,
          }),
          html: true,
        })

        const index = data.value.findIndex((s) => s.id === id)
        data.value.splice(index, 1)
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
  components: { StudentList, SeatPlanSectionContent },

  emits: ['update:classData', 'update:students'],

  props: {
    classData: {
      type: Object as PropType<ClassEntity>,
      required: true,
    },

    students: {
      type: Array as PropType<StudentEntity[]>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const { loading } = useQuasar()

    const classData = ref<ClassEntity | null>(null)

    const studentsModel = computed({
      get() {
        return props.students
      },
      set(value) {
        emit('update:students', value)
      },
    })
    const studentsList = useStudentsList(
      computed(() => props.classData.id),
      studentsModel
    )

    const classDataModel = computed({
      get() {
        return props.classData
      },

      set(value) {
        emit('update:classData', value)
      },
    })
    const { getClass } = useClassesAPI()
    async function reloadClassData() {
      const fetched = await getClass(props.classData.id)
      if (!fetched) {
        return
      }

      classDataModel.value = fetched
    }

    const { t } = useI18n()

    const { openEditDialog } = useClassSeatPlanEdit()

    return {
      showAddStudentsDialog: studentsList.showAddDialog,
      processStudentDelete: studentsList.processDelete,
      t,
      studentsModel,
      classDataModel,
      async editSeatPlan() {
        if (!props.classData.seatingArrangement || !props.students) {
          // TODO add logging
          return
        }

        const wereChangesUploaded = await openEditDialog(
          props.classData,
          props.students
        )

        if (!wereChangesUploaded) {
          return
        }

        loading.show()
        try {
          await reloadClassData()
        } catch (e) {
          // TODO improve logging and add notif
          console.error(e)
        } finally {
          loading.hide()
        }
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.seating-visualizer {
  height: 600px;
}
</style>
