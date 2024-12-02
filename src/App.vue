<template>
  <TheHeader />
  <main>
    <router-view
      :cityCoordList="cityCoordList"
      @toggleFavorite="toggleCityCoordListInLocalStorage"
    ></router-view>
  </main>
  <BasePopup
    :title="popupState.title"
    :text="popupState.text"
    :type="popupState.type"
    :isOpen="isPopupOpen"
    @remove="acceptAction"
    @redirect="redirectAction"
    @cancel="isPopupOpen = false"
  />
  <TheFooter />
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import BasePopup from "@/components/ui/BasePopup.vue";
import { useRouter } from "vue-router";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/storage";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const router = useRouter();

const cityCoordList = reactive([]);
const isPopupOpen = ref(false);
const popupState = reactive({});
const removeIndex = ref(null);

const toggleCityCoordListInLocalStorage = (cardCoord) => {
  if (cityCoordList.length === 0) {
    cityCoordList.push(cardCoord);
  } else {
    // const updatecityCoordList = cityCoordList.filter((cardCoord) => cardCoord.coord !== cardCoord.coord);
    actionOnCard(cardCoord);
  }
  saveToLocalStorage("cityCoordList", cityCoordList);
};

function actionOnCard(coord) {
  removeIndex.value = cityCoordList.findIndex((coordCity) => coordCity === coord);
  if (removeIndex.value !== -1) {
    popupState.title = t("dialog_card.remove.title");
    popupState.text = t("dialog_card.remove.text");
    popupState.type = "confirm";
    isPopupOpen.value = true;
  } else if (cityCoordList.length >= 5) {
    popupState.title = t("dialog_card.limit.title");
    popupState.text = t("dialog_card.limit.text");
    popupState.type = "alert";
    isPopupOpen.value = true;
  } else {
    cityCoordList.push(coord);
  }
}

function acceptAction() {
  cityCoordList.splice(removeIndex.value, 1);
  isPopupOpen.value = false;
  saveToLocalStorage("cityCoordList", cityCoordList);
}

function redirectAction() {
  router.push("/favorites");
  isPopupOpen.value = false;
}

onMounted(() => {
  if (getFromLocalStorage("language")) {
    locale.value = getFromLocalStorage("language");
  }
  if (
    getFromLocalStorage("cityCoordList") &&
    getFromLocalStorage("cityCoordList") !== "[]"
  ) {
    cityCoordList.push(...getFromLocalStorage("cityCoordList"));
  }
});
</script>

<style scoped></style>
