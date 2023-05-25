<template>
  <div
    class="row no-wrap q-gutter-x-xs"
    :style="{
      '--tile-size': `${tileSize}px`,
    }"
  >
    <div
      v-for="(seatCount, colNo) of arrangement"
      :key="colNo"
      class="column q-gutter-y-xs"
      data-cy="column"
    >
      <template v-for="rowNo in seatCount" :key="rowNo">
        <div
          v-if="!indexedOccupants[colNo]?.[rowNo]"
          data-cy="seat"
          data-empty
          class="seat"
          :data-row-no="rowNo"
          :data-col-no="colNo"
        />

        <div
          v-else
          data-cy="seat"
          class="seat occupied"
          :data-occupant-id="indexedOccupants[colNo][rowNo].id"
          data-occupied
          :data-row-no="rowNo"
          :data-col-no="colNo"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { SeatOccupant } from './seating-types'

const props = defineProps({
  arrangement: {
    required: true,
    type: Array as PropType<number[]>,
  },

  occupants: {
    type: Array as PropType<SeatOccupant[]>,
    default: () => [],
  },

  tileSize: {
    type: Number,
    default: () => 20,
  },
})

const indexedOccupants = computed(() => {
  const map: Record<number, Record<number, SeatOccupant>> = {}

  for (const occupant of props.occupants) {
    if (!map[occupant.colNo]) {
      map[occupant.colNo] = {}
    }

    map[occupant.colNo][occupant.rowNo] = occupant
  }

  return map
})
</script>

<style scoped lang="scss">
.seat {
  width: var(--tile-size);
  height: var(--tile-size);

  background-color: $grey;

  &.occupied {
    background-color: $green;
  }
}
</style>
