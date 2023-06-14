<template>
  <div v-for="student of students" :key="student.id">
    {{
      t('common.nameFormat', {
        firstName: student.firstName,
        lastName: student.lastName,
      })
    }}
  </div>
</template>

<script setup lang="ts">
import { SeatingArrangement, StudentEntity } from 'src/models/entities'
import { PropType } from 'vue'
import { RecitedStudentsEntityMap } from './grading-types'
import { useI18n } from 'vue-i18n'

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
</script>
