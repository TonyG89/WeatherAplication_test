function isPrimitive(value) {
	return value !== Object(value);
}

export { isPrimitive };
