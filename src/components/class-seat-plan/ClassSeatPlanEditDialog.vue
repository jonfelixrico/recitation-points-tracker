<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" maximized>
    <div class="bg-white fit column">
      <q-bar class="justify-between bg-primary text-white">
        <div>{{ t('classes.dialogs.editSeatPlan.title') }}</div>
        <q-btn icon="close" flat round dense v-close-popup />
      </q-bar>
      <div class="col row">
        <div v-if="!students.length" class="students-drawer flex flex-center">
          {{ t('classes.emptyStudents') }}
        </div>
        <div v-else class="students-drawer column">
          <q-scroll-area class="col">
            <SeatPlanStudentList
              :students="students"
              :seats-occupied="occupantsModel"
              :columns="columns"
              @remove="removeStudentSeat"
            />
          </q-scroll-area>

          <div class="q-pa-sm">
            <q-btn color="primary" class="full-width" unelevated no-caps>
              {{ t('classes.dialogs.editSeatPlan.save') }}
            </q-btn>
          </div>
        </div>

        <div class="col bg-grey-2 flex flex-center">
          <SeatPlanVisualizer
            :columns="columns"
            :occupants="occupantsModel"
            :students="students"
            @assign="assignStudentToSeat"
            @remove="removeStudentSeat"
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
import { useI18n } from 'vue-i18n'

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

function removeStudentSeat(id: string) {
  delete occupantsModel.value[id]
}

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide } = useDialogPluginComponent()
const { t } = useI18n()
</script>

<style scoped lang="scss">
.students-drawer {
  width: 350px;
}
</style>
