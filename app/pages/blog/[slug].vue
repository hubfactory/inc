<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

// BLOG詳細
const { data: blog } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
});

console.log(blog.value);

// 戻るボタンの処理
const goBack = () => {
  // 前のページがある場合は戻る、ない場合はニュース一覧ページへ
  if (window.history.length > 1) {
    window.history.back();
  } else {
    navigateTo('/blog');
  }
};
</script>

<template>
  <PageWrapper>
    <SectionWrapper>
      <template v-if="blog">
        <div class="content-heading">
          <h1 class="content-title">{{ blog.title }}</h1>
          <div class="content-date">{{ formatDate(blog.publishedAt) }}</div>
        </div>
        <div class="content-body">
          <ContentRenderer :value="blog" />
        </div>
      </template>
      <template v-else>
        <p>記事が見つかりませんでした。</p>
      </template>

      <div class="content-footer">
        <UButton
          color="neutral"
          variant="subtle"
          size="lg"
          icon="i-heroicons-arrow-left"
          class="back-button"
          @click="goBack"
        >
          前のページに戻る
        </UButton>
      </div>
    </SectionWrapper>
  </PageWrapper>
</template>

<style lang="scss" scoped>
.content-title {
  font-size: 2.8rem;
  font-weight: bold;

  @media screen and (width <= $media-sp) {
    font-size: 2.0rem;
  }
}

.content-date {
  font-size: 1.6rem;
  color: $color-gray;
}

.content-body {
  font-size: 1.6rem;
  margin-top: 4.0rem;
}

.content-footer {
  margin-top: 6.0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
}

:deep(.back-button) {
  padding: 1.2rem;
}
</style>
