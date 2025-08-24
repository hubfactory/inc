<script setup lang="ts">
import { CodeXml, ScissorsLineDashed, SmilePlus, ChevronRight } from 'lucide-vue-next';

// NEWS・BLOGのダミーデータ
const newsList = [
  {
    title: '新サービスリリースのお知らせ',
    description: '株式会社HUBFACTORYは新しいサービスを開始しました。',
    image: '/news1.jpg',
    publishedAt: '2024-06-01'
  },
  {
    title: '夏季休業のお知らせ',
    description: '夏季休業期間についてご案内いたします。',
    image: '/news2.jpg',
    publishedAt: '2024-05-20'
  },
  {
    title: 'オフィス移転のお知らせ',
    description: '本社オフィスを移転いたしました。',
    image: '/news3.jpg',
    publishedAt: '2024-05-01'
  }
]

const blogList = [
  {
    title: 'Nuxt4で作る最新コーポレートサイト',
    description: 'Nuxt4と@nuxt/contentを活用したサイト制作のポイントを解説。',
    image: '/blog1.jpg',
    publishedAt: '2024-06-02'
  },
  {
    title: 'エンジニアのための時短術',
    description: '日々の業務を効率化するためのテクニックを紹介。',
    image: '/blog2.jpg',
    publishedAt: '2024-05-25'
  },
  {
    title: 'Vue3 Composition API入門',
    description: 'Vue3の新しいAPIの使い方をわかりやすく解説。',
    image: '/blog3.jpg',
    publishedAt: '2024-05-10'
  }
]
</script>

<template>
  <div class="top">
    <!-- ヒーローイメージ -->
    <section class="hero">
      <HeroSynergy
        :colors="{ system:'#1e90ff', salon:'#ff4d6d', cowork:'#00c49a' }"
        headline="システムとリアルの融合で<br>社会に価値を届ける"
        subline="Web System & Salon & Coworking"
      >
        <template #logo>
          <img src="/images/logo-white.png" alt="HUBFACTORY" class="logo" width="300px">
        </template>
      </HeroSynergy>
    </section>

    <!-- SERVICE紹介 -->
    <section class="section-wrapper">
      <div class="container">
        <div class="section-header">
          <h2>Our Services</h2>
        </div>
        <div class="service-list">
          <div class="service-item">
            <div class="item-icon">
              <CodeXml :size="24" />
            </div>
            <h3>System Development</h3>
            <p>We provide system development services and applications.</p>
          </div>
          <div class="service-item">
            <div class="item-icon">
              <ScissorsLineDashed :size="24" />
            </div>
            <h3>Hair Design Salon</h3>
            <p>A hideaway-like beauty salon with one-on-one service</p>
          </div>
          <div class="service-item">
            <div class="item-icon">
              <SmilePlus :size="24" />
            </div>
            <h3>Coworking Space</h3>
            <p>A comfortable workspace for your business</p>
          </div>
        </div>
      </div>
    </section>

    <!-- NEWS最新3件 -->
    <section class="section-wrapper">
      <div class="container">
        <div class="section-header">
          <h2>News</h2>
          <NuxtLink to="/news" class="more-btn">
            <span>more</span>
            <ChevronRight :size="24" />
          </NuxtLink>
        </div>
        <div class="card-list">
          <div v-for="news in newsList" :key="news.title" class="card">
            <img :src="news.image" :alt="news.title" class="card-img">
            <div class="card-body">
              <div class="card-date">{{ news.publishedAt }}</div>
              <div class="card-title">{{ news.title }}</div>
              <div class="card-desc">{{ news.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BLOG最新3件 -->
    <section class="section-wrapper">
      <div class="container">
        <div class="section-header">
          <h2>Blog</h2>
          <NuxtLink to="/eng" class="more-btn">
            <span>more</span>
            <ChevronRight :size="24" />
          </NuxtLink>
        </div>
        <div class="card-list">
          <div v-for="blog in blogList" :key="blog.title" class="card">
            <img :src="blog.image" :alt="blog.title" class="card-img">
            <div class="card-body">
              <div class="card-date">{{ blog.publishedAt }}</div>
              <div class="card-title">{{ blog.title }}</div>
              <div class="card-desc">{{ blog.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 会社概要 -->
    <section class="section-wrapper">
      <div class="container">
        <div class="section-header">
          <h2>Company Overview</h2>
        </div>
        <table class="company-table">
          <tbody>
            <tr><th>会社名</th><td>株式会社HUBFACTORY</td></tr>
            <tr><th>所在地</th><td>新潟県上越市</td></tr>
            <tr><th>設立</th><td>2014年5月</td></tr>
            <tr><th>代表</th><td>太田 昌幸</td></tr>
            <tr><th>事業内容</th><td>システム開発、美容室運営、コワーキングスペース運営</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  margin-top: 32px;
  width: 100%;

  @media screen and (width <= $media-sp) {
    margin-top: 0;
  }
}

.section-wrapper {
  padding: 6.4rem 3.2rem;
  position: relative;

  @media screen and (width <= $media-sp) {
    padding: 4.0rem 2.0rem;
  }

  &::after {
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

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3.2rem;

  @media screen and (width <= $media-sp) {
    margin-bottom: 1.6rem;
  }

  h2 {
    font-size: 2.4rem;
    font-weight: bold;
  }
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

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.card-list {
  display: flex;
  gap: 3.2rem;
  @media screen and (width <= $media-sp) {
    flex-direction: column;
  }
}

.card {
  background: #fff;
  overflow: hidden;
  flex: 1;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  .card-img {
    width: 100%;
    height: 192px;
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

.service-list {
  display: flex;
  gap: 3.2rem;
  @media screen and (width <= $media-sp) {
    flex-direction: column;
    gap: 2.0rem;
  }
  .service-item {
    background: #fff;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    padding: 3.2rem;
    flex: 1;
    min-width: 180px;

    @media screen and (width <= $media-sp) {
      padding: 1.6rem;
    }

    h3 {
      font-size: 2.4rem;
      margin-top: 0.4rem;
      font-weight: bold;

      @media screen and (width <= $media-sp) {
        font-size: 1.8rem;
      }
    }
    p {
      font-size: 1.6rem;
      margin-top: 0.8rem;
      color: $color-primary;
    }
  }
}

.company-table {
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
    width: 200px;
    @media screen and (width <= $media-sp) {
      width: 120px;
    }
  }
  td {
    background: #fff;
  }
}
</style>