<template>
  <q-list v-if="students.length" separator data-cy="student-content">
    <q-item v-for="student of students" :key="student.id" :student="student">
      <q-item-section>
        <i18n-t keypath="common.nameFormat" tag="span" class="white-space-pre">
          <template #firstName>
            <span>{{ student.firstName }}</span>
          </template>

          <template #lastName>
            <span class="text-weight-bold">{{
              student.lastName.toUpperCase()
            }}</span>
          </template>
        </i18n-t>
      </q-item-section>

      <q-item-section side>
        <q-btn
          icon="delete"
          color="negative"
          round
          flat
          dense
          @click="onDeleteClick(student.id)"
        />
      </q-item-section>
    </q-item>
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
import { useQuasar } from 'quasar'
import { StudentEntity } from 'src/models/entities'
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  students: {
    required: true,
    type: Array as PropType<StudentEntity[]>,
  },
})
const emit = defineEmits(['addClick', 'deleteClick'])

const { t } = useI18n()

const { dialog } = useQuasar()

function onDeleteClick(id: string) {
  const item = props.students.find((s) => s.id === id)
  if (!item) {
    // method is misused if this condition is triggered
    return
  }

  const nameToDelete = t('common.nameFormat', {
    firstName: item.firstName,
    lastName: item.lastName,
  })

  dialog({
    title: t('classes.dialogs.removeStudent.title'),
    message: t('classes.dialogs.removeStudent.message', {
      // TODO create a custom component to highlight this
      name: `<mark><b>${nameToDelete}</b></mark>`,
    }),
    ok: {
      label: t('classes.dialogs.removeStudent.okLabel'),
      unelevated: true,
      noCaps: true,
    },
    cancel: {
      noCaps: true,
      flat: true,
    },
    html: true,
  }).onOk(() => {
    emit('deleteClick', id)
  })
}
</script>

<style lang="scss">
// TODO make this more responsive
.empty-list-height {
  height: 300px;
}
</style>
