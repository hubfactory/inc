<script setup lang="ts">
import type { CardItem } from '@/types/card';

import { CodeXml, ScissorsLineDashed, SmilePlus, ChevronRight } from 'lucide-vue-next';

// meta
useSeoMeta({
  title: 'TOP',
})

// NEWS（最新3件）
const { data: newsList } = await useAsyncData('top-news', () =>
  queryCollection('news').order('publishedAt', 'DESC').limit(3).all() as Promise<CardItem[]>,
  { default: () => [] }
);

// BLOG（最新3件）
const { data: blogList } = await useAsyncData('top-blog', () =>
  queryCollection('blog').order('publishedAt', 'DESC').limit(3).all() as Promise<CardItem[]>,
  { default: () => [] }
);

console.log('ok')
</script>

<template>
  <PageWrapper>
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
              <h3>System & Application Development</h3>
              <p>We provide system and application development services</p>
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
    <SectionWrapper>
      <template #header>
        <h2>News</h2>
        <NuxtLink to="/news" class="more-btn">
          <span>more</span>
          <ChevronRight :size="24" />
        </NuxtLink>
      </template>
      <CardList :items="newsList" mode="news" />
    </SectionWrapper>

    <!-- BLOG最新3件 -->
    <SectionWrapper>
      <template #header>
        <h2>Blog</h2>
        <NuxtLink to="/blog" class="more-btn">
          <span>more</span>
          <ChevronRight :size="24" />
        </NuxtLink>
      </template>
      <CardList :items="blogList" mode="blog" />
    </SectionWrapper>

    <!-- 会社概要 -->
    <SectionWrapper>
      <template #header>
        <h2>Company Overview</h2>
      </template>
      <table class="company-table">
        <tbody>
          <tr><th>会社名</th><td>株式会社HUBFACTORY</td></tr>
          <tr><th>所在地</th><td>新潟県上越市</td></tr>
          <tr><th>設立</th><td>2014年5月</td></tr>
          <tr><th>代表</th><td>太田 昌幸</td></tr>
          <tr><th>事業内容</th><td>システム開発、美容室運営、コワーキングスペース運営</td></tr>
        </tbody>
      </table>
    </SectionWrapper>
  </PageWrapper>
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