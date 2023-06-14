<template>
  <div class="row">
    <div class="col-3">
      <div v-for="student of studentList" :key="student.id">
        {{
          t('common.nameFormat', {
            firstName: student.firstName,
            lastName: student.lastName,
          })
        }}
      </div>
    </div>
    <div class="col">interface</div>
  </div>
</template>

<script setup lang="ts">
import { RecitedStudentsEntity } from 'src/models/entities'
import { SeatingArrangement, StudentEntity } from 'src/models/entities'
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  seatingArrangement: {
    required: true,
    type: Object as PropType<SeatingArrangement>,
  },

  studentList: {
    required: true,
    type: Array as PropType<StudentEntity[]>,
  },

  modelValue: {
    required: true,
    type: Object as PropType<Record<string, RecitedStudentsEntity>>,
  },
})

defineEmits<{
  (e: 'update:modelValue', value: Record<string, RecitedStudentsEntity>): void
}>()

const { t } = useI18n()
</script>
