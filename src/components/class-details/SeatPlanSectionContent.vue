<template>
  <div class="row">
    <!-- TODO adjust side panel UI -->
    <div class="side-panel flex flex-center">
      <!-- TODO i18nize this -->
      No students with seats yet
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
          />
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { ClassEntity, StudentEntity } from 'src/models/entities'
import SeatPlanVisualizer from 'components/class-seat-plan/SeatPlanVisualizer.vue'

defineProps({
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
