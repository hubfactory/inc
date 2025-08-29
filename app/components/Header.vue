<script setup lang="ts">
// ナビゲーションリンク一覧
const navLinks = [
  { name: 'TOP', path: '/' },
  { name: 'NEWS', path: '/news' },
  { name: 'BLOG', path: '/eng' },
  { name: 'CONTACT', path: '/contact' }
];

// SP表示判定
const isSpView = useSpView();

// ハンバーガーメニューの開閉状態
const isMenuOpen = ref(false);

// メニューを閉じる
const closeMenu = () => {
  isMenuOpen.value = false
}

// SP表示でない時にメニューを閉じる
watch(isSpView, (newValue) => {
  if (!newValue) {
    isMenuOpen.value = false
  }
})
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <div class="header-logo">
        <NuxtLink to="/">
          HUBFACTORY
        </NuxtLink>
      </div>
      
      <!-- PCナビゲーション -->
      <nav v-if="!isSpView" class="header-nav pc-nav">
        <ul>
          <li v-for="link in navLinks" :key="link.path">
            <NuxtLink :to="link.path">{{ link.name }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- SPハンバーガーメニューボタン -->
      <button 
        v-if="isSpView"
        class="hamburger-btn" 
        aria-label="メニューを開く"
        @click="isMenuOpen = !isMenuOpen"
      >
        <UIcon 
          name="i-heroicons-bars-3"
          size="24px"
          class="hamburger-icon"
        />
      </button>
    </div>

    <!-- オーバーレイ -->
    <Transition name="fade">
      <div 
        v-if="isSpView && isMenuOpen" 
        class="overlay" 
        @click="closeMenu"
      />
    </Transition>

    <!-- SPナビゲーションメニュー -->
    <Transition name="slide-down">
      <nav v-if="isSpView && isMenuOpen" class="sp-nav-menu">
        <ul>
          <li v-for="link in navLinks" :key="link.path">
            <NuxtLink 
              :to="link.path" 
              class="sp-nav-link"
              @click="closeMenu"
            >
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
        <button 
          class="close-btn"
          aria-label="メニューを閉じる"
          @click="closeMenu"
        >
          <UIcon 
            name="i-heroicons-x-mark"
            size="24px"
            class="close-icon"
          />
        </button>
      </nav>
    </Transition>
  </header>
</template>

<style lang="scss">
.header {
  width: 100%;
  background: #fff;
  padding: 1.6rem 3.2rem;
  border-bottom: 1px solid $color-border;
  position: relative;

  @media screen and (width <= $media-sp) {
    padding: 0.8rem 2.4rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    height: 6.0rem;
  }

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

    @media screen and (width <= $media-sp) {
      font-size: 1.8rem;
    }
  }

  // PCナビゲーション
  .pc-nav {
    ul {
      display: flex;
      gap: 2.4rem;
    }
    
    a {
      transition: color 0.2s;
      color: $color-gray;
      font-weight: bold;
      &:hover {
        color: $color-primary;
      }
    }
  }

  // SPハンバーガーボタン
  .hamburger-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.8rem;
    
    .hamburger-icon {
      color: $color-primary;
    }
  }

  // SPナビゲーションメニュー
  .sp-nav-menu {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid $color-border;
    z-index: 1000;

    .close-btn {
      position: absolute;
      top: 0.4rem;
      right: 0.4rem;
      padding: 0.8rem;
    }

    ul {
      padding: 2rem 3.2rem;
      margin: 0;
      list-style: none;
    }
    
    li {
      border-bottom: 1px solid #f0f0f0;
      
      &:last-child {
        border-bottom: none;
      }
    }
    
    .sp-nav-link {
      display: block;
      padding: 1.6rem 0;
      color: $color-gray;
      font-weight: bold;
      text-decoration: none;
      transition: color 0.2s;
      
      &:hover {
        color: $color-primary;
      }
    }
  }

  // オーバーレイ
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}

// トランジション
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 