<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    maximized
    transition-hide="slide-down"
    transition-show="slide-up"
  >
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

          <q-separator />

          <div class="q-pa-sm">
            <q-btn
              v-if="hasChanges"
              color="primary"
              class="full-width"
              unelevated
              no-caps
              @click="emitChanges"
            >
              {{ t('classes.dialogs.editSeatPlan.save') }}
            </q-btn>

            <q-btn
              v-else
              color="grey"
              class="full-width"
              unelevated
              no-caps
              disabled
            >
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
import { PropType, computed, ref, watch } from 'vue'
import SeatPlanVisualizer from './SeatPlanVisualizer.vue'
import SeatPlanStudentList from './SeatPlanStudentList.vue'
import { cloneDeep, isEqual } from 'lodash'
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

const hasChanges = computed(
  () => !isEqual(props.occupants, occupantsModel.value)
)

function assignStudentToSeat({ colNo, rowNo, id }: AssignPayload) {
  occupantsModel.value[id] = [colNo, rowNo]
}

function removeStudentSeat(id: string) {
  delete occupantsModel.value[id]
}

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
const { t } = useI18n()

function emitChanges() {
  // TODO add confirmation dialog
  onDialogOK(occupantsModel.value)
}
</script>

<style scoped lang="scss">
.students-drawer {
  width: 350px;
}
</style>
