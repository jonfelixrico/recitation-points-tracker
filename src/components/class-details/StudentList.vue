<template>
  <q-list v-if="students.length" separator data-cy="student-content">
    <StudentListItem
      v-for="student of students"
      :key="student.id"
      :student="student"
    />
  </q-list>

  <div
    v-else
    class="column items-center justify-center empty-list-height q-gutter-y-xs"
    data-cy="empty-notice"
  >
    <div class="text-h6">{{ t('classes.emptyStudents') }}</div>
    <q-btn
      no-caps
      color="primary"
      unelevated
      dense
      @click="$emit('addClick')"
      data-cy="add-student-button"
    >
      {{ t('classes.addStudents') }}
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { StudentEntity } from 'src/models/entities'
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import StudentListItem from './StudentListItem.vue'

defineProps({
  students: {
    required: true,
    type: Array as PropType<StudentEntity[]>,
  },
})

defineEmits(['addClick'])

const { t } = useI18n()
</script>

<style lang="scss">
// TODO make this more responsive
.empty-list-height {
  height: 300px;
}
</style>
