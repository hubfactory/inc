<script setup lang="ts">
// 共通metaタグ
useSeoMeta({
  titleTemplate: (title) => title ? `${title} | 株式会社HUBFACTORY` : '株式会社HUBFACTORY',
  description: '株式会社HUBFACTORYはシステム開発・美容室運営・コワーキングスペース運営の3つを軸にシステムとリアルの融合で社会に価値を届けます',
  ogTitle: '株式会社HUBFACTORY',
  ogDescription: '株式会社HUBFACTORYはシステム開発・美容室運営・コワーキングスペース運営の3つを軸にシステムとリアルの融合で社会に価値を届けます',
  ogImage: 'https://hubfactory.jp/og-image.jpg',
  twitterCard: 'summary_large_image'
})
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