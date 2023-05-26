import { useQuasar } from 'quasar'
import { SeatingArrangement, StudentEntity } from 'src/models/entities'
import ClassSeatPlanEditDialog from './ClassSeatPlanEditDialog.vue'

export function useClassSeatPlanEdit() {
  const { dialog } = useQuasar()

  return {
    openEditDialog(
      seatingArrangement: SeatingArrangement,
      students: StudentEntity[]
    ) {
      return dialog({
        component: ClassSeatPlanEditDialog,
        componentProps: {
          students,
          columns: seatingArrangement.columns,
          occupants: seatingArrangement.occupants,
        },
      })
    },
  }
}
