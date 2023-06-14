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
import { getInverseOccupantMap } from 'src/utils/seating-utils'

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

const inverseOccupantMap = computed(() =>
  getInverseOccupantMap(props.students, props.seatingArrangement.occupants)
)
</script>
