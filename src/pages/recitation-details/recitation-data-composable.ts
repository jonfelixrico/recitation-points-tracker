import { useClassesAPI } from 'src/composables/classes-api.composable'
import { useRecitationsAPI } from 'src/composables/recitations-api.composable'
import { useStudentAPI } from 'src/composables/student-api.composable'
import {
  ClassEntity,
  RecitationEntity,
  StudentEntity,
} from 'src/models/entities'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

type ClassData = ClassEntity & { students: StudentEntity[] }

export function useRecitationData() {
  const route = useRoute()
  const { getClass } = useClassesAPI()
  const { getRecitation } = useRecitationsAPI()
  const { getStudentList } = useStudentAPI()

  const classId = computed(() => String(route.params.classId))
  const recitationId = computed(() => String(route.params.recitationId))

  const classData = ref<ClassData | null>(null)
  const recitationData = ref<RecitationEntity | null>(null)

  watch(
    [classId],
    async () => {
      const getClassOutput = (await getClass(classId.value)) as ClassEntity
      const getStudentsOutput = await getStudentList(classId.value)

      classData.value = {
        ...getClassOutput,
        students: getStudentsOutput,
      }
    },
    {
      immediate: true,
    }
  )

  watch([classId, recitationId], async () => {
    recitationData.value = await getRecitation(
      classId.value,
      recitationId.value
    )
  })

  return {
    classData,
    recitationData,
  }
}
