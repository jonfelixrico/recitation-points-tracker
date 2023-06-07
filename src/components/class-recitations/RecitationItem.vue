<template>
  <q-item>
    <q-item-section>
      <div class="text-h6">{{ recitation.name }}</div>
      <div>{{ recitation.recitationDt }}</div>
    </q-item-section>
    <q-item-section side>
      <!-- TODO i18nize this -->
      <q-btn>View Recitation</q-btn>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { RecitationEntity } from 'src/models/entities'
import { PropType } from 'vue'

defineProps({
  recitation: {
    required: true,
    type: Object as PropType<RecitationEntity>,
  },
})
</script>
