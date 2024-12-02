import { ref } from "vue";

export default function useLocation() {
	const locationData = ref(null);
	const fetchUserLocation = async () => {
		try {
			const locationResponse = await fetch("http://ip-api.com/json/");
			locationData.value = await locationResponse.json();
		} catch (error) {
			alert("Error fetching user location:", error);
			console.error("Error fetching user location:", error);
		}
	};
	return {
		fetchUserLocation,
		locationData,
	};
}
