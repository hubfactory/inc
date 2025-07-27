<script setup lang="ts">
import { useRoute } from 'vue-router'
import { format } from 'date-fns'

const route = useRoute()

const { data: news } = await useAsyncData(route.path, () => {
  return queryCollection('news').path(route.path).first()
})

console.log(news.value)

const formatDate = (dateStr: string) => {
  return format(new Date(dateStr), 'yyyy年MM月dd日')
}
</script>

<template>
  <div class="news-detail-page">
    <div class="container">
      <ContentRenderer v-if="news" :value="news" />
      <div v-else>
        <p>記事が見つかりませんでした。</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.news-detail-page {
  font-family: 'Noto Sans JP', sans-serif;
  .news-title {
    font-size: 2.4rem;
    font-weight: 700;
    color: #009966;
    margin-bottom: 1.6rem;
    text-align: center;
  }
  .news-date {
    font-size: 1.44rem;
    color: #009966;
    text-align: center;
    margin-bottom: 1.6rem;
  }
  .news-img {
    display: block;
    margin: 0 auto 1.6rem auto;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    background: #eee;
  }
  .news-desc {
    font-size: 1.55rem;
    color: #555;
    margin-bottom: 2.4rem;
    text-align: center;
  }
  .news-body {
    font-size: 1.6rem;
    color: #222;
    line-height: 1.9;
    max-width: 800px;
    margin: 0 auto;
  }
}
.container {
  max-width: 800px;
  margin: 0 auto;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
}
</style> 