<template>
  <div v-for="(student, index) of modelValue" :key="index" data-cy="student">
    {{ student }}
  </div>
</template>

<script lang="ts">
import { StudentEntity } from 'src/models/entities'
import { PropType, defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      required: true,
      type: Array as PropType<StudentEntity[]>,
    },
  },
})
</script>
