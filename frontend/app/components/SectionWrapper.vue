<script setup lang="ts">
type Props = {
  title?: string;
};

const props = defineProps<Props>();
</script>

<template>
  <section class="section-wrapper">
    <div class="container">
      <h1 v-if="props.title" class="page-title">
        {{ props.title }}
      </h1>
      <div v-if="$slots.header" class="section-header">
        <slot name="header" />
      </div>
      <div class="section-body">
        <slot />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.section-wrapper {
  padding: 6.4rem 3.2rem;
  position: relative;

  @media screen and (width <= $media-sp) {
    padding: 4.0rem 2.0rem;
  }

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 1px;
    background-color: $color-separator;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 4.0rem;
  text-align: center;
  color: $color-primary;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3.2rem;

  @media screen and (width <= $media-sp) {
    margin-bottom: 1.6rem;
  }

  // slotで指定
  h2 {
    font-size: 2.4rem;
    font-weight: bold;
  }

  // slotで指定
  .more-btn {
    color: $color-primary;
    font-size: 2.0rem;
    text-decoration: underline;
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    gap: 0.2rem;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
