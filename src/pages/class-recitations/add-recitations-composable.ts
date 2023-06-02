import { useQuasar } from 'quasar'
import { useRecitationsAPI } from 'src/composables/recitations-api.composable'

export function useAddRecitations() {
  const { dialog } = useQuasar()
  const { createRecitation } = useRecitationsAPI()

  function showDialog(): Promise<string | null> {
    return new Promise((resolve) => {
      dialog({
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
    async startAddRecitationFlow(classId: string) {
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
