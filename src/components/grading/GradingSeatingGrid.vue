<template>
  <SeatingGrid
    :columns="seatingArrangement.columns"
    :tile-size="50"
    v-slot="{ colIdx, rowIdx, seatIdx }"
  >
    <div
      v-if="inverseOccupantMap[colIdx]?.[rowIdx]"
      @click="emit('tile-click', inverseOccupantMap[colIdx][rowIdx].id)"
      class="cursor-pointer bg-green fit relative-position flex flex-center"
      v-ripple
    >
      {{ inverseOccupantMap[colIdx][rowIdx].points }}
    </div>

    <!-- Seat is still unoccupied -->
    <div v-else class="bg-grey fit flex flex-center">
      {{ seatIdx }}
    </div>
  </SeatingGrid>
</template>

<script setup lang="ts">
import { SeatingArrangement, StudentEntity } from 'src/models/entities'
import { PropType, computed } from 'vue'
import { RecitedStudentsEntityMap } from './grading-types'
import SeatingGrid from 'components/seating/SeatingGrid.vue'
import { keyBy, set } from 'lodash'

interface StudentEntityWithPoints extends StudentEntity {
  points: number
}

const props = defineProps({
  seatingArrangement: {
    required: true,
    type: Object as PropType<SeatingArrangement>,
  },

  students: {
    required: true,
    type: Array as PropType<StudentEntity[]>,
  },

  recitedStudents: {
    required: true,
    type: Object as PropType<RecitedStudentsEntityMap>,
  },
})

const emit = defineEmits<{
  (e: 'tile-click', value: string): void
}>()

const inverseOccupantMap = computed(() => {
  const indexedStudents = keyBy(props.students, ({ id }) => id)

  const map: Record<number, Record<number, StudentEntityWithPoints>> = {}
  for (const [studentId, [colNo, rowNo]] of Object.entries(
    props.seatingArrangement.occupants
  )) {
    const student = indexedStudents[studentId]
    if (student) {
      set(map, [colNo, rowNo], {
        ...student,
        points: props.recitedStudents[student.id]?.points ?? 0,
      })
    }
  }

  return map
})
</script>
