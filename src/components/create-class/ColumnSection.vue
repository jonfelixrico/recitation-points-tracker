<template>
  <div class="column q-gutter-y-sm">
    <div class="row q-gutter-x-xs">
      <div class="col text-weight-bold">
        {{ t('classes.dialogs.createClass.columns') }}
      </div>

      <q-btn
        icon="add"
        flat
        round
        dense
        @click="colCountModel += 1"
        data-cy="add-button"
        color="positive"
      />
      <q-btn
        icon="remove"
        flat
        round
        dense
        @click="colCountModel -= 1"
        data-cy="subtract-button"
        color="negative"
      />
    </div>

    <div v-for="colNo in colCountModel" :key="colNo" data-cy="column-item">
      <!-- TODO add more information here (column number maybe?) -->
      <ColumnInput
        v-model="seatCountDataModel"
        :col-no="colNo"
        data-cy="input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ColumnInput from './ColumnInput.vue'
import { ColumnSeatCountMap } from './create-class-typings'

const { t } = useI18n()

const props = defineProps({
  colCount: {
    type: Number,
    required: true,
  },

  seatCountData: {
    type: Object as PropType<ColumnSeatCountMap>,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'update:colCount', value: number): void
  (e: 'update:seatCountData', value: ColumnSeatCountMap): void
}>()

const colCountModel = computed({
  get() {
    return props.colCount
  },

  set(value: number) {
    emit('update:colCount', value)
  },
})

const seatCountDataModel = computed({
  get() {
    return props.seatCountData
  },

  set(value: ColumnSeatCountMap) {
    emit('update:seatCountData', value)
  },
})
</script>
