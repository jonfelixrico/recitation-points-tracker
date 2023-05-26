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
          :seatIdx="seatCountCache[colIdx] + rowIdx"
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

const seatCountCache = computed(() => {
  return props.columns.reduce((acc: number[], val, index) => {
    const prevColumnVal = index === 0 ? 0 : acc[index - 1]
    acc.push(prevColumnVal + val)
    return acc
  }, [])
})
</script>

<style scoped lang="scss">
.tile {
  width: var(--tile-size);
  height: var(--tile-size);
}
</style>
