<template>
  <InputCitySearch @citySelected="loadWeather" />
  <hr />
  <section class="dashboard">
    <CardWeather
      v-if="weather"
      :weather="weather"
      :isFavorite="hasFavoriteCard"
      @toggleFavorite="$emit('toggleFavorite', $event)"
    />
    <CardSkeleton v-else style="width: 100%" />
    <article class="chart-container">
      <ChartTemperature v-if="weather" :weatherData="weatherForecast" />
      <ChartSkeleton v-else />
    </article>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import InputCitySearch from "@/components/InputCitySearch.vue";
import CardWeather from "@/components/CardWeather.vue";
import CardSkeleton from "@/components/CardSkeleton.vue";
import ChartTemperature from "@/components/ChartTemperature.vue";
import { useI18n } from "vue-i18n";
import useForecast from "@/composables/useForecast";
import useWeather from "@/composables/useWeather";
import useLocation from "@/composables/useLocation";
// Example Chart.js initialization

const { weather, fetchWeatherNow } = useWeather();
const { weatherForecast, fetchWeatherForecast } = useForecast();
const { fetchUserLocation, locationData } = useLocation();
const { locale } = useI18n();

const weatherPayload = ref(null);

const hasFavoriteCard = computed(() =>
  props.cityCoordList.some((coord) => coord === weather.value?.coord)
);

const props = defineProps({
  cityCoordList: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["toggleFavorite"]);

watch(locale, () => {
  if (weatherPayload.value) {
    fetchWeatherNow(weatherPayload.value);
  } else {
    fetchWeatherNow(locationData.value.city);
  }
});

const loadWeather = async (action) => {
  weatherPayload.value = action;
  await fetchWeatherNow(action);
  await fetchWeatherForecast(action);
};

onMounted(() => {
  fetchUserLocation().then(() => {
    if (locationData.value) {
      fetchWeatherNow(locationData.value.city);
      fetchWeatherForecast({ lat: locationData.value.lat, lon: locationData.value.lon });
    }
  });
});
</script>
<style lang="scss" scoped>
.weather-card {
  max-width: 370px;
  height: fit-content;
}
.dashboard {
  // height: 550px;
  display: flex;
  gap: 1rem;
}
.chart-container {
  position: relative;
  width: 100%;
  height: 400px;
}

@media screen and (max-width: 870px) {
  .dashboard {
    flex-direction: column;
  }
  .weather-card {
    width: 100%;
    max-width: 460px;
  }
}

@media screen and (max-width: 420px) {
  .dashboard {
    flex-direction: column;
  }
  .weather-card {
    font-size: 14px;
  }
  .weather-container {
    gap: 5px;
  }
}
.skeleton_card {
  width: 400px !important;
}

footer {
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background-color: #4caf50;
  color: white;
}
</style>
