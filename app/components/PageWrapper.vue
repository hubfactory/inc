<template>
  <div class="page-wrapper">
    <slot />
  </div>
</template>

<style lang="scss">
.page-wrapper {
  padding: 0;
  @media screen and (width <= $media-sp) {
    padding: 6.0rem 0;
  }
}
</style>
