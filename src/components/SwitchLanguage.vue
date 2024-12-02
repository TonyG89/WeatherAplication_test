<template>
  <div class="language_container">
    <BaseSwitcher
      :title="$t('language_title')"
      :switchValue="locale"
      :labels="['uk', 'en']"
      @changeValue="changeLanguage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import BaseSwitcher from "@/components/ui/BaseSwitcher.vue";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage,
  removeAllFromLocalStorage,
} from "@/utils/storage";

const { locale } = useI18n();
const selectedLanguage = ref(locale.value);

const changeLanguage = (lang) => {
  locale.value = lang;
  saveToLocalStorage("language", lang);
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.language_container {
  position: absolute;
  border: 1px solid var(--color-primary);
  border-radius: var(--border-radius-standart);
  padding: 5px;
  bottom: 16px;
  right: 19px;
}

@media screen and (max-width: 600px) {
  .language_container {
    border: none;
    bottom: 22px;
  }
}
@media screen and (max-width: 420px) {
  .language_container {
    bottom: 17px;
  }
}
</style>
