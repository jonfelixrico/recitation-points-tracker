<template>
  <q-card>
    <q-card-section class="row justify-end">
      <q-btn color="primary" unelevated no-caps>
        <div class="row q-gutter-x-sm items-center">
          <q-icon name="add" />
          <!-- TODO i18nize -->
          <div>Add Recitations</div>
        </div>
      </q-btn>
    </q-card-section>

    <q-separator />

    <q-card-section class="empty-section flex flex-center">
      <!-- TODO add more features to this screen -->
      No recitations
    </q-card-section>
  </q-card>
</template>

<style lang="scss">
.empty-section {
  height: 500px;
}
</style>
