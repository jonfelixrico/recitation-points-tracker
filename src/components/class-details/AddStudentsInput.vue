<template>
  <q-list separator>
    <q-item
      v-for="(student, index) of modelValue"
      :key="index"
      data-cy="student"
    >
      <q-item-section>
        {{
          t('common.nameFormat', {
            firstName: student.firstName,
            lastName: student.lastName,
          })
        }}
      </q-item-section>
    </q-item>

    <q-form @submit.prevent>
      <q-item data-cy="input">
        <!-- TODO add submit handler -->
        <q-item-section>
          <div class="row q-gutter-x-xs">
            <q-input
              outlined
              class="col"
              dense
              v-model="inputModel.lastName"
              :label="t('classes.addStudentsInput.firstNameLabel')"
            />
            <q-input
              :label="t('classes.addStudentsInput.lastNameLabel')"
              outlined
              class="col"
              dense
              v-model="inputModel.firstName"
            />
          </div>
        </q-item-section>
        <q-item-section side>
          <q-btn icon="add_circle" flat round dense color="primary" />
        </q-item-section>
      </q-item>
    </q-form>
  </q-list>
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
