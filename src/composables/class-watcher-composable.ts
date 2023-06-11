import { useClassesAPI } from 'src/composables/classes-api.composable'
import { useStudentAPI } from 'src/composables/student-api.composable'
import { ClassEntity, StudentEntity } from 'src/models/entities'
import { Ref, ref, watch } from 'vue'

type ClassData = ClassEntity & { students: StudentEntity[] }

export function useRecitationData(classId: Ref<string>) {
  const { getClass } = useClassesAPI()
  const { getStudentList } = useStudentAPI()

  const data = ref<ClassData | null>(null)

  watch(
    [classId],
    async ([classId]) => {
      const getClassOutput = (await getClass(classId)) as ClassEntity
      const getStudentsOutput = await getStudentList(classId)

      data.value = {
        ...getClassOutput,
        students: getStudentsOutput,
      }
    },
    {
      immediate: true,
    }
  )

  return data
}
