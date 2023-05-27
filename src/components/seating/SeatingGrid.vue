<template>
  <div
    class="row no-wrap q-gutter-x-xs"
    :style="{
      '--tile-size': `${tileSize}px`,
    }"
  >
    <div
      v-for="(seatCount, colIdx) of columns"
      :key="colIdx"
      class="column q-gutter-y-xs"
      data-cy="column"
    >
      <div
        v-for="(_, rowIdx) of seatCount"
        :key="rowIdx"
        data-cy="seat"
        :data-row-idx="rowIdx"
        :data-col-idx="colIdx"
        class="tile"
      >
        <slot
          :rowIdx="rowIdx"
          :colIdx="colIdx"
          :seatIdx="startingSeatCountPerColumn[colIdx] + rowIdx"
        >
          <div class="bg-grey fit" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computeStartingSeatIndexPerColumn } from 'src/utils/seating-utils'
import { PropType, computed } from 'vue'

const props = defineProps({
  columns: {
    required: true,
    type: Array as PropType<number[]>,
  },

  tileSize: {
    type: Number,
    default: () => 20,
  },
})

const startingSeatCountPerColumn = computed(() =>
  computeStartingSeatIndexPerColumn(props.columns)
)
</script>

<style scoped lang="scss">
.tile {
  width: var(--tile-size);
  height: var(--tile-size);
}
</style>
