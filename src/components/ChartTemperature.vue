<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from "vue";
import Chart from "chart.js/auto";
import { formatHour } from "@/utils/date";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  weatherData: {
    type: Object,
    required: true,
  },
});

const chartInstance = ref(null);
const chartCanvas = ref(null);

const getChartData = (data) => {
  return {
    labels: data?.map((item) => formatHour(item.dt)),
    datasets: [
      {
        label: `${t("chart.temp")} (°C)`,
        data: data.map((item) => item.temp),
        backgroundColor: "#fef1c5",
        borderColor: "#fdc401",
        fill: false,
        tension: 0.4,
      },
    ],
  };
};

// Инициализация графика
const createChart = () => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  chartInstance.value = new Chart(chartCanvas.value, {
    type: "line",
    data: getChartData(props.weatherData),
    options: {
      responsive: true,
      // maintainAspectRatio: true,
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      scales: {
        x: {
          title: {
            display: true,
            text: t("chart.time"),
          },
        },
        y: {
          title: {
            display: true,
            text: `${t("chart.temp")} (°C)`,
          },
        },
      },
    },
  });
};

watch(
  () => props.weatherData,
  () => {
    createChart();
  }
);

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }
});
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  flex: 1;
}
</style>
