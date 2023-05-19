<template>
  <q-item>
    <q-item-section>
      <i18n-t keypath="common.nameFormat" tag="span" class="white-space-pre">
        <template #firstName>
          <span>{{ student.firstName }}</span>
        </template>

        <template #lastName>
          <span class="font-weight-bold">{{
            student.lastName.toUpperCase()
          }}</span>
        </template>
      </i18n-t>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { StudentEntity } from 'src/models/entities'
import { PropType } from 'vue'

defineProps({
  student: {
    required: true,
    type: Object as PropType<StudentEntity>,
  },
})
</script>
