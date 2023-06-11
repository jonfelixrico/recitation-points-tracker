<template>
  <q-item>
    <q-item-section>
      <div class="text-h6">{{ recitation.name }}</div>
      <div>{{ recitation.recitationDt }}</div>
    </q-item-section>
    <q-item-section side>
      <q-btn
        no-caps
        unelevated
        color="primary"
        @click="emit('click', recitation.id)"
      >
        {{ t('classes.viewRecitation') }}
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { RecitationEntity } from 'src/models/entities'
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  recitation: {
    required: true,
    type: Object as PropType<RecitationEntity>,
  },
})

const emit = defineEmits<{
  (e: 'click', id: string): void
}>()

const { t } = useI18n()
</script>
