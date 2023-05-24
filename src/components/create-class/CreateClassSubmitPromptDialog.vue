<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide" no-backdrop-dismiss>
    <q-card class="q-dialog-plugin">
      <q-card-section class="text-h6">
        {{ t('classes.dialogs.createClassSubmitPrompt.title') }}
      </q-card-section>

      <q-card-section>
        {{ t('classes.dialogs.createClassSubmitPrompt.message') }}
      </q-card-section>

      <q-separator />

      <q-card-section class="column q-gutter-y-sm">
        <q-input
          :model-value="modelValue.name"
          readonly
          outlined
          :label="t('classes.dialogs.createClassSubmitPrompt.input.nameLabel')"
        />
      </q-card-section>

      <q-separator />

      <q-card-section class="row">
        <div>
          <div>
            {{
              t('classes.dialogs.createClassSubmitPrompt.columnCount', {
                count: modelValue.seatArrangement.length,
              })
            }}
          </div>
          <div>
            {{
              t('classes.dialogs.createClassSubmitPrompt.seatCount', {
                count: modelValue.seatArrangement.reduce(
                  (acc, val) => acc + val
                ),
              })
            }}
          </div>
        </div>
        <div class="col row justify-center">
          <SeatingArrangement :arrangement="modelValue.seatArrangement" />
        </div>
      </q-card-section>

      <q-separator />

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
          unelevated
          no-caps
          data-cy="submit-button"
          @click="onDialogOK"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CreatedClass } from './create-class-typings'
import SeatingArrangement from 'components/seating/SeatingArrangement.vue'

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
const { t } = useI18n()

defineProps({
  modelValue: {
    required: true,
    type: Object as PropType<CreatedClass>,
  },
})
</script>
