import { createI18n } from "vue-i18n";

const i18n = createI18n({
	locale: "uk",
	fallbackLocale: "en",
	messages: {
		en: {
			main_title: "Weather Application",
			language_title: "Сhange language",
			logo_image: "Weather Icon",
			page: {
				home: "Home",
				favorites: "Favorites",
			},
			weather_card: {
				temperature: "Temperature",
				min: "Min",
				max: "Max",
				pressure: "Pressure",
				pressure_unit: "hPa",
				humidity: "Humidity",
				wind: "Wind",
				wind_unit: "m/s",
				cloudiness: "Cloudiness",
				sunrise: "Sunrise",
				sunset: "Sunset",
			},
			card: {
				empty: "Add favorite",
			},
			dialog_card: {
				remove: {
					title: "Remove favorite",
					text: "Do you really want to remove this favorite?",
				},
				limit: {
					title: "Limit exceeded",
					text: "You can add up to 5 favorites.",
				},
				button: {
					remove: "Remove",
					cancel: "Cancel",
					redirect: "Go to favorites",
				},
			},
			input: {
				placeholder: "Enter the city name",
				button_search: "Search",
			},
			chart: {
				temp: "Temperature",
				time: "Time",
			},
			footer_text: "Test task project created for evaluation purposes.",
		},
		uk: {
			main_title: "Застосунок погоди",
			language_title: "Змінити мову",
			logo_image: "Зображення погоди",
			page: {
				home: "Головна",
				favorites: "Вибрані",
			},
			weather_card: {
				temperature: "Температура",
				min: "Мін",
				max: "Макс",
				pressure: "Тиск",
				pressure_unit: "гПа",
				humidity: "Вологість",
				wind: "Вітер",
				wind_unit: "м/с",
				cloudiness: "Хмарність",
				sunrise: "Схід",
				sunset: "Захід",
			},
			card: {
				empty: "Додай вибране",
			},
			dialog_card: {
				remove: {
					title: "Видалити вибране",
					text: "Ви дійсно хочете видалити це вибране?",
				},
				limit: {
					title: "Обмеження",
					text: "Ви можете додати до 5 вибраних.",
				},
				button: {
					remove: "Видалити",
					cancel: "Відмінити",
					redirect: "Перейти до вибраних",
				},
			},
			input: {
				placeholder: "Введіть назву міста",
				button_search: "Пошук",
			},
			chart: {
				temp: "Температура",
				time: "Час",
			},
			footer_text: "Проект тестового завдання створений для оцінки.",
		},
	},
});

export default i18n;
