import { useRecitationsAPI } from 'src/composables/recitations-api.composable'
import { RecitationEntity } from 'src/models/entities'
import { Ref, ref, watch } from 'vue'

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

  watch([classId, recitationId], async () => {
    await fetchRecitations()
    // TODO add logging and error handling
  })

  return {
    data,
    fetchRecitations,
    isFetchOngoing,
  }
}
