<template>
  <div
    class="row no-wrap q-gutter-x-xs"
    :style="{
      '--tile-size': `${tileSize}px`,
    }"
  >
    <div
      v-for="(seatCount, colNo) of columns"
      :key="colNo"
      class="column q-gutter-y-xs"
      data-cy="column"
    >
      <div
        v-for="rowNo in seatCount"
        :key="rowNo"
        data-cy="seat"
        :data-row-no="rowNo"
        :data-col-no="colNo"
        class="tile"
      >
        <slot :rowNo="rowNo" :colNo="colNo">
          <div class="bg-grey fit" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  columns: {
    required: true,
    type: Array as PropType<number[]>,
  },

  tileSize: {
    type: Number,
    default: () => 20,
  },
})
</script>

<style scoped lang="scss">
.tile {
  width: var(--tile-size);
  height: var(--tile-size);
}
</style>
