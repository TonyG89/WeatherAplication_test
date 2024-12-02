const now = new Date();

const getCurrentDate = () => {
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
	const day = String(now.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const getTodayStartEndTime = () => {
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const day = now.getDate();
	const start = new Date(year, month - 1, day);
	const end = new Date(`${year}, ${month}, ${+day + 1}`);
	return {
		start: start.getTime() / 1000,
		end: end.getTime() / 1000,
	};
};

const formatTime = (timestamp) => {
	const date = new Date(timestamp * 1000);
	return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatHour = (timestamp) => {
	const date = new Date(timestamp * 1000);
	return `${String(date.getHours()).padStart(2, "0")}:00`;
};

export { now, getCurrentDate, getTodayStartEndTime, formatHour, formatTime };
