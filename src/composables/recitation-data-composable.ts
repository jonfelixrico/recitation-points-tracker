import { useRecitationsAPI } from 'src/composables/recitations-api.composable'
import { RecitationEntity, RecitedStudentEntity } from 'src/models/entities'
import { Ref, onMounted, ref, watch } from 'vue'

export interface ExtendedRecitationEntity extends RecitationEntity {
  recitedStudents: RecitedStudentEntity[]
}

export function useRecitationData(
  classId: Ref<string>,
  recitationId: Ref<string>
) {
  const { getRecitation } = useRecitationsAPI()

  const data = ref<ExtendedRecitationEntity | null>(null)
  const isFetchOngoing = ref(false)
  async function fetchRecitations() {
    isFetchOngoing.value = true
    try {
      const recitation = await getRecitation(classId.value, recitationId.value)

      if (!recitation) {
        data.value = null
      } else {
        data.value = {
          ...recitation,
          recitedStudents: [],
        }
      }
    } finally {
      isFetchOngoing.value = false
    }
  }

  watch([classId, recitationId], async ([classId, recitationId]) => {
    try {
      console.debug('%s/%s: change detected, fetching', classId, recitationId)
      await fetchRecitations()
      console.log(
        '%s/%s: fetched data due to detected changes',
        classId,
        recitationId
      )
    } catch (e) {
      console.error(
        e,
        '%s/%s: error caught while trying to fetch data due to changes',
        classId,
        recitationId
      )
    }
  })

  onMounted(async () => {
    try {
      console.debug(
        '%s/%s: mount detected, fetching',
        classId.value,
        recitationId.value
      )
      await fetchRecitations()
      console.log(
        '%s/%s: reloaded data due to mount',
        classId.value,
        recitationId.value
      )
    } catch (e) {
      console.error(
        e,
        '%s/%s: error caught while trying to fetch data due to mount',
        classId.value,
        recitationId.value
      )
    }
  })

  return {
    data,
    fetchRecitations,
    isFetchOngoing,
  }
}
