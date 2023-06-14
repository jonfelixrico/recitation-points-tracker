<template>
  <div class="row">
    <div class="col-3">
      <div v-for="student of students" :key="student.id">
        {{
          t('common.nameFormat', {
            firstName: student.firstName,
            lastName: student.lastName,
          })
        }}
      </div>
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
import { useI18n } from 'vue-i18n'
import { PointUpdateEventValue } from './grading-types'
import GradingSeatingGrid from './GradingSeatingGrid.vue'
import { keyBy } from 'lodash'

const { t } = useI18n()

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
