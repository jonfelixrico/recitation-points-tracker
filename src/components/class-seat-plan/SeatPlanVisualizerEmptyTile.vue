<template>
  <div
    class="fit bg-grey"
    :class="{ 'bg-blue': isHovered }"
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
}

const isHovered = ref(false)
</script>
