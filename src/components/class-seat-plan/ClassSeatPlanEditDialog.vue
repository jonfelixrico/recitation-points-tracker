<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" maximized>
    <div class="bg-white fit column">
      <q-bar class="justify-between bg-primary text-white">
        <div>Edit Seat Plan</div>
        <q-btn icon="close" flat round dense v-close-popup />
      </q-bar>
      <div class="col row">
        <div v-if="!students.length" class="students-drawer flex flex-center">
          No Students
        </div>
        <div v-else class="students-drawer">
          <div class="q-gutter-y-sm column">
            <SeatPlanStudentList :students="students" />
          </div>
        </div>

        <div class="col bg-grey-2 flex flex-center">
          <SeatPlanVisualizer
            :columns="columns"
            :occupants="occupantsModel"
            :students="students"
            @assign="assignStudentToSeat"
          />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { StudentEntity } from 'src/models/entities'
import { SeatingArrangement } from 'src/models/entities'
import { PropType, ref, watch } from 'vue'
import SeatPlanVisualizer from './SeatPlanVisualizer.vue'
import SeatPlanStudentList from './SeatPlanStudentList.vue'
import { cloneDeep } from 'lodash'
import { AssignPayload } from './class-seat-plan-typings'

const props = defineProps({
  columns: {
    required: true,
    type: Object as PropType<SeatingArrangement['columns']>,
  },

  occupants: {
    required: true,
    type: Object as PropType<SeatingArrangement['occupants']>,
  },

  students: {
    required: true,
    type: Array as PropType<StudentEntity[]>,
  },
})

const occupantsModel = ref<SeatingArrangement['occupants']>({})
watch(
  props.occupants,
  (val) => {
    occupantsModel.value = cloneDeep(val)
  },
  {
    immediate: true,
  }
)

function assignStudentToSeat({ colNo, rowNo, id }: AssignPayload) {
  occupantsModel.value[id] = [colNo, rowNo]
}

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide } = useDialogPluginComponent()
</script>

<style scoped lang="scss">
.students-drawer {
  width: 350px;
}
</style>
