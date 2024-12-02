import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import Favorites from "@/views/FavoritesPage.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/favorites",
		name: "Favorites",
		component: Favorites,
	},
	{ path: "/:pathMatch(.*)*", redirect: "/" },
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
