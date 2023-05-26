<template>
  <SeatingGrid :columns="arrangement" :tile-size="tileSize">
    <template v-slot="{ colIdx, rowIdx }">
      <div
        v-if="!indexedOccupants[colIdx]?.[rowIdx]"
        data-empty
        class="bg-grey fit"
      />

      <div
        v-else
        class="bg-green fit"
        :data-occupant-id="indexedOccupants[colIdx][rowIdx].id"
        data-occupied
      />
    </template>
  </SeatingGrid>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { SeatOccupant } from './seating-types'
import SeatingGrid from './SeatingGrid.vue'

const props = defineProps({
  arrangement: {
    required: true,
    type: Array as PropType<number[]>,
  },

  occupants: {
    type: Array as PropType<SeatOccupant[]>,
    default: () => [],
  },

  tileSize: Number,
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
