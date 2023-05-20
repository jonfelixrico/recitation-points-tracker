<template>
  <q-input
    type="number"
    v-model.number.lazy="model"
    outlined
    :label="t('classes.dialogs.createClass.input.seatCountLabel')"
  />
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ColumnSeatCountMap } from './create-class-typings'

const { t } = useI18n()

const props = defineProps({
  modelValue: {
    type: Object as PropType<ColumnSeatCountMap>,
    required: true,
  },

  colIndex: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ColumnSeatCountMap): void
}>()

const model = computed({
  get() {
    return props.modelValue[props.colIndex] ?? null
  },

  set(value: number) {
    emit('update:modelValue', {
      ...props.modelValue,
      [props.colIndex]: value,
    })
  },
})
</script>
