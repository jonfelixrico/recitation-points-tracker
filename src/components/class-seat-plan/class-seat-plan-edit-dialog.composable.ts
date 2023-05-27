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

  return {
    openEditDialog(
      { seatingArrangement, id }: ClassEntity,
      students: StudentEntity[]
    ): Promise<boolean> {
      if (!seatingArrangement) {
        throw new Error('No seating arrangement')
      }

      return new Promise(async (resolve) => {
        dialog({
          component: ClassSeatPlanEditDialog,
          componentProps: {
            students,
            columns: seatingArrangement.columns,
            occupants: seatingArrangement.occupants,
          },
        })
          .onOk(async (data: Occupants) => {
            loading.show()
            try {
              await setSeatOccupants(id, data)
              // TODO show some sort of notification
              resolve(true)
              return
            } catch (e) {
              console.error(e)
              // TODO show some sort of error
              resolve(false)
              return
            } finally {
              loading.hide()
            }
          })
          .onCancel(() => {
            resolve(false)
          })
      })
    },
  }
}
