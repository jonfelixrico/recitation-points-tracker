<template>
  <q-page class="q-pt-md row justify-center">
    <div class="page-width q-gutter-y-md column">
      <div class="row items-center q-gutter-x-lg">
        <q-btn icon="arrow_back" round flat dense @click="$router.back()" />

        <div v-if="recitationData?.name" class="text-h4">
          {{ recitationData.name }}
        </div>
        <q-skeleton v-else class="col-3 self-stretch" />
      </div>

      <q-card class="col column">
        <GradingInterface
          v-if="classData && recitationData"
          :students="classData.students"
          :seating-arrangement="classData.seatingArrangement"
          :recited-students="recitationData.recitedStudents"
          class="col"
        />
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useClassData } from 'src/composables/class-data-composable'
import { useRecitationData } from 'src/composables/recitation-data-composable'
import { useRecitationsAPI } from 'src/composables/recitations-api.composable'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import GradingInterface from 'components/grading/GradingInterface.vue'

export default defineComponent({
  components: { GradingInterface },

  async beforeRouteEnter(to) {
    const { getRecitation } = useRecitationsAPI()
    try {
      return !!(await getRecitation(
        String(to.params.classId),
        String(to.params.recitationId)
      ))
    } catch (e) {
      console.error(e)
      // TODO show dialog
      return false
    }
  },

  setup() {
    const route = useRoute()
    const classId = computed(() => String(route.params.classId))
    const recitationId = computed(() => String(route.params.recitationId))

    const { data: classData } = useClassData(classId)
    const { data: recitationData } = useRecitationData(classId, recitationId)

    return {
      classData,
      recitationData,
    }
  },
})
</script>
