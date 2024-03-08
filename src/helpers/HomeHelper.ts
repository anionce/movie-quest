export const getRandomValue = (value: number) => {
	const result = Math.floor(Math.random() * value) + 1;
	console.log(result, 'result');
	return result;
};
export const getTruncatedGenre = (genres: string | undefined) => {
	const trimmedString = genres?.substring(0, 35);
	const result = trimmedString?.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf('·')));

	return result;
};
