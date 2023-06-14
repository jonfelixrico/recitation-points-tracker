<template>
  <SeatingGrid
    :columns="seatingArrangement.columns"
    v-slot="{ colIdx, rowIdx }"
  >
    <div>
      {{ inverseOccupantMap[colIdx]?.[rowIdx] }}
    </div>
  </SeatingGrid>
</template>

<script setup lang="ts">
import {
  RecitedStudentEntity,
  SeatingArrangement,
  StudentEntity,
} from 'src/models/entities'
import { PropType, computed } from 'vue'
import { RecitedStudentsEntityMap } from './grading-types'
import SeatingGrid from 'components/seating/SeatingGrid.vue'
import { keyBy, set } from 'lodash'

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

defineEmits<{
  (e: 'student-update', value: RecitedStudentEntity): void
}>()

const inverseOccupantMap = computed(() => {
  const indexedStudents = keyBy(props.students, ({ id }) => id)

  const map: Record<number, Record<number, StudentEntity>> = {}
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
