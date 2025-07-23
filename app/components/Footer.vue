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
  background: #f5f5f5;
  color: #333;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 1.52rem;
  border-top: 1px solid #e0e0e0;
  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.92rem 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }
  .footer-company {
    font-weight: bold;
    color: #009966;
    letter-spacing: 0.16em;
  }
  .footer-copyright {
    font-size: 1.44rem;
    color: #888;
  }
}
</style> 