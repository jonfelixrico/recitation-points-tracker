<template>
  <q-page> Test </q-page>
</template>

<script lang="ts">
import { RecitationEntity } from 'src/models/entities'
import { PropType, defineComponent } from 'vue'

export default defineComponent({
  props: {
    recitation: {
      required: true,
      type: Object as PropType<RecitationEntity>,
    },
  },

  beforeRouteEnter() {
    // TODO do something
  },
})
</script>
