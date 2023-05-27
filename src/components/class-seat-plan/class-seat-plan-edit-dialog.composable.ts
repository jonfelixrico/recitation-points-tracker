import { useQuasar } from 'quasar'
import {
  ClassEntity,
  SeatingArrangement,
  StudentEntity,
} from 'src/models/entities'
import ClassSeatPlanEditDialog from './ClassSeatPlanEditDialog.vue'
import { useClassesAPI } from 'src/composables/classes-api.composable'

type Occupants = SeatingArrangement['occupants']

export function useClassSeatPlanEdit() {
  const { dialog, loading } = useQuasar()
  const { setSeatOccupants } = useClassesAPI()

  async function uploadSeatChanges(id: string, occupants: Occupants) {
    loading.show()
    try {
      await setSeatOccupants(id, occupants)
      // TODO show some sort of notification
    } catch (e) {
      console.error(e)
      // TODO show some sort of error
    } finally {
      loading.hide()
    }
  }

  return {
    openEditDialog(
      { seatingArrangement, id }: ClassEntity,
      students: StudentEntity[]
    ) {
      if (!seatingArrangement) {
        throw new Error('No seating arrangement')
      }

      return dialog({
        component: ClassSeatPlanEditDialog,
        componentProps: {
          students,
          columns: seatingArrangement.columns,
          occupants: seatingArrangement.occupants,
        },
      }).onOk((data: Occupants) => {
        uploadSeatChanges(id, data)
      })
    },
  }
}
