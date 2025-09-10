<script setup lang="ts">
import type { CardItem } from '@/types/card';

// meta
useSeoMeta({
  title: 'NEWS一覧',
})


// NEWS一覧
const { data: newsList } = await useAsyncData('news-list', () =>
  queryCollection('news').order('publishedAt', 'DESC').all() as Promise<CardItem[]>,
  { default: () => [] }
);
</script>

<template>
  <PageWrapper>
    <SectionWrapper title="NEWS一覧">
      <CardList :items="newsList" mode="news" />
    </SectionWrapper>
  </PageWrapper>
</template>
