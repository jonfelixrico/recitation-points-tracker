<template>
  <div
    class="fit tile"
    :class="{ hovered: isHovered }"
    @drop="emitDrop"
    @dragover.prevent="isHovered = true"
    @dragleave="isHovered = false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'drop', id: string): void
}>()

function emitDrop(event: DragEvent) {
  if (!event.dataTransfer) {
    // TODO warn
    return
  }

  emit('drop', event.dataTransfer.getData('text'))
  isHovered.value = false
}

const isHovered = ref(false)
</script>

<style lang="scss">
.tile {
  background-color: $grey;

  &.hovered {
    background-color: $red;
  }

  transition: background-color 0.15s;
}
</style>
