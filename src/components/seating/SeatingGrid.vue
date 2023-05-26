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
          :seatIdx="beginningCountPerIndex[colIdx] + rowIdx"
        >
          <div class="bg-grey fit" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const beginningCountPerIndex = computed(() => {
  return props.columns.reduce((cache: number[], _, index) => {
    cache.push(props.columns.slice(0, index).reduce((acc, val) => acc + val, 0))
    return cache
  }, [])
})
</script>

<style scoped lang="scss">
.tile {
  width: var(--tile-size);
  height: var(--tile-size);
}
</style>
