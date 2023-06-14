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
        :recited-students="recitedStudents"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SeatingArrangement, StudentEntity } from 'src/models/entities'
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  PointUpdateEventValue,
  RecitedStudentsEntityMap,
} from './grading-types'
import GradingSeatingGrid from './GradingSeatingGrid.vue'

const { t } = useI18n()

defineProps({
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
  (e: 'point-update', value: PointUpdateEventValue): void
}>()
</script>
