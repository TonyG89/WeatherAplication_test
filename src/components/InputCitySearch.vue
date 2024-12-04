<template>
  <div class="search_block">
    <input
      v-model="query"
      class="search_input"
      autofocus
      type="text"
      :placeholder="$t('input.placeholder')"
      :title="query"
      @input="handleInput"
    />
    <button class="search_block-button" @click="selectCity" :disabled="isDisabledButton">
      {{ $t("input.button_search") }}
    </button>
    <!-- Dropdown citiesList -->
    <ul v-if="citiesList.length > 0" class="city-list">
      <li
        v-for="(cityItem, index) in citiesList"
        :key="index"
        class="city-item"
        @click="chooseCity(cityItem)"
      >
        {{ cityItem.name }} ({{ cityItem.country }})
        <span v-show="cityItem.state"> - {{ cityItem.state }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
let debounceTimeout = null;

const query = ref("");
const citiesList = ref([]);
const cityData = ref({});
const isDisabledButton = ref(true);

const emit = defineEmits(["citySelected"]);

const fetchCities = async () => {
  if (query.value.trim() === "") {
    citiesList.value = [];
    return;
  }

  try {
    const limit = 10;
    const url = "https://api.openweathermap.org/geo/1.0/direct"; // 'https://api.openweathermap.org/data/2.5/find'

    const response = await fetch(
      `${url}?q=${query.value}&limit=${limit}&appid=${apiKey}`
    );
    const data = await response.json();
    citiesList.value = data.map((city) => ({
      name: city?.local_names?.[locale.value] || city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      state: city.state,
    }));
  } catch (error) {
    console.error("Error fetching citiesList:", error);
    citiesList.value = [];
  }
};

const handleInput = () => {
  isDisabledButton.value = true;
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchCities();
  }, 300);
};

const chooseCity = (cityItem) => {
  query.value = `${cityItem.name} (${cityItem.country}) ${
    cityItem.state ? cityItem.state : ""
  }`;
  citiesList.value = [];
  cityData.value = cityItem;
  isDisabledButton.value = false;
};

const selectCity = () => {
  emit("citySelected", cityData.value);
};
</script>

<style lang="scss" scoped>
.search_input {
  padding: 0.5rem;
  max-width: 200px;
  font-size: 1rem;
  background-color: #f5f5f5;
  color: var(--color-text-);
  border: 1px solid #ccc;
  border-radius: var(--border-radius-small);
}

.search_block {
  text-align: left;
  margin-bottom: 1rem;
  &-label_city {
    display: inline-block;
    width: 100%;
    text-align: left;
  }
  &-button {
  }
}

.city {
  &-list {
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 100%;
    max-width: 200px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 1000;
    max-height: 125px;
    overflow-y: auto;
  }
  &-item {
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
}
</style>
