<template>
  <q-item>
    <q-item-section side>
      <span data-cy="item-no">{{ itemNo }}</span>
    </q-item-section>

    <q-item-section>
      <i18n-t keypath="common.nameFormat" tag="span" class="white-space-pre">
        <template #firstName>
          <span data-cy="first-name">{{ student.firstName }}</span>
        </template>

        <template #lastName>
          <span data-cy="last-name">{{ student.lastName }}</span>
        </template>
      </i18n-t>
    </q-item-section>

    <q-item-section side>
      <q-btn
        icon="delete"
        flat
        round
        dense
        color="negative"
        @click="$emit('deleteClick')"
        data-cy="delete-button"
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

  emits: ['deleteClick'],

  setup() {
    const { t } = useI18n()

    return {
      t,
    }
  },
})
</script>
