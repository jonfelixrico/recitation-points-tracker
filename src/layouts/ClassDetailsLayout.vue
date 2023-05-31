<template>
  <q-page class="q-pt-md relative-position">
    <div class="page-width q-mx-auto column q-gutter-y-md">
      <div class="row items-center q-gutter-x-lg">
        <q-btn icon="arrow_back" round flat dense @click="$router.back()" />
        <div class="text-h4">Test</div>
      </div>
      <router-view />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  beforeRouteEnter() {
    console.log('hi')
  },
})
</script>
