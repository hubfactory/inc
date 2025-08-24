<script setup lang="ts">
// ヘッダー・フッターコンポーネントのimport文を削除（auto import対応）

// consts
import {
  PAGE_SEGMENT,
  SHOW_LANGUAGE_SWITCH_PAGE,
} from '@/constants/common';
</script>

<template>
  <div class="layout">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
  }
}
</style> 