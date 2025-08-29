<script setup lang="ts">
// date-fnsからformat関数をインポート
import { format } from 'date-fns'

// フッターに表示する現在の年を取得する関数
const getCurrentYear = () => {
  // date-fnsで現在の年を返す
  return format(new Date(), 'yyyy')
}
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-company">株式会社HUBFACTORY</div>
      <div class="footer-copyright">&copy; {{ getCurrentYear() }} HUBFACTORY All Rights Reserved.</div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  width: 100%;
  background: $color-bg-gray;
  color: $color-gray;
  border-top: 1px solid $color-border;
  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2.4rem 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }
  .footer-company {
    font-weight: bold;
    color: $color-primary;
    letter-spacing: 0.2em;
  }
  .footer-copyright {
    font-size: 1.4rem;
  }
}
</style> 