<script setup lang="ts">
// meta
useSeoMeta({
  title: 'お問い合わせ',
})

// Google Form URL
const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdu91QpjZWM2urRJCfAnOvly6m3EUKMdUoGMX4LtcnhO0i-PA/viewform?embedded=true";
</script>

<template>
  <PageWrapper>
    <SectionWrapper title="お問い合わせ">
      <div class="contact-form">
        <iframe
          :src="googleFormUrl"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >読み込んでいます...</iframe>
      </div>
    </SectionWrapper>
  </PageWrapper>
</template>

<style lang="scss" scoped>
:deep(.section-wrapper) {
  padding: 4rem 0;
}

.contact-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 4rem;
  background-color: #fff;
  white-space: pre-line;

  @media screen and (width <= $media-sp) {
    margin: 0 auto 24px;
    padding: 0;
  }

  iframe {
    width: 100%;
    height: 1300px;
  }
}
</style>
