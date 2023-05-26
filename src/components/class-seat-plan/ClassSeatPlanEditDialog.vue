<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" maximized>
    <div class="bg-white fit column">
      <q-bar class="justify-between bg-primary text-white">
        <div>Edit Seat Plan</div>
        <q-btn icon="close" flat round dense v-close-popup />
      </q-bar>
      <div class="col">
        <!-- TODO add content -->
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { StudentEntity } from 'src/models/entities'
import { SeatingArrangement } from 'src/models/entities'
import { PropType } from 'vue'

defineProps({
  modelValue: {
    required: true,
    type: Object as PropType<SeatingArrangement>,
  },

  students: {
    required: true,
    type: Array as PropType<StudentEntity[]>,
  },
})

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
</script>
