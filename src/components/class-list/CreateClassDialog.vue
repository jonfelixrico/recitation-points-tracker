<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-form @submit.prevent="submitData">
        <q-card-section class="text-h6"> Create Class </q-card-section>
        <q-card-section class="column q-gutter-y-sm">
          <q-input v-model="model.name" outlined label="Class name" />
        </q-card-section>

        <q-card-section>
          <div class="row q-gutter-x-md">
            <q-input
              v-model.number="model.seatRows"
              type="number"
              outlined
              label="Rows"
              class="col"
            />

            <q-input
              v-model.number="model.seatColumns"
              type="number"
              outlined
              label="Columns"
              class="col"
            />
          </div>
        </q-card-section>

        <!-- TODO tags input -->

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-popup-close no-caps />
          <q-btn color="primary" label="OK" type="submit" unelevated no-caps />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { ClassEntity } from 'src/models/entities'
import { reactive } from 'vue'

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

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
