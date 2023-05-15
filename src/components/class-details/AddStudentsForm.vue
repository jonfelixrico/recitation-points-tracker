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

    <AddStudentsFormNewItemInput :model-value="inputModel" data-cy="input" />
  </q-list>
</template>

<script lang="ts">
import { StudentEntity } from 'src/models/entities'
import { PropType, defineComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import AddStudentsFormNewItemInput from './AddStudentsFormNewItemInput.vue'

export default defineComponent({
  components: { AddStudentsFormNewItemInput },
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
