<template>
  <q-page class="q-pt-md relative-position">
    <div class="page-width q-mx-auto column q-gutter-y-md">
      <div class="row items-center q-gutter-x-lg">
        <q-btn icon="arrow_back" round flat dense @click="$router.back()" />
        <div class="text-h4">Test</div>

        <div class="col row justify-end">
          <q-tabs
            active-color="primary"
            indicator-color="transparent"
            dense
            class="text-weight-medium"
            content-class="q-gutter-x-sm row"
          >
            <q-route-tab
              :to="{ name: 'classDetails' }"
              no-caps
              active-class="bg-primary text-white"
              class="rounded-borders"
              exact
              replace
            >
              <!-- TODO i18nize -->
              Overview
            </q-route-tab>

            <q-route-tab
              :to="{ name: 'classRecitations' }"
              no-caps
              active-class="bg-primary text-white"
              class="rounded-borders"
              exact
              replace
            >
              Recitations
            </q-route-tab>
          </q-tabs>
        </div>
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
