<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App </q-toolbar-title>

        <q-btn
          color="negative"
          unelevated
          dense
          no-caps
          @click="promptLogout"
          >{{ t('mainLayout.toolbar.logOut') }}</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useAuth } from 'src/composables/auth.composable'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const { dialog, loading } = useQuasar()
const { signOut } = useAuth()
const router = useRouter()

function promptLogout() {
  dialog({
    title: t('mainLayout.dialogs.logOutPrompt.title'),
    message: t('mainLayout.dialogs.logOutPrompt.message'),
    ok: {
      unelevated: true,
      noCaps: true,
      label: t('mainLayout.dialogs.logOutPrompt.okLabel'),
    },
    cancel: {
      noCaps: true,
      flat: true,
    },
  }).onOk(async () => {
    loading.show()
    try {
      await signOut()
      await router.push({
        name: 'login',
      })

      dialog({
        title: t('mainLayout.dialogs.logOutNotice.title'),
        message: t('mainLayout.dialogs.logOutNotice.message'),
        ok: {
          unelevated: true,
          noCaps: true,
        },
      })
    } catch (e) {
      // TODO improve logging
      console.error(e)
    } finally {
      loading.hide()
    }
  })
}
</script>
