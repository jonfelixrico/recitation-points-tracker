<template>
  <div>
    <!-- TODO add something -->
  </div>
</template>

<script setup lang="ts">
import {
  RecitedStudentEntity,
  SeatingArrangement,
  StudentEntity,
} from 'src/models/entities'
import { PropType } from 'vue'
import { RecitedStudentsEntityMap } from './grading-types'

defineProps({
  seatingArrangement: {
    required: true,
    type: Object as PropType<SeatingArrangement>,
  },

  studentList: {
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
</script>
