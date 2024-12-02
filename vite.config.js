import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Components from "unplugin-vue-components/vite";

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
