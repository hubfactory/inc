<script setup lang="ts">
// ナビゲーションリンク一覧
const navLinks = [
  { name: 'TOP', path: '/' },
  { name: 'NEWS', path: '/news' },
  { name: 'BLOG', path: '/eng' },
  { name: 'CONTACT', path: '/contact' }
]
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <div class="header-logo">
        <NuxtLink to="/">HUBFACTORY</NuxtLink>
      </div>
      <nav class="header-nav">
        <ul>
          <li v-for="link in navLinks" :key="link.path">
            <NuxtLink :to="link.path">{{ link.name }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  font-family: 'Noto Sans JP', sans-serif;
  .header-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 1.6rem;
  }
  .header-logo {
    font-weight: bold;
    font-size: 2.4rem;
    color: #009966;
    letter-spacing: 0.16em;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
  .header-nav ul {
    display: flex;
    gap: 2.4rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .header-nav a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    &:hover {
      color: #009966;
    }
  }
}
</style> 