import { Credits, Images } from '../models/MovieResponse';

let previousResult: number | null = null;

export const getRandomValueInRange = (min: number, max: number): number => {
	if (max <= min) return min;
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomValue = (value: number): number => {
	let result: number;

	do {
		result = getRandomValueInRange(1, value);
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

	if (actorsListByPopularity.length === 0) return undefined;

	// Skip the top-billed lead (too obvious a clue) but fall back to it for small casts.
	const index = Math.min(2, actorsListByPopularity.length - 1);
	return actorsListByPopularity[index];
};

export const getLocalizedPoster = (images: Images | undefined, fallbackPosterPath?: string): string | undefined => {
	const spanishPoster = images?.posters.find(poster => poster.iso_639_1 === 'es');
	return spanishPoster?.file_path ?? fallbackPosterPath;
};

export const getMovieStill = (images: Images | undefined): string | undefined => {
	if (!images?.backdrops?.length) return undefined;

	// Pick from the whole pool (not just the top-voted, most iconic shots) so the still is a
	// genuine hint rather than a giveaway — the highest-voted backdrop is usually the poster's hero shot.
	const index = Math.floor(Math.random() * images.backdrops.length);
	return images.backdrops[index]?.file_path;
};
