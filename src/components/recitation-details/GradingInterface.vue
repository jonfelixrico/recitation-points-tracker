<template>
  <div class="row">
    <div class="col-3">student list</div>
    <div class="col">interface</div>
  </div>
</template>

<script setup lang="ts">
import { RecitedStudentsEntity } from 'src/models/entities'
import { SeatingArrangement, StudentEntity } from 'src/models/entities'
import { PropType } from 'vue'

defineProps({
  seatingArrangement: {
    required: true,
    type: Object as PropType<SeatingArrangement>,
  },

  students: {
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
</script>
