<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

// NEWS詳細
const { data: news } = await useAsyncData(route.path, () => {
  return queryCollection('news').path(route.path).first()
});

// 戻るボタンの処理
const goBack = () => {
  // 前のページがある場合は戻る、ない場合はニュース一覧ページへ
  if (window.history.length > 1) {
    window.history.back();
  } else {
    navigateTo('/news');
  }
};
</script>

<template>
  <PageWrapper>
    <SectionWrapper>
      <template v-if="news">
        <div class="content-heading">
          <h1 class="content-title">{{ news.title }}</h1>
          <div class="content-date">{{ formatDate(news.publishedAt) }}</div>
        </div>
        <div class="content-body">
          <ContentRenderer :value="news" />
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
  line-height: 1.8;

  :deep(img) {
    width: 100%;
    max-width: 640px;
    margin: 2.4rem auto;
    display: block;
  }

  :deep(a) {
    text-decoration: underline;
    color: $color-link;

    &:hover {
      text-decoration: none;
    }
  }

  :deep(p) {
    margin-bottom: 1.6rem;
  }

  :deep(h2) {
    margin-top: 3.2rem;
    margin-bottom: 1.6rem;
    font-size: 2.4rem;
    font-weight: bold;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid $color-border;

    a {
      text-decoration: none;
      color: $color-black;
    }
  }

  :deep(h3) {
    margin-top: 2.0rem;
    margin-bottom: 1.2rem;
    font-size: 2.0rem;
    font-weight: bold;

    a {
      text-decoration: none;
      color: $color-black;
    }
  }

  :deep(table) {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    border-collapse: collapse;
    border-bottom: 1px solid $color-border;
    th, td {
      border-top: 1px solid $color-border;
      padding: 2.4rem;
      font-weight: normal;

      @media screen and (width <= $media-sp) {
        padding: 1.6rem;
      }
    }
    th {
      background: $color-bg-gray;
      text-align: left;
    }
    td {
      background: #fff;
    }
  }
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
