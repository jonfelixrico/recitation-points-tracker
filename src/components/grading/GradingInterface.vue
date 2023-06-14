<template>
  <div class="row">
    <div class="col-3">
      <GradingStudentList
        :students="students"
        :seating-arrangement="seatingArrangement"
        :recited-students="recitedStudentsMap"
      />
    </div>

    <div class="col flex flex-center">
      <GradingSeatingGrid
        :students="students"
        :seating-arrangement="seatingArrangement"
        :recited-students="recitedStudentsMap"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  RecitedStudentEntity,
  SeatingArrangement,
  StudentEntity,
} from 'src/models/entities'
import { PropType, computed } from 'vue'
import { PointUpdateEventValue } from './grading-types'
import GradingSeatingGrid from './GradingSeatingGrid.vue'
import { keyBy } from 'lodash'
import GradingStudentList from './GradingStudentList.vue'

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
    type: Array as PropType<RecitedStudentEntity[]>,
  },
})

defineEmits<{
  (e: 'point-update', value: PointUpdateEventValue): void
}>()

const recitedStudentsMap = computed(() =>
  keyBy(props.recitedStudents, (item) => item.studentId)
)
</script>
