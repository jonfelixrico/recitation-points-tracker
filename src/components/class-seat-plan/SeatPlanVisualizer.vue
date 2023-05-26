<template>
  <SeatingGrid :columns="columns" :tile-size="50">
    <template v-slot="{ colNo, rowNo }">
      <div v-if="inverseOccupantMap[colNo]?.[rowNo]" class="bg-green fit">
        <!-- TODO do something -->
      </div>

      <div
        v-else
        class="fit bg-grey"
        @dragover.prevent
        @drop="($event) => assignSeat($event, colNo, rowNo)"
      />
    </template>
  </SeatingGrid>
</template>

<script setup lang="ts">
import SeatingGrid from 'components/seating/SeatingGrid.vue'
import { set } from 'lodash'
import { SeatingArrangement, StudentEntity } from 'src/models/entities'
import { PropType, computed } from 'vue'

const props = defineProps({
  columns: {
    required: true,
    type: Object as PropType<SeatingArrangement['columns']>,
  },

  occupants: {
    required: true,
    type: Object as PropType<SeatingArrangement['occupants']>,
  },

  students: {
    required: true,
    type: Array as PropType<StudentEntity[]>,
  },
})

const inverseOccupantMap = computed(() => {
  const map: Record<number, Record<number, string>> = {}
  for (const [studentId, [colNo, rowNo]] of Object.entries(props.occupants)) {
    set(map, [colNo, rowNo], studentId)
  }

  return map
})

function assignSeat(event: DragEvent, colNo: number, rowNo: number) {
  const id = event.dataTransfer?.getData('text')
  if (!id || typeof id !== 'string') {
    // TODO add warn log
    return
  }

  console.log(id, colNo, rowNo)
}
</script>
