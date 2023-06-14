<template>
  <div class="row">
    <div class="col-3">student list</div>
    <div class="col">interface</div>
  </div>
</template>

<script setup lang="ts">
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
})
</script>
