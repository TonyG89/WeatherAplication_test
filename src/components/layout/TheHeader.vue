<template>
  <header class="container">
    <h1 class="title">{{ $t("main_title") }}</h1>
    <img
      class="logo_image"
      src="@/assets/images/logo.png"
      :alt="$t('logo_image')"
      :title="$t('logo_image')"
    />
    <hr />
    <HorizontalNavigation />
    <SwitchLanguage />
  </header>
</template>

<script setup>
import SwitchLanguage from "../SwitchLanguage.vue";
import HorizontalNavigation from "../HorizontalNavigation.vue";
</script>

<style lang="scss" scoped>
.container {
  background: var(--color-primary-light);
  padding: 20px;
  border-radius: 0 0 10px 10px;
  box-shadow: var(--shadow-medium);
  width: 100%;
}

.logo_container {
  background-color: var(--color-primary);
  border-radius: 50%;
  padding: 10px;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
  padding: 10px;
  position: relative;
}
.logo_image {
  height: 120px;
}
.logo_text {
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-primary);
  margin: 0;
}
</style>
