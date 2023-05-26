<template>
  <SeatingGrid :columns="modelValue" />
</template>

<script setup lang="ts">
import SeatingGrid from 'component/seating/SeatingGrid.vue'
import { SeatingArrangement, StudentEntity } from 'src/models/entities'
import { PropType } from 'vue'

defineProps({
  modelValue: {
    required: true,
    type: Object as PropType<SeatingArrangement>,
  },

  students: {
    required: true,
    type: Array as PropType<StudentEntity[]>,
  },
})
</script>
