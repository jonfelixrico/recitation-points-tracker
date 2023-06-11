import { useClassesAPI } from 'src/composables/classes-api.composable'
import { useStudentAPI } from 'src/composables/student-api.composable'
import { ClassEntity, StudentEntity } from 'src/models/entities'
import { Ref, computed, onMounted, ref, watch } from 'vue'

type ClassData = ClassEntity & { students: StudentEntity[] }

export function useClassData(classId: Ref<string>) {
  const { getClass } = useClassesAPI()
  const { getStudentList } = useStudentAPI()

  const studentsData = ref<StudentEntity[]>([])
  const isStudentsFetchOngoing = ref(false)
  async function fetchStudents() {
    isStudentsFetchOngoing.value = false
    try {
      studentsData.value = await getStudentList(classId.value)
    } finally {
      isStudentsFetchOngoing.value = false
    }
  }

  const classData = ref<ClassEntity | null>(null)
  const isClassFetchOngoing = ref(false)
  async function fetchClass() {
    isClassFetchOngoing.value = true
    try {
      classData.value = await getClass(classId.value)
    } finally {
      isClassFetchOngoing.value = false
    }
  }

  async function fetch() {
    await Promise.all([fetchStudents(), fetchClass()])
  }

  onMounted(fetch)
  watch([classId], fetch)

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
    isClassFetchOngoing,

    fetchStudents,
    isStudentsFetchOngoing,

    isFetchOngoing: computed(
      () => isStudentsFetchOngoing.value || isClassFetchOngoing.value
    ),
  }
}
