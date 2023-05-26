<template>
  <div
    class="fit tile flex flex-center"
    :class="{ hovered: isHovered }"
    @drop="emitDrop"
    @dragover.prevent="isHovered = true"
    @dragleave="isHovered = false"
  >
    <div>{{ seatNo }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  seatNo: {
    type: Number,
    required: true,
  },
})

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
