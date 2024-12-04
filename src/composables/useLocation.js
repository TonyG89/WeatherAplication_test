import { ref } from "vue";

let linkToCheckIp = "https://ipapi.co/json/";

export default function useLocation() {
	const locationData = ref(null);
	const fetchUserLocation = async () => {
		try {
			const locationResponse = await fetch(
				import.meta.env.MODE === "development"
					? "http://ip-api.com/json/"
					: linkToCheckIp
			);
			locationData.value = await locationResponse.json();
		} catch (error) {
			alert("Error fetching user location:", error);
			console.error("Error fetching user location:", error);
			linkToCheckIp = "https://ipinfo.io/json";
			fetchUserLocation();
		}
	};
	return {
		fetchUserLocation,
		locationData,
	};
}
