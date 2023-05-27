<template>
  <div class="container relative-position">
    <div class="no-pointer-events absoltue fit hover-overlay" />
    <q-slot />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: max-content;
  height: max-content;

  .hover-overlay {
    transition: background-color $generic-hover-transition;
    background-color: transparent;
  }

  &:hover .hover-overlay {
    background-color: $table-hover-background;
  }
}
</style>
