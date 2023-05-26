<template>
  <div
    class="row no-wrap q-gutter-x-xs"
    :style="{
      '--tile-size': `${tileSize}px`,
    }"
  >
    <!-- colIdx is base 0 -->
    <div
      v-for="(seatCount, colIdx) of columns"
      :key="colIdx"
      class="column q-gutter-y-xs"
      data-cy="column"
    >
      <!--
        SeatingGridColumn only existed because we want to cache the value of the
        accumulated seat count.

        It would be very expensive to do the colums.slice.reduce + colSeatIdx.
      -->
      <SeatingGridColumn
        :seat-count="seatCount"
        :accumulator="
          columns.slice(0, colIdx + 1).reduce((acc, val) => acc + val)
        "
        v-slot="{ rowIdx: rowNo, seatNo }"
      >
        <div
          data-cy="seat"
          :data-row-idx="rowNo"
          :data-col-idx="colIdx"
          class="tile"
        >
          <slot :rowIdx="rowNo" :colIdx="colIdx" :seatIdx="seatNo">
            <div class="bg-grey fit" />
          </slot>
        </div>
      </SeatingGridColumn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import SeatingGridColumn from './SeatingGridColumn.vue'

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
