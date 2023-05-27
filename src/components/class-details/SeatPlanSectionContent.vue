<template>
  <div class="row">
    <!-- TODO adjust side panel UI -->
    <div class="side-panel flex flex-center" v-if="!students.length">
      {{ t('classes.emptyStudents') }}
    </div>

    <div v-else class="side-panel">
      <SeatPlanStudentItemLayout
        v-for="student in students"
        :key="student.id"
        :student="student"
        no-side-section
        :seat-no="
          seatIdxMap[student.id] !== undefined
            ? seatIdxMap[student.id] + 1
            : undefined
        "
      />
    </div>

    <div class="col bg-grey-2 relative-position">
      <q-resize-observer @resize="dimensions = $event" />
      <q-scroll-area
        class="absolute grid-container"
        :style="{
          '--width': dimensions.width,
          '--height': dimensions.height,
        }"
      >
        <div class="flex flex-center grid-container">
          <SeatPlanVisualizer
            :students="students"
            :columns="seatingArrangement.columns"
            :occupants="seatingArrangement.occupants"
            read-only
          />
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue'
import { ClassEntity, StudentEntity } from 'src/models/entities'
import SeatPlanVisualizer from 'components/class-seat-plan/SeatPlanVisualizer.vue'
import { useI18n } from 'vue-i18n'
import SeatPlanStudentItemLayout from 'components/class-seat-plan/SeatPlanStudentItemLayout.vue'
import { mapValues } from 'lodash'
import { computeStartingSeatIndexPerColumn } from 'src/utils/seating-utils'

const props = defineProps({
  seatingArrangement: {
    type: Object as PropType<ClassEntity['seatingArrangement']>,
    required: true,
  },

  students: {
    type: Array as PropType<StudentEntity[]>,
    required: true,
  },
})

const dimensions = ref({
  width: 0,
  height: 0,
})

const { t } = useI18n()

const startingSeatCountPerColumn = computed(() =>
  computeStartingSeatIndexPerColumn(props.seatingArrangement.columns)
)

const seatIdxMap = computed(() => {
  return mapValues(props.seatingArrangement.occupants, ([colIdx, rowIdx]) => {
    return startingSeatCountPerColumn.value[colIdx] + rowIdx
  })
})
</script>

<style lang="scss" scoped>
.side-panel {
  width: 300px;
}

.grid-container {
  width: calc(1px * var(--width));
  height: calc(1px * var(--height));
}
</style>
