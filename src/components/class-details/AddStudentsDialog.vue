<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <AddStudentsForm data-cy="form" v-model="studentsList" />
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary" unelevated no-caps @click="submitData">{{
          t('common.submit')
        }}</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { defineComponent, ref } from 'vue'
import AddStudentsForm from './AddStudentsForm.vue'
import { useI18n } from 'vue-i18n'

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
    const { t } = useI18n()

    const studentsList = ref<PartialStudent[]>([])

    return {
      dialogRef,
      onDialogHide,

      submitData() {
        onDialogOK(studentsList)
      },

      studentsList,

      t,
    }
  },
})
</script>
