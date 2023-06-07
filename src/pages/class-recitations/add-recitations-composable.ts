import { useQuasar } from 'quasar'
import { useRecitationsAPI } from 'src/composables/recitations-api.composable'
import { useI18n } from 'vue-i18n'

export function useAddRecitations(classId: string) {
  const { dialog } = useQuasar()
  const { createRecitation } = useRecitationsAPI()
  const { t } = useI18n()

  function showDialog(): Promise<string | null> {
    return new Promise((resolve) => {
      // TODO improve dialog by using custom one
      dialog({
        title: t('classes.dialogs.addRecitation.title'),
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
        recitationDt: new Date(),
      })
    },
  }
}
