export const getRandomValue = (value: number) => Math.floor(Math.random() * value);

export const getTruncatedGenre = (genres: string | undefined) => {
	const trimmedString = genres?.substring(0, 40);

	const result = trimmedString?.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf('·')));

	return result;
};
