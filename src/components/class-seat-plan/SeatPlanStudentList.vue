<template>
  <div class="column q-gutter-y-md">
    <template v-for="student in students" :key="student.id">
      <div
        v-if="!seatsOccupied[student.id]"
        draggable="true"
        @dragstart="($event) => setDragData($event, student.id)"
        class="cursor-grab"
      >
        <q-item>
          <q-item-section>
            <div class="text-weight-bold">
              {{
                t('common.nameFormat', {
                  firstName: student.firstName,
                  lastName: student.lastName,
                })
              }}
            </div>
            <div class="text-caption">No seat yet</div>
          </q-item-section>

          <q-item-section side>
            <q-icon name="drag_handle" />
          </q-item-section>
        </q-item>
      </div>

      <q-item v-else>
        <q-item-section>
          <div class="text-weight-bold">
            {{
              t('common.nameFormat', {
                firstName: student.firstName,
                lastName: student.lastName,
              })
            }}
          </div>
          <div class="text-caption">
            <!-- TODO specify which seat -->
            Seat #
          </div>
        </q-item-section>
        <q-item-section side>
          <q-btn
            no-caps
            color="negative"
            dense
            unelevated
            size="sm"
            @click="emit('remove', student.id)"
          >
            Remove seat
          </q-btn>
        </q-item-section>
      </q-item>
    </template>
  </div>
</template>

<script setup lang="ts">
import { SeatingArrangement, StudentEntity } from 'src/models/entities'
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  students: {
    required: true,
    type: Array as PropType<StudentEntity[]>,
  },

  seatsOccupied: {
    required: true,
    type: Object as PropType<SeatingArrangement['occupants']>,
  },

  columns: {
    required: true,
    type: Object as PropType<SeatingArrangement['columns']>,
  },
})

const emit = defineEmits<{
  (e: 'remove', id: string): void
}>()

function setDragData(event: DragEvent, id: string) {
  if (!event.dataTransfer) {
    // TODO warn log
    return
  }

  event.dataTransfer.setData('text', id)
}

const { t } = useI18n()
</script>
