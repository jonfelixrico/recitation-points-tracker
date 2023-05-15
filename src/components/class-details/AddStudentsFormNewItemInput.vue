<template>
  <q-form @submit.prevent="$emit('submit', modelValue)">
    <q-item data-cy="input">
      <q-item-section>
        <div class="row q-gutter-x-xs">
          <q-input
            outlined
            class="col"
            dense
            v-model="lastName"
            :label="t('classes.addStudentsForm.input.firstNameLabel')"
          />
          <q-input
            :label="t('classes.addStudentsForm.input.lastNameLabel')"
            outlined
            class="col"
            dense
            v-model="firstName"
          />
        </div>
      </q-item-section>
      <q-item-section side>
        <q-btn icon="add_circle" flat round dense color="primary" />
      </q-item-section>
    </q-item>
  </q-form>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    modelValue: {
      required: true,
      type: Object as PropType<{
        firstName: string
        lastName: string
      }>,
    },
  },

  emits: ['update:modelValue', 'submit'],

  setup(props, { emit }) {
    const { t } = useI18n()

    const firstName = computed({
      get() {
        return props.modelValue.firstName
      },

      set(value) {
        emit('update:modelValue', {
          ...props.modelValue,
          firstName: value,
        })
      },
    })

    const lastName = computed({
      get() {
        return props.modelValue.lastName
      },

      set(value) {
        emit('update:modelValue', {
          ...props.modelValue,
          lastName: value,
        })
      },
    })

    return {
      firstName,
      lastName,
      t,
    }
  },
})
</script>
