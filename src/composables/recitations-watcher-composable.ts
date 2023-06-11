import { useRecitationsAPI } from 'src/composables/recitations-api.composable'
import { RecitationEntity } from 'src/models/entities'
import { Ref, ref, watch } from 'vue'

export function useRecitationData(
  classId: Ref<string>,
  recitationId: Ref<string>
) {
  const { getRecitation } = useRecitationsAPI()

  const data = ref<RecitationEntity | null>(null)

  watch([classId, recitationId], async () => {
    data.value = await getRecitation(classId.value, recitationId.value)
    // TODO add logging and error handling
  })

  return data
}
