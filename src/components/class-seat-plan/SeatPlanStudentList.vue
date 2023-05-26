<template>
  <div
    v-for="student in students"
    :key="student.id"
    draggable="true"
    @dragstart="($event) => setDragData($event, student.id)"
  >
    {{ student }}
  </div>
</template>

<script setup lang="ts">
import { StudentEntity } from 'src/models/entities'
import { PropType } from 'vue'

defineProps({
  students: {
    required: true,
    type: Array as PropType<StudentEntity[]>,
  },
})

function setDragData(event: DragEvent, id: string) {
  if (!event.dataTransfer) {
    // TODO warn log
    return
  }

  event.dataTransfer.setData('text', id)
}
</script>
