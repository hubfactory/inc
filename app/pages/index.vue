<script setup lang="ts">
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
      <div class="hero-content">
        <h1>HUBFACTORY</h1>
        <p>システム開発・美容室・コワーキングスペースで<br>人と社会をつなぐ</p>
      </div>
    </section>

    <!-- BUSINESS紹介 -->
    <section class="business">
      <div class="container">
        <h2>BUSINESS</h2>
        <div class="business-list">
          <div class="business-item">
            <h3>システム開発</h3>
            <p>Webシステム・アプリ開発、ITコンサルティング</p>
          </div>
          <div class="business-item">
            <h3>美容室</h3>
            <p>都内を中心に複数店舗を展開</p>
          </div>
          <div class="business-item">
            <h3>コワーキングスペース</h3>
            <p>快適なワークスペースを提供</p>
          </div>
        </div>
      </div>
    </section>

    <!-- NEWS最新3件 -->
    <section class="news">
      <div class="container">
        <div class="section-header">
          <h2>NEWS</h2>
          <NuxtLink to="/news" class="more-btn">more</NuxtLink>
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
    <section class="blog">
      <div class="container">
        <div class="section-header">
          <h2>エンジニアブログ</h2>
          <NuxtLink to="/eng" class="more-btn">more</NuxtLink>
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
    <section class="company">
      <div class="container">
        <h2>会社概要</h2>
        <table class="company-table">
          <tbody>
            <tr><th>会社名</th><td>株式会社HUBFACTORY</td></tr>
            <tr><th>所在地</th><td>東京都渋谷区○○○○</td></tr>
            <tr><th>設立</th><td>2015年4月</td></tr>
            <tr><th>代表</th><td>山田 太郎</td></tr>
            <tr><th>事業内容</th><td>システム開発、美容室運営、コワーキングスペース運営</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.top {
  font-family: 'Noto Sans JP', sans-serif;
  color: #222;
  background: #fff;
}
.hero {
  background: linear-gradient(120deg, #009966 60%, #fff 100%);
  color: #fff;
  text-align: center;
  padding: 4.8rem 1.6rem 3.2rem 1.6rem;
  .hero-content {
    max-width: 600px;
    margin: 0 auto;
    h1 {
      font-size: 4rem;
      font-weight: 700;
      margin-bottom: 1.6rem;
      letter-spacing: 0.16em;
    }
    p {
      font-size: 1.76rem;
      line-height: 2.72;
    }
  }
}
.business {
  padding: 4rem 1.6rem 2.4rem 1.6rem;
  background: #f8f8f8;
  h2 {
    color: #009966;
    font-size: 2.08rem;
    margin-bottom: 1.92rem;
    font-weight: 700;
  }
  .business-list {
    display: flex;
    flex-direction: column;
    gap: 1.92rem;
    @media (min-width: 700px) {
      flex-direction: row;
      justify-content: center;
    }
  }
  .business-item {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    padding: 1.92rem;
    flex: 1;
    min-width: 180px;
    text-align: center;
    h3 {
      color: #009966;
      font-size: 1.76rem;
      margin-bottom: 0.8rem;
      font-weight: 700;
    }
    p {
      font-size: 1.57rem;
      color: #555;
    }
  }
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.12rem;
  h2 {
    color: #009966;
    font-size: 1.92rem;
    font-weight: 700;
  }
  .more-btn {
    color: #009966;
    font-size: 1.57rem;
    text-decoration: underline;
    font-weight: 500;
    &:hover {
      opacity: 0.7;
    }
  }
}
.card-list {
  display: flex;
  flex-direction: column;
  gap: 1.92rem;
  @media (min-width: 700px) {
    flex-direction: row;
  }
}
.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  overflow: hidden;
  flex: 1;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  .card-img {
    width: 100%;
    height: 192px;
    object-fit: cover;
    background: #eee;
  }
  .card-body {
    padding: 1.28rem 1.6rem 1.6rem 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.48rem;
  }
  .card-date {
    font-size: 1.47rem;
    color: #009966;
    font-weight: 500;
  }
  .card-title {
    font-size: 1.68rem;
    font-weight: 700;
    margin-bottom: 0.32rem;
  }
  .card-desc {
    font-size: 1.55rem;
    color: #555;
  }
}
.company {
  padding: 4rem 1.6rem 3.2rem 1.6rem;
  h2 {
    color: #009966;
    font-size: 1.92rem;
    font-weight: 700;
    margin-bottom: 1.92rem;
  }
  .company-table {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    border-collapse: collapse;
    th, td {
      border: 1px solid #e0e0e0;
      padding: 1.12rem 1.28rem;
      font-size: 1.57rem;
    }
    th {
      background: #f5f5f5;
      color: #009966;
      font-weight: 700;
      text-align: left;
      width: 192px;
    }
    td {
      background: #fff;
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