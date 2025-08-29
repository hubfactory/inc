<script setup lang="ts">
import { format } from 'date-fns'

const { data: newsList } = await useAsyncData('news-list', () =>
  queryCollection('news').order('publishedAt', 'DESC').all()
)

console.log(newsList.value)

const formatDate = (dateStr: string) => {
  return format(new Date(dateStr), 'yyyy年MM月dd日')
}
</script>

<template>
  <div class="news-list-page">
    <div class="container">
      <h1 class="page-title">NEWS一覧</h1>
      <div class="news-list">
        <div v-for="news in newsList" :key="news.id" class="news-card">
          <img v-if="news.image" :src="news.image" :alt="news.title" class="news-card-img">
          <div class="news-card-body">
            <div class="news-card-date">{{ formatDate(news.publishedAt) }}</div>
            <div class="news-card-title">
              <NuxtLink :to="news.path">{{ news.title }}</NuxtLink>
            </div>
            <div class="news-card-desc">{{ news.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news-list-page {
  font-family: 'Noto Sans JP', sans-serif;
  .page-title {
    font-size: 2.4rem;
    font-weight: 700;
    color: #009966;
    margin-bottom: 2.4rem;
    text-align: center;
  }
  .news-list {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    @media (min-width: 700px) {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 2.4rem;
    }
  }
  .news-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    overflow: hidden;
    flex: 1 1 320px;
    min-width: 0;
    max-width: 360px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .news-card-img {
      width: 100%;
      height: 192px;
      object-fit: cover;
      background: #eee;
    }
    .news-card-body {
      padding: 1.6rem;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    .news-card-date {
      font-size: 1.44rem;
      color: #009966;
      font-weight: 500;
    }
    .news-card-title {
      font-size: 1.76rem;
      font-weight: 700;
      margin-bottom: 0.32rem;
      a {
        color: #222;
        text-decoration: none;
        &:hover {
          color: #009966;
        }
      }
    }
    .news-card-desc {
      font-size: 1.55rem;
      color: #555;
    }
  }
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
}
</style> 