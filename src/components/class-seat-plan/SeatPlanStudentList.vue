<template>
  <div v-for="student in students" :key="student.id" draggable="true">
    {{ student }}
  </div>
</template>

<script setup lang="ts">
import { StudentEntity } from 'src/models/entities'
import { PropType } from 'vue'

defineProps({
  students: {
    required: true,
    type: Array as PropType<StudentEntity[]>,
  },
})
</script>
