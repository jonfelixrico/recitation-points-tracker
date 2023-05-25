<template>
  <SeatingGrid :columns="arrangement" :tile-size="tileSize">
    <template v-slot="{ colNo, rowNo }">
      <div
        v-if="!indexedOccupants[colNo]?.[rowNo]"
        data-empty
        class="bg-grey"
      />

      <div
        v-else
        class="bg-green"
        :data-occupant-id="indexedOccupants[colNo][rowNo].id"
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
