import { useRecitationsAPI } from 'src/composables/recitations-api.composable'
import { RecitationEntity } from 'src/models/entities'
import { Ref, onMounted, ref, watch } from 'vue'

export function useRecitationData(
  classId: Ref<string>,
  recitationId: Ref<string>
) {
  const { getRecitation } = useRecitationsAPI()

  const data = ref<RecitationEntity | null>(null)
  const isFetchOngoing = ref(false)
  async function fetchRecitations() {
    isFetchOngoing.value = true
    try {
      data.value = await getRecitation(classId.value, recitationId.value)
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
      console.debug('%s/%s: mount detected, fetching', classId, recitationId)
      await fetchRecitations()
      console.log('%s/%s: reloaded data due to mount', classId, recitationId)
    } catch (e) {
      console.error(
        e,
        '%s/%s: error caught while trying to fetch data due to mount',
        classId,
        recitationId
      )
    }
  })

  return {
    data,
    fetchRecitations,
    isFetchOngoing,
  }
}
