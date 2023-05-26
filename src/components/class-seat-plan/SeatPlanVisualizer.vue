<template>
  <SeatingGrid :columns="columns" />
</template>

<script setup lang="ts">
import SeatingGrid from 'components/seating/SeatingGrid.vue'
import { SeatingArrangement, StudentEntity } from 'src/models/entities'
import { PropType } from 'vue'

defineProps({
  columns: {
    required: true,
    type: Object as PropType<SeatingArrangement['columns']>,
  },

  occupants: {
    required: true,
    type: Object as PropType<SeatingArrangement['occupants']>,
  },

  students: {
    required: true,
    type: Array as PropType<StudentEntity[]>,
  },
})
</script>
