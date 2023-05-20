<template>
  <div>
    <div class="row q-gutter-x-xs">
      <div class="col">{{ t('classes.dialogs.createClass.columns') }}</div>

      <q-btn icon="add" flat round dense @click="colCountModel += 1" />
      <q-btn icon="remove" flat round dense @click="colCountModel -= 1" />
    </div>

    <div v-for="index in colCountModel" :key="index">
      <q-input
        type="number"
        :model-value="seatCountData[index] ?? ''"
        @update:model-value="(value) => setSeatCount(index, value)"
        outlined
        :label="t('classes.dialogs.createClass.input.seatCountLabel')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  colCount: {
    type: Number,
    required: true,
  },

  seatCountData: {
    type: Object as PropType<Record<number, number | null>>,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'update:colCount', value: number): void
  (e: 'update:seatCountData', value: Record<number, number | null>): void
}>()

const colCountModel = computed({
  get() {
    return props.colCount
  },

  set(value: number) {
    emit('update:colCount', value)
  },
})

function setSeatCount(index: number, value: unknown) {
  const copy = {
    ...props.seatCountData,
  }
  copy[index] = value === '' ? null : Number(value)
  emit('update:seatCountData', copy)
}
</script>
