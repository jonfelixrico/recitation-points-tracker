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
          <SeatingGrid :columns="columns" :tile-size="30" />
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import SeatingGrid from 'components/seating/SeatingGrid.vue'

defineProps({
  columns: {
    type: Array as PropType<number[]>,
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
