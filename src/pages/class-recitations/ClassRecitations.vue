<template>
  <q-card>
    <q-card-section class="row justify-end">
      <q-btn color="primary" unelevated no-caps @click="startAddProcess">
        <div class="row q-gutter-x-sm items-center">
          <q-icon name="add" />
          <div>{{ t('classes.addRecitations') }}</div>
        </div>
      </q-btn>
    </q-card-section>

    <q-separator />

    <q-card-section v-if="recitations.length">
      <div v-for="recitation of recitations" :key="recitation.id">
        {{ recitation }}
      </div>
    </q-card-section>

    <q-card-section v-else class="empty-section flex flex-center">
      <!-- TODO add more features to this screen -->
      {{ t('classes.emptyRecitations') }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useRecitationsAPI } from 'src/composables/recitations-api.composable'
import { RecitationEntity } from 'src/models/entities'
import { PropType, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAddRecitations } from './add-recitations-composable'
import { useI18n } from 'vue-i18n'

defineProps({
  recitations: {
    type: Array as PropType<RecitationEntity[]>,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'update:recitations', recitations: RecitationEntity[]): void
}>()

const route = useRoute()

const { t } = useI18n()

const { getRecitationList } = useRecitationsAPI()

const { startAddRecitationFlow } = useAddRecitations(
  String(route.params.classId)
)

async function fetchRecitationsList() {
  emit(
    'update:recitations',
    await getRecitationList(String(route.params.classId))
  )
}

async function startAddProcess() {
  const added = await startAddRecitationFlow()
  if (!added) {
    return
  }

  await fetchRecitationsList()
}

onMounted(async () => {
  await fetchRecitationsList()
})
</script>

<style lang="scss">
.empty-section {
  height: 500px;
}
</style>
