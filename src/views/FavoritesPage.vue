<template>
  <section class="dashboard">
    <div class="card_list-container">
      <template v-if="!isLoading">
        <CardWeather
          v-for="card in updatedweatherList"
          :key="card.coord"
          :weather="card"
          :isFavorite="true"
          @toggleFavorite="removeCard"
        />
        <CardEmpty
          v-for="i in 5 - updatedweatherList.length"
          :key="i"
          style="cursor: pointer"
          @click="$router.push('/')"
        />
      </template>
      <template v-else>
        <CardSkeleton v-for="i in 5" :key="i" />
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import useWeather from "@/composables/useWeather";
import CardWeather from "@/components/CardWeather.vue";
import CardSkeleton from "@/components/CardSkeleton.vue";
import CardEmpty from "@/components/CardEmpty.vue";
import { useI18n } from "vue-i18n";

const { fetchWeatherForCities, weatherList } = useWeather();
const { locale } = useI18n();

const isLoading = ref(false);

const props = defineProps({
  cityCoordList: {
    type: Array,
    default: () => [],
  },
});

const updatedweatherList = computed(() => {
  return weatherList.value.filter((card) => props.cityCoordList.includes(card.coord));
});

watch(locale, () => {
  loadWeatherCards();
});

const emit = defineEmits(["toggleFavorite"]);

const removeCard = (cardCoord) => {
  emit("toggleFavorite", cardCoord);
};

function loadWeatherCards() {
  isLoading.value = true;
  fetchWeatherForCities(props.cityCoordList).then(() => {
    isLoading.value = false;
  });
}

onMounted(loadWeatherCards);
</script>

<style lang="scss" scoped>
.card_list-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
  gap: 10px;
}
.weather-card {
  min-width: 320px;
  width: 100%;
  max-width: 560px;
  height: 250px;
}
@media screen and (max-width: 800px) {
  .card_list-container {
    width: fit-content;
    margin: 0 auto;
  }
  .weather-card {
    width: 100%;
    max-width: 460px;
  }
}
@media screen and (max-width: 420px) {
  .card_list-container {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
  .weather-card {
    font-size: 14px;
    height: 220px;
  }
}
</style>
