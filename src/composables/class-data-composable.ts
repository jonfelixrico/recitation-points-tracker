import { useClassesAPI } from 'src/composables/classes-api.composable'
import { useStudentAPI } from 'src/composables/student-api.composable'
import { ClassEntity, StudentEntity } from 'src/models/entities'
import { Ref, computed, ref, watch } from 'vue'

type ClassData = ClassEntity & { students: StudentEntity[] }

export function useClassData(classId: Ref<string>) {
  const { getClass } = useClassesAPI()
  const { getStudentList } = useStudentAPI()

  const classData = ref<ClassEntity | null>(null)
  const studentsData = ref<StudentEntity[]>([])

  async function fetchStudents() {
    studentsData.value = await getStudentList(classId.value)
  }

  async function fetchClass() {
    classData.value = await getClass(classId.value)
  }

  watch(
    [classId],
    async () => {
      await Promise.all([fetchStudents(), fetchClass()])
      // TODO add logging and error handling
    },
    {
      immediate: true,
    }
  )

  return {
    data: computed<ClassData | null>(() => {
      if (!classData.value) {
        return null
      }

      return {
        ...classData.value,
        students: studentsData.value,
      }
    }),

    fetchClass,
    fetchStudents,
  }
}
