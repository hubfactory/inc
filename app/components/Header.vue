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
        <NuxtLink to="/">
          HUBFACTORY
        </NuxtLink>
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
  padding: 1.6rem 3.2rem;
  border-bottom: 1px solid $color-border;
  .header-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-logo {
    font-weight: bold;
    font-size: 2.4rem;
    color: $color-primary;
    letter-spacing: 0.1em;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
  .header-nav ul {
    display: flex;
    gap: 2.4rem;
  }
  .header-nav a {
    transition: color 0.2s;
    color: $color-gray;
    font-weight: bold;
    &:hover {
      color: $color-primary;
    }
  }
}
</style> 