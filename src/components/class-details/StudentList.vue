<template>
  <q-list v-if="students.length" separator>
    <q-item v-for="student of students" :key="student.id">
      <q-item-section>
        {{ student }}
      </q-item-section>
    </q-item>
  </q-list>

  <div
    v-else
    class="column items-center justify-center empty-list-height q-gutter-y-xs"
  >
    <div class="text-h6">No students to show</div>
    <q-btn no-caps color="primary" unelevated dense>Add a student</q-btn>
  </div>
</template>

<script lang="ts">
import { StudentEntity } from 'src/models/entities'
import { PropType, defineComponent } from 'vue'

export default defineComponent({
  props: {
    students: {
      required: true,
      type: Array as PropType<StudentEntity[]>,
    },
  },
})
</script>

<style lang="scss">
// TODO make this more responsive
.empty-list-height {
  height: 300px;
}
</style>
