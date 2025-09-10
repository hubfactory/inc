<script setup lang="ts">
import type { CardItem } from '@/types/card';

type Props = {
  items: CardItem[]
  mode: 'news' | 'blog'
}

const props = defineProps<Props>();

const defaultImage = props.mode === 'news' ? '/images/news-default.jpg' : '/images/blog-default.jpg';
</script>

<template>
  <div class="card-list">
    <NuxtLink
      v-for="item in items"
      :key="item.id"
      class="card"
      :to="item.path"
      :aria-label="`${item.title} の詳細へ`"
    >
      <img v-if="item.image" :src="item.image" :alt="item.title" class="card-img">
      <img v-else :src="defaultImage" :alt="item.title" class="card-img">
      <div class="card-body">
        <div class="card-date">{{ formatDate(item.publishedAt) }}</div>
        <div class="card-title">{{ item.title }}</div>
        <div class="card-desc">{{ item.description }}</div>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3.2rem;
  @media screen and (width <= $media-sp) {
    flex-direction: column;
  }
}

.card {
  background: #fff;
  overflow: hidden;
  flex: 0 1 calc((100% - 6.4rem) / 3);
  min-width: 180px;
  display: flex;
  flex-direction: column;
  color: $color-black;
  transition: transform 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: scale(1.03);
  }

  .card-img {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 1rem;
    overflow: hidden;
    object-fit: cover;
    background: #eee;
  }
  
  .card-body {
    padding: 2.0rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    @media screen and (width <= $media-sp) {
      padding: 1.2rem 0;
    }
  }
  
  .card-date {
    font-size: 1.6rem;
    color: $color-gray;
  }
  
  .card-title {
    font-size: 2.0rem;
    font-weight: bold;

    @media screen and (width <= $media-sp) {
      font-size: 1.8rem;
    }
  }
  
  .card-desc {
    font-size: 1.6rem;
    color: $color-primary;
  }
}
</style>