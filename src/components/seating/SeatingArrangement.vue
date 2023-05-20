<template>
  <div class="row no-wrap q-gutter-x-xs">
    <div
      v-for="(seatCount, colNo) of arrangement"
      :key="colNo"
      class="column q-gutter-y-xs"
      data-cy="column"
    >
      <div
        v-for="rowNo in seatCount"
        :key="rowNo"
        data-cy="seat"
        class="seat"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  arrangement: {
    required: true,
    type: Array as PropType<number[]>,
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
