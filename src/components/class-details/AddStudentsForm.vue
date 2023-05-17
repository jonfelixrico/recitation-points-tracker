<template>
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
  <q-separator v-if="modelValue.length" />
  <q-form @submit.prevent="addStudent" data-cy="input" ref="formRef">
    <q-item>
      <q-item-section>
        <div class="row q-gutter-x-xs">
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
        </div>
      </q-item-section>

      <!-- padding-bottom is to offset the error space at the bottom of the fields -->
      <q-item-section side style="padding-bottom: 20px">
        <q-btn
          icon="add_circle"
          flat
          round
          dense
          color="primary"
          type="submit"
          data-cy="submit"
        />
      </q-item-section>
    </q-item>
  </q-form>
</template>

<script lang="ts">
import { QForm } from 'quasar'
import { StudentEntity } from 'src/models/entities'
import { PropType, defineComponent, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    modelValue: {
      required: true,
      type: Array as PropType<StudentEntity[]>,
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
        {
          ...inputModel,
          seatColumn: 1,
          seatRow: 1,
        },
      ] as StudentEntity[])

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
