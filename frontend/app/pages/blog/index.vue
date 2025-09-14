<script setup lang="ts">
import type { CardItem } from '@/types/card';

// meta
useSeoMeta({
  title: 'ブログ一覧',
})

// BLOG一覧
const { data: blogList } = await useAsyncData('blog-list', () =>
  queryCollection('blog').order('publishedAt', 'DESC').all() as Promise<CardItem[]>,
  { default: () => [] }
);
</script>

<template>
  <PageWrapper>
    <SectionWrapper title="BLOG一覧">
      <CardList :items="blogList" mode="blog" />
    </SectionWrapper>
  </PageWrapper>
</template>
