export const getRandomValue = (value: number) => Math.floor(Math.random() * value);

export const getTruncatedGenre = (genres: string | undefined) => {
	const trimmedString = genres?.substring(0, 35);
	const result = trimmedString?.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf('·')));

	return result;
};

/* export const getTruncatedTitle = (title: string) => {
	const trimmedString = title.substring(0, 25);

	return title.length > 24 ? `${trimmedString}... ` : title;
};
 */
