<template>
  <nav>
    <ul>
      <li>
        <router-link to="/">{{ $t("page.home") }}</router-link>
      </li>
      <li>
        <router-link to="/favorites">{{ $t("page.favorites") }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// No additional logic needed for simple navigation
</script>

<style lang="scss" scoped>
.router-link-active {
  font-weight: bold;
  color: var(--color-primary-dark);
}
</style>
