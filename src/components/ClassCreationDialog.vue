<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-form @submit.prevent="submitData">
      <q-card class="q-dialog-plugin">
        <q-input v-model="model.name">Name</q-input>
        <q-input v-model.number="model.seatRows">Rows</q-input>
        <q-input v-model.number="model.seatColumns">Columns</q-input>

        <!-- TODO tags input -->

        <q-card-actions align="right">
          <q-btn color="primary" label="OK" type="submit" />
          <q-btn color="primary" label="Cancel" v-popup-close />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { ClassEntity } from 'src/models/entities'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  emits: [...useDialogPluginComponent.emits],

  setup() {
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

    const model = reactive<Omit<ClassEntity, 'id'>>({
      name: '',
      seatColumns: 1,
      seatRows: 1,
      tags: [],
    })

    return {
      dialogRef,
      onDialogHide,

      submitData() {
        onDialogOK(model)
      },

      model,
    }
  },
})
</script>
