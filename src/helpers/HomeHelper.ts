export const getRandomValue = (value: number) => {
	if (value <= 1) {
		return 1;
	} else {
		return Math.floor(Math.random() * value);
	}
};
export const getTruncatedGenre = (genres: string | undefined) => {
	const trimmedString = genres?.substring(0, 35);
	const result = trimmedString?.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf('·')));

	return result;
};
