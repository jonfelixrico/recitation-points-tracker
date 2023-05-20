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
            v-model="model.name"
            outlined
            :label="t('classes.dialogs.createClass.input.nameLabel')"
          />
        </q-card-section>

        <q-card-section>
          <div class="row q-gutter-x-md">
            <q-input
              v-model.number="model.seatRows"
              type="number"
              outlined
              :label="t('classes.dialogs.createClass.input.rowsLabel')"
              class="col"
            />

            <q-input
              v-model.number="model.seatColumns"
              type="number"
              outlined
              :label="t('classes.dialogs.createClass.input.columnsLabel')"
              class="col"
            />
          </div>
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
import { ClassEntity } from 'src/models/entities'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
const { t } = useI18n()

const model = reactive<Omit<ClassEntity, 'id'>>({
  name: '',
  seatColumns: 1,
  seatRows: 1,
  tags: [],
})

function submitData() {
  onDialogOK(model)
}
</script>
