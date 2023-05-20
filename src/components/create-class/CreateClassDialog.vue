<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide" no-backdrop-dismiss>
    <q-card class="q-dialog-plugin">
      <q-form @submit.prevent="submitData">
        <q-card-section class="text-h6">{{
          t('classes.dialogs.createClass.title')
        }}</q-card-section>
        <q-card-section class="column q-gutter-y-sm">
          <q-input
            v-model="name"
            outlined
            :label="t('classes.dialogs.createClass.input.nameLabel')"
          />
        </q-card-section>

        <q-card-section>
          <ColumnSection
            class="full-width"
            v-model:col-count="colCount"
            v-model:seat-count-data="seatCountData"
          />
        </q-card-section>

        <!-- TODO tags input -->

        <q-card-actions align="right">
          <q-btn
            flat
            :label="t('common.cancel')"
            v-close-popup
            no-caps
            data-cy="cancel-button"
          />
          <q-btn
            color="primary"
            :label="t('common.submit')"
            type="submit"
            unelevated
            no-caps
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ColumnSeatCountMap } from './create-class-typings'
import ColumnSection from './ColumnSection.vue'

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
const { t } = useI18n()

const name = ref<string>('')
const seatCountData = ref<ColumnSeatCountMap>({})
const colCount = ref<number>(0)

function submitData() {
  onDialogOK({
    name: name.value,
    seatArrangement: Array.from(
      { length: colCount.value },
      (_, index) => seatCountData.value[index]
    ),
  })
}
</script>
