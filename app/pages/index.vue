<script setup lang="ts">
import { CodeXml, ScissorsLineDashed, SmilePlus, ChevronRight } from 'lucide-vue-next';

// NEWS（最新3件）
const { data: newsList } = await useAsyncData('top-news', () =>
  queryCollection('news').order('publishedAt', 'DESC').limit(3).all()
)

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
    image: '',
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
        :colors="{ system:'#4989c7', salon:'#c9566b', cowork:'#58b5a1' }"
        headline="システムとリアルの融合で社会に価値を届ける"
        subline="We connect the dots between technology, beauty, and community — delivering value through our three core pillars."
      >
        <template #logo>
          <img src="/images/logo-white.png" alt="HUBFACTORY" class="hero-logo">
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
            <div class="item-inner">
              <div class="item-icon">
                <CodeXml :size="24" />
              </div>
              <h3>System Development</h3>
              <p>We provide system development services and applications.</p>
            </div>
          </div>
          <div class="service-item service-item-nico">
            <a href="https://nicoplushair.com/" target="_blank" rel="noopener noreferrer" class="item-inner">
              <div class="item-icon">
                <ScissorsLineDashed :size="24" />
              </div>
              <h3>Hair Salon : hair design nico</h3>
              <p>A hideaway-like beauty salon with one-on-one service</p>
              <ChevronRight :size="24" class="anchor-arrow" />
            </a>
          </div>
          <div class="service-item">
            <div class="item-inner">
              <div class="item-icon">
                <SmilePlus :size="24" />
              </div>
              <h3>Machiya Coworking Space</h3>
              <p>A comfortable workspace in a traditional townhouse</p>
            </div>
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
          <NuxtLink
            v-for="news in newsList"
            :key="news.id"
            class="card"
            :to="news.path"
            :aria-label="`${news.title} の詳細へ`"
          >
            <img v-if="news.image" :src="news.image" :alt="news.title" class="card-img">
            <img v-else src="/images/news-default.jpg" :alt="news.title" class="card-img">
            <div class="card-body">
              <div class="card-date">{{ news.publishedAt }}</div>
              <div class="card-title">{{ news.title }}</div>
              <div class="card-desc">{{ news.description }}</div>
            </div>
          </NuxtLink>
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
            <img v-if="blog.image" :src="blog.image" :alt="blog.title" class="card-img">
            <img v-else src="/images/blog-default.jpg" :alt="blog.title" class="card-img">
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
  padding: 0 3.2rem;

  @media screen and (width <= $media-sp) {
    margin-top: 0;
    padding: 0;
  }

  .hero-logo {
    width: 280px;

    @media screen and (width <= $media-sp) {
      width: 160px;
    }
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
  color: $color-black;
  transition: transform 0.3s ease;

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
    flex: 1;
    min-width: 180px;
    transition: all 0.3s ease;
    overflow: hidden;

    > .item-inner {
      text-decoration: none;
      display: block;
      padding: 3.2rem;
      height: 100%;
      position: relative;
      background-image: none;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      transition: all 0.3s ease;
      background-color: transparent;

      @media screen and (width <= $media-sp) {
        padding: 2.0rem;
      }
    }

    .anchor-arrow {
      color: $color-gray;
      position: absolute;
      right: 0.8rem;
      top: 50%;
      transform: translateY(-50%);
    }

    .item-icon {
      color: $color-black;
    }

    h3 {
      font-size: 2.4rem;
      margin-top: 0.4rem;
      font-weight: bold;
      color: $color-black;

      @media screen and (width <= $media-sp) {
        font-size: 1.8rem;
      }
    }
    p {
      font-size: 1.6rem;
      margin-top: 0.8rem;
      color: $color-primary;
    }

    &:hover {
      &.service-item-nico {
        transform: scale(1.03);
        > .item-inner {
          background-image: url('/images/service-nico.jpg');
        }
        
        .anchor-arrow {
          color: #fff;
        }

        .item-icon {
          color: #fff;
        }

        h3 {
          color: #fff;
        }
        
        p {
          color: #fff;
        }
      }
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