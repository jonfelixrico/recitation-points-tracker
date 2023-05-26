<template>
  <SeatingGrid :columns="columns" :tile-size="50">
    <template v-slot="{ colNo, rowNo }">
      <div
        v-if="inverseOccupantMap[colNo]?.[rowNo]"
        class="bg-green fit cursor-pointer"
        @dblclick="emit('remove', inverseOccupantMap[colNo][rowNo].id)"
      />

      <SeatPlanVisualizerEmptyTile
        v-else
        @drop="(id) => assignSeat(id, colNo, rowNo)"
      />
    </template>
  </SeatingGrid>
</template>

<script setup lang="ts">
import SeatingGrid from 'components/seating/SeatingGrid.vue'
import { keyBy, set } from 'lodash'
import { SeatingArrangement, StudentEntity } from 'src/models/entities'
import { PropType, computed } from 'vue'
import SeatPlanVisualizerEmptyTile from './SeatPlanVisualizerEmptyTile.vue'
import { AssignPayload } from './class-seat-plan-typings'

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

const emit = defineEmits<{
  (e: 'assign', value: AssignPayload): void
  (e: 'remove', value: string): void
}>()

const inverseOccupantMap = computed(() => {
  const indexedStudents = keyBy(props.students, ({ id }) => id)

  const map: Record<number, Record<number, StudentEntity>> = {}
  for (const [studentId, [colNo, rowNo]] of Object.entries(props.occupants)) {
    const student = indexedStudents[studentId]
    if (student) {
      set(map, [colNo, rowNo], student)
    }
  }

  return map
})

function assignSeat(id: string, colNo: number, rowNo: number) {
  emit('assign', {
    colNo,
    rowNo,
    id,
  })
}
</script>
