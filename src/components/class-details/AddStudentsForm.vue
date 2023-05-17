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
  <q-form @submit.prevent="$emit('submit', modelValue)" data-cy="input">
    <q-item>
      <q-item-section>
        <div class="row q-gutter-x-xs">
          <q-input
            outlined
            class="col"
            dense
            v-model="inputModel.lastName"
            :label="t('classes.addStudentsForm.input.firstNameLabel')"
            :rules="[(val) => !!val || t('common.validationError.required')]"
          />
          <q-input
            :label="t('classes.addStudentsForm.input.lastNameLabel')"
            outlined
            class="col"
            dense
            v-model="inputModel.firstName"
            :rules="[(val) => !!val || t('common.validationError.required')]"
          />
        </div>
      </q-item-section>
      <q-item-section side>
        <q-btn
          icon="add_circle"
          flat
          round
          dense
          color="primary"
          type="submit"
        />
      </q-item-section>
    </q-item>
  </q-form>
</template>

<script lang="ts">
import { StudentEntity } from 'src/models/entities'
import { PropType, defineComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    modelValue: {
      required: true,
      type: Array as PropType<StudentEntity[]>,
    },
  },

  setup() {
    const { t } = useI18n()
    const inputModel = reactive({
      firstName: '',
      lastName: '',
    })

    return {
      inputModel,
      t,
    }
  },
})
</script>
