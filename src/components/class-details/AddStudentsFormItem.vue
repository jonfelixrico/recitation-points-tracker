<template>
  <q-item>
    <q-item-section side> {{ itemNo }}. </q-item-section>

    <q-item-section>
      {{
        t('common.nameFormat', {
          firstName: student.firstName,
          lastName: student.lastName,
        })
      }}
    </q-item-section>

    <q-item-section side>
      <q-btn
        icon="delete"
        flat
        round
        dense
        color="negative"
        @click="$emit('delete-click')"
      />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { DraftStudent } from './draft-student.inteface'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    student: {
      required: true,
      type: Object as PropType<DraftStudent>,
    },

    itemNo: {
      type: Number,
      required: true,
    },
  },

  emits: ['delete-click'],

  setup() {
    const { t } = useI18n()

    return {
      t,
    }
  },
})
</script>
