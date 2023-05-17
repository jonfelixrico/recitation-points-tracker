<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <AddStudentsForm data-cy="form" v-model="studentsList" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { defineComponent, ref } from 'vue'
import AddStudentsForm from './AddStudentsForm.vue'

// TODO move to proper types
interface PartialStudent {
  firstName: string
  lastName: string
}

export default defineComponent({
  components: { AddStudentsForm },

  emits: [...useDialogPluginComponent.emits],

  setup() {
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

    const studentsList = ref<PartialStudent[]>([])

    return {
      dialogRef,
      onDialogHide,

      submitData() {
        onDialogOK(studentsList)
      },

      studentsList,
    }
  },
})
</script>
