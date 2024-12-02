import { ref } from "vue";
import { now, getTodayStartEndTime } from "@/utils/date";
import { useI18n } from "vue-i18n";

// Example Chart.js initialization
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_FORECAST_API_KEY;

export default function useForecast() {
	const { locale } = useI18n();
	const weatherForecast = ref({});

	const fetchPastWeatherToday = async (city) => {
		const { start } = getTodayStartEndTime();
		// const timeZone = now.getTimezoneOffset() * 60;
		const url = "https://api.openweathermap.org/data/2.5/onecall/timemachine";
		const location = `lat=${city.lat}&lon=${city.lon}`;
		const exclude = "minutely,daily,alerts";
		const dtToday = Math.floor(now.getTime() / 1000);
		let fetchData = [];
		try {
			const forecastResponse = await fetch(
				`${url}?${location}&units=metric&dt=${start}&lang=${locale.value}&exclude=${exclude}&appid=${apiKey}`
			);
			const forecastData = await forecastResponse.json();

			fetchData.push(...forecastData.hourly.filter((item) => item.dt >= start));
		} catch (error) {
			console.error("Error fetching forecast data:", error);
		}

		try {
			const forecastResponse = await fetch(
				`${url}?${location}&units=metric&dt=${dtToday}&lang=${locale.value}&exclude=${exclude}&appid=${apiKey}`
			);
			const forecastData = await forecastResponse.json();

			fetchData.push(...forecastData.hourly.filter((item) => item.dt > start));
		} catch (error) {
			console.error("Error fetching forecast data:", error);
		}
		return fetchData;
	};

	const fetchFeatureWeatherToday = async (city) => {
		const url = "https://api.openweathermap.org/data/2.5/onecall";
		const location = `lat=${city.lat}&lon=${city.lon}`;
		const exclude = "minutely,daily,alerts";
		try {
			const forecastResponse = await fetch(
				`${url}?${location}&units=metric&lang=${locale.value}&exclude=${exclude}&appid=${apiKey}`
			);
			const { end } = getTodayStartEndTime();
			const forecastData = await forecastResponse.json();

			forecastData.hourly.shift();
			return forecastData.hourly.filter((item) => item.dt < end);
		} catch (error) {
			console.error("Error fetching forecast data:", error);
		}
	};

	const fetchWeatherForecast = async (city) => {
		const [pastData, featureData] = await Promise.all([
			fetchPastWeatherToday(city),
			fetchFeatureWeatherToday(city),
		]);
		weatherForecast.value = [...pastData, ...featureData];

		return weatherForecast.value;
	};

	return { fetchWeatherForecast, weatherForecast };
}
