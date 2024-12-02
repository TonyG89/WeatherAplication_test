import { ref } from "vue";
import { getCurrentDate } from "@/utils/date";
import { useI18n } from "vue-i18n";

const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

export default function useWeather() {
	const { locale } = useI18n();
	const weather = ref(null);
	const weatherList = ref([]);

	const fetchWeatherNow = async (city) => {
		const url = "https://api.openweathermap.org/data/2.5/weather";
		const today = getCurrentDate();
		const location =
			typeof city === "string"
				? `q=${city}`
				: `lat=${city.lat}&lon=${city.lon}`;
		try {
			const weatherResponse = await fetch(
				`${url}?${location}&units=metric&date=${today}&lang=${locale.value}&appid=${apiKey}`
			);
			const weatherData = await weatherResponse.json();

			// Сохраняем данные о погоде
			weather.value = {
				coord: Object.values(weatherData.coord).join(),
				city: weatherData.name,
				country: weatherData.sys.country,
				temperature: {
					current: weatherData.main.temp,
					feelsLike: weatherData.main.feels_like,
					min: weatherData.main.temp_min,
					max: weatherData.main.temp_max,
				},
				weather: {
					main: weatherData.weather[0].main,
					description: weatherData.weather[0].description,
					icon: weatherData.weather[0].icon,
				},
				details: {
					pressure: weatherData.main.pressure,
					humidity: weatherData.main.humidity,
					visibility: weatherData.visibility,
					clouds: weatherData.clouds.all,
				},
				wind: {
					speed: weatherData.wind.speed,
					gust: weatherData.wind.gust,
				},
				sunrise: weatherData.sys.sunrise,
				sunset: weatherData.sys.sunset,
			};
		} catch (error) {
			console.error("Error fetching weather data:", error);
		}
		return weather.value;
	};

	const fetchWeatherForCities = async (coords) => {
		const cityCoords = coords.map((coord) => {
			const coordinate = coord.split(",");
			return {
				lon: coordinate[0],
				lat: coordinate[1],
			};
		});
		weatherList.value = await Promise.all(
			cityCoords.map((coord) => fetchWeatherNow(coord))
		);
	};

	return { fetchWeatherNow, weather, fetchWeatherForCities, weatherList };
}
