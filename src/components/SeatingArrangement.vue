<template>
  <div class="row no-wrap q-gutter-x-xs">
    <div
      v-for="columnNo in columnCount"
      :key="columnNo"
      class="column q-gutter-y-xs"
      data-cy="column"
    >
      <div v-for="rowNo in rowCount" :key="rowNo" data-cy="seat" class="seat" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  rowCount: {
    required: true,
    type: Number,
  },
  columnCount: {
    required: true,
    type: Number,
  },
})
</script>

<style scoped lang="scss">
.seat {
  $size: 10px;

  width: $size;
  height: $size;

  background-color: $grey;
}
</style>
