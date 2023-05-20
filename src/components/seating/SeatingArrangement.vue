<template>
  <div class="row no-wrap q-gutter-x-xs">
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
import { computed } from 'vue'
import { SeatOccupant } from './seating-types'

const props = withDefaults(
  defineProps<{
    arrangement: number[]
    occupants: SeatOccupant[]
  }>(),
  {
    arrangement: () => [],
    occupants: () => [],
  }
)

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
  $size: 10px;

  width: $size;
  height: $size;

  background-color: $grey;

  &.occupied {
    background-color: $green;
  }
}
</style>
