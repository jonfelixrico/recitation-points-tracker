<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App </q-toolbar-title>

        <q-btn color="negative" unelevated dense no-caps>{{
          t('mainLayout.toolbar.logOut')
        }}</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
