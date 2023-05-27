<template>
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

      <div class="text-caption">
        <span v-if="seatNo === undefined">
          {{ t('classes.noSeat') }}
        </span>

        <span v-else>
          {{ t('classes.seatNo', { seatNo }) }}
        </span>
      </div>
    </q-item-section>

    <q-item-section side>
      <slot name="side" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { StudentEntity } from 'src/models/entities'
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  student: {
    required: true,
    type: Object as PropType<StudentEntity>,
  },

  seatNo: Number,
})

const { t } = useI18n()
</script>
