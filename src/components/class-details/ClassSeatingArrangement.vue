<template>
  <div class="row">
    <!-- TODO adjust side panel UI -->
    <div class="side-panel flex flex-center">
      <!-- TODO i18nize this -->
      No students
    </div>
    <q-scroll-area class="col">
      <!-- TODO add seating grid component -->
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  columns: {
    type: Array as PropType<number[]>,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.side-panel {
  width: 200px;
}
</style>
