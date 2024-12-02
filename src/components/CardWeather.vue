<template>
  <article class="weather-card">
    <h2 class="card-title text-ellipsis" :title="`${weather.city}(${weather.country})`">
      {{ weather.city }}, {{ weather.country }}
    </h2>
    <div class="weather-container">
      <section class="card-icon_container">
        <img
          class="icon"
          :src="`http://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`"
          :alt="weather.weather.description"
          :title="weather.weather.description"
        />
        <p class="description">{{ weather.weather.description }}</p>
      </section>
      <section class="card-temperature_container">
        <p class="temperature">
          {{ $t("weather_card.temperature") }}: {{ weather.temperature.current }}°C<span
            class="feels"
            >({{ weather.temperature.feelsLike }}°C)</span
          >
        </p>
        <section class="min_max_temp">
          <p>{{ $t("weather_card.min") }}: {{ weather.temperature.min }}°C</p>
          <p>{{ $t("weather_card.max") }}: {{ weather.temperature.max }}°C</p>
        </section>
      </section>
      <section class="daylight">
        <p>{{ $t("weather_card.sunrise") }}: {{ formatTime(weather.sunrise) }}</p>
        <p>{{ $t("weather_card.sunset") }}: {{ formatTime(weather.sunset) }}</p>
      </section>
      <section class="atmosphere">
        <p>
          {{ $t("weather_card.pressure") }}: {{ weather.details.pressure }}
          {{ $t("weather_card.pressure_unit") }}
        </p>
        <p>{{ $t("weather_card.humidity") }}: {{ weather.details.humidity }}%</p>
      </section>
      <section class="wind_cloud">
        <p>
          {{ $t("weather_card.wind") }}: {{ weather.wind.speed }}
          {{ $t("weather_card.wind_unit") }}
        </p>
        <p>{{ $t("weather_card.cloudiness") }}: {{ weather.details.clouds }}%</p>
      </section>
    </div>
    <button
      class="btn"
      :class="`btn-${isFavorite ? 'unfavorite' : 'favorite'}`"
      @click="$emit('toggleFavorite', weather.coord)"
    >
      {{ isFavorite ? "-" : "+" }}
    </button>
  </article>
</template>

<script setup>
import { defineProps } from "vue";
import { formatTime } from "@/utils/date";

defineProps({
  weather: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["toggleFavorite"]);
</script>

<style lang="scss" scoped>
.card {
  &-temperature_container {
    display: flex;
    justify-content: space-evenly;
    gap: 10px;
    // margin-top: auto;
    flex-direction: column;
  }
}
.description {
  margin-top: -24px;
}
.feels {
  font-weight: 300;
  font-size: 14px;
  color: var(--color-gray);
}
.daylight {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.min_max_temp {
  display: flex;
  justify-content: space-between;
}

.btn {
  position: absolute;
  color: white;
  font-size: 2rem;
  border: 1px solid transparent;
  top: 0;
  right: 0;
  padding: 0px 10px 5px 15px;
  font-weight: 900;
  width: 46px;
  border-bottom-left-radius: 80px;
  border-top-right-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.8;
  &-favorite {
    background-color: var(--color-success);
  }
  &-unfavorite {
    background-color: var(--color-danger);
  }
  &:hover {
    opacity: 1;
    transition: all 0.3s ease;
  }
}

@media screen and (max-width: 420px) {
  .card {
    &-temperature_container {
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 1040px) {
  .weather-card {
    max-width: 300px;
  }
}
</style>
