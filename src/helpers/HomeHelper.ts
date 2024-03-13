import { Credits } from '../models/MovieResponse';

let previousResult: number | null = null;

export const getRandomValue = (value: number): number => {
	let result: number;

	do {
		result = Math.floor(Math.random() * value) + 1;
	} while (result === previousResult);

	previousResult = result;

	return result;
};

export const getTruncatedGenre = (genres?: string) => {
	if (!genres) return genres;

	const trimmedString = genres.length > 34 ? genres.substring(0, 35) : genres;
	const lastDotIndex = trimmedString.lastIndexOf('·');

	return lastDotIndex !== -1 ? trimmedString.substring(0, lastDotIndex) : trimmedString;
};

export const getRandomActor = (movieCast: Credits) => {
	const actorsListByPopularity = movieCast.cast
		.filter(cast => cast.known_for_department === 'Acting')
		.sort((a, b) => b.popularity - a.popularity)
		.map((actor: { name: string }) => actor.name);

	return actorsListByPopularity[2];
};
