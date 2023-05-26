<template>
  <!-- Range iteration is base 1 -->
  <div v-for="(_, rowIdx) in seatCount" :key="rowIdx">
    <slot :rowIdx="rowIdx" :seatNo="accumulator + rowIdx" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  seatCount: {
    type: Number,
    required: true,
  },

  accumulator: {
    type: Number,
    required: true,
  },
})
</script>
