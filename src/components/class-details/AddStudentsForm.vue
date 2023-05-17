<template>
  <div class="column">
    <q-form @submit.prevent="addStudent" data-cy="input" ref="formRef">
      <div class="q-px-sm q-pb-xs q-pt-sm">
        <div class="row q-gutter-x-sm">
          <q-input
            outlined
            class="col"
            dense
            v-model="inputModel.firstName"
            :label="t('classes.addStudentsForm.input.firstNameLabel')"
            :rules="[(val) => !!val || t('common.validationError.required')]"
            data-cy="first-name"
          />
          <q-input
            :label="t('classes.addStudentsForm.input.lastNameLabel')"
            outlined
            class="col"
            dense
            v-model="inputModel.lastName"
            :rules="[(val) => !!val || t('common.validationError.required')]"
            data-cy="last-name"
          />
          <div style="padding-bottom: 20px" class="flex flex-center">
            <q-btn
              icon="add_circle"
              flat
              round
              dense
              color="primary"
              type="submit"
              data-cy="submit"
            />
          </div>
        </div>
      </div>
    </q-form>
    <q-separator />

    <div class="col overflow-auto" v-if="modelValue.length">
      <q-list separator>
        <q-item
          v-for="(student, index) of modelValue"
          :key="index"
          data-cy="student"
        >
          <q-item-section side> {{ index + 1 }}. </q-item-section>

          <q-item-section>
            {{
              t('common.nameFormat', {
                firstName: student.firstName,
                lastName: student.lastName,
              })
            }}
          </q-item-section>

          <q-item-section side>
            <q-btn icon="delete" flat round dense color="negative" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div
      v-else
      data-cy="empty"
      class="col column justify-center items-center text-accent"
    >
      <div>No students added yet</div>
    </div>
  </div>
</template>

<script lang="ts">
import { QForm } from 'quasar'
import { PropType, defineComponent, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface PartialStudent {
  firstName: string
  lastName: string
}

export default defineComponent({
  props: {
    modelValue: {
      required: true,
      type: Array as PropType<PartialStudent[]>,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const { t } = useI18n()
    const inputModel = reactive({
      firstName: '',
      lastName: '',
    })

    const formRef = ref<QForm | null>(null)

    function addStudent() {
      emit('update:modelValue', [
        ...props.modelValue,
        inputModel,
      ] as PartialStudent[])

      inputModel.firstName = ''
      inputModel.lastName = ''

      if (formRef.value) {
        formRef.value.reset()
      }
    }

    return {
      inputModel,
      t,
      addStudent,
      formRef,
    }
  },
})
</script>
