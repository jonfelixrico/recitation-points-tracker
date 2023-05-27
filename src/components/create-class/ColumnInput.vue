<template>
  <!--
    The only reason why we have a special wrapper class for this input is so that we can use v-vmodel.number.lazy.
    We can't do that directly in the intended parent component because AFAIK we can't use get/set computed with object
    properties. I could be wrong though.
  -->
  <q-input
    type="number"
    v-model.number.lazy="model"
    outlined
    :label="
      t('classes.dialogs.createClass.input.seatCountLabel', {
        colNo,
      })
    "
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

  colNo: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ColumnSeatCountMap): void
}>()

const model = computed({
  get() {
    return props.modelValue[props.colNo - 1] ?? null
  },

  set(value: number) {
    emit('update:modelValue', {
      ...props.modelValue,
      [props.colNo - 1]: value,
    })
  },
})
</script>
