import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Components from "unplugin-vue-components/vite"; // Автоимпорт компонентов
// import { createHtmlPlugin } from 'vite-plugin-html'; // Динамическое изменение index.html
// import vueI18n from '@intlify/vite-plugin-vue-i18n'; // Поддержка i18n

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 5173,
		open: true,
	},
	plugins: [
		vue(),
		Components({
			dirs: ["src/components"],
			extensions: ["vue"],
			deep: true,
		}),
	],
	optimizeDeps: {
		include: ["vue", "vue-router", "vue-i18n", "pinia", "chart.js"],
	},
});

// export default defineConfig({
//   plugins: [
//     vue(), // Подключение Vue 3
//     Components({
//       dirs: ['src/components'], // Папка для автоимпорта компонентов
//       extensions: ['vue'], // Расширения файлов компонентов
//       deep: true, // Рекурсивный поиск
//     }),

//     vueI18n({
//       include: path.resolve(__dirname, './src/locales/**'), // Папка с файлами перевода
//     }),
//     createHtmlPlugin({
//       inject: {
//         data: {
//           title: 'Vue3 Vite App', // Динамическое изменение <title> в index.html
//         },
//       },
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'), // Удобный доступ к папке src через @
//     },
//   },
//   server: {
//     port: 3000, // Порт для дев-сервера
//     open: true, // Автоматическое открытие в браузере
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000', // URL бэкенда
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''), // Убираем префикс /api
//       },
//     },
//   },
//   build: {
//     outDir: 'dist', // Папка сборки
//     sourcemap: false, // Включить или отключить sourcemap
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             // Разделение библиотек на отдельные чанки
//             return id
//               .toString()
//               .split('node_modules/')[1]
//               .split('/')[0]
//               .toString();
//           }
//         },
//       },
//     },
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: `@import "@/styles/variables.scss";`, // Глобальные SCSS переменные
//       },
//     },
//   },
//   optimizeDeps: {
//     include: ['vue', 'vue-router'], // Предварительная оптимизация этих библиотек
//   },
// });
