<template>
  <div class="column">
    <q-form @submit.prevent="addItem" data-cy="input" ref="formRef">
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
        <AddStudentsFormItem
          v-for="(student, index) of modelValue"
          :key="index"
          data-cy="item"
          :student="student"
          :item-no="index"
          @delete-click="removeItem(index)"
        />
      </q-list>
    </div>

    <div
      v-else
      data-cy="empty-message"
      class="col column justify-center items-center text-accent"
    >
      <div>{{ t('classes.addStudentsForm.emptyMessage') }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { QForm } from 'quasar'
import { PropType, defineComponent, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DraftStudent } from './draft-student.inteface'
import AddStudentsFormItem from './AddStudentsFormItem.vue'

export default defineComponent({
  components: {
    AddStudentsFormItem,
  },

  props: {
    modelValue: {
      required: true,
      type: Array as PropType<DraftStudent[]>,
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

    return {
      inputModel,
      t,
      formRef,

      addItem() {
        emit('update:modelValue', [
          ...props.modelValue,
          {
            /*
             * need to make a shallow copy or else all values in the list will be
             * the same as the inputs
             */
            ...inputModel,
          },
        ] as DraftStudent[])

        inputModel.firstName = ''
        inputModel.lastName = ''

        if (formRef.value) {
          formRef.value.reset()
          formRef.value.focus()
        }
      },

      removeItem(index: number) {
        const clone = [...props.modelValue]
        clone.splice(index, 1)

        emit('update:modelValue', clone)
      },
    }
  },
})
</script>
