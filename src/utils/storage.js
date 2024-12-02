import { isPrimitive } from "@/utils/types";

function getFromLocalStorage(key) {
	const storedValue = localStorage.getItem(key);
	if (!storedValue) return null;

	try {
		return JSON.parse(storedValue);
	} catch {
		return storedValue;
	}
}

function saveToLocalStorage(key, value) {
	if (isPrimitive(value)) {
		localStorage.setItem(key, value);
	} else {
		localStorage.setItem(key, JSON.stringify(value));
	}
}

function removeFromLocalStorage(key) {
	localStorage.removeItem(key);
}

function removeAllFromLocalStorage() {
	localStorage.clear();
}

export {
	getFromLocalStorage,
	saveToLocalStorage,
	removeFromLocalStorage,
	removeAllFromLocalStorage,
};
