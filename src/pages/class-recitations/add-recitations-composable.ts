import { useQuasar } from 'quasar'
import { useRecitationsAPI } from 'src/composables/recitations-api.composable'

export function useAddRecitations(classId: string) {
  const { dialog } = useQuasar()
  const { createRecitation } = useRecitationsAPI()

  function showDialog(): Promise<string | null> {
    return new Promise((resolve) => {
      // TODO improve dialog by using custom one
      dialog({
        // TODO i18nize this
        title: 'Add Recitation',
        prompt: {
          model: '',
          type: 'text',
        },
      })
        .onOk((name: string) => {
          resolve(name)
        })
        .onCancel(() => {
          resolve(null)
        })
    })
  }

  return {
    async startAddRecitationFlow() {
      const name = await showDialog()
      if (!name) {
        return null
      }

      return await createRecitation({
        classId,
        name,
        tags: [],
      })
    },
  }
}
