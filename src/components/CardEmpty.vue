<template>
  <article class="weather-card empty">
    <h2 class="empty-text">{{ $t("card.empty") }}</h2>
  </article>
</template>

<style lang="scss" scoped>
.empty {
  position: relative;
  background: var(--color-gray-light);
  border-color: var(--color-grayish);
  border-style: dashed;
  border-width: 2px;
  &-text {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    color: var(--color-grayish);
    font-size: 2rem;
    font-weight: bold;
    animation: shimmer 1.5s infinite;
  }
}
</style>
