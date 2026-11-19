import { buildRound, pickMovie, pickPage, randomInt, type Round } from '../lib/game';
import { addRecentMovieId, getRecentMovieIds, type Difficulty } from '../lib/storage';
import type { Movie } from '../models/MovieResponse';
import { discoverPopularMovies, getMovieCredits, getMovieDetails, getMovieImages } from './tmdb';

export type Languages = { tmdb: string; images: string };

export type LoadedRound = { round: Round; titles: string[]; totalPages: number };

const MAX_ATTEMPTS = 5;
const EXTRA_TITLE_PAGES = 10;

export const uniqueTitles = (movies: Movie[]): string[] => [...new Set(movies.map(movie => movie.title).filter(Boolean))];

const findMovieWithClues = async (movies: Movie[], languages: Languages, signal?: AbortSignal): Promise<Round> => {
	const tried = new Set<number>();
	for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
		const movie = pickMovie(
			movies.filter(candidate => !tried.has(candidate.id)),
			getRecentMovieIds()
		);
		if (!movie) break;
		tried.add(movie.id);
		const [details, credits, images] = await Promise.all([
			getMovieDetails(movie.id, languages.tmdb, signal),
			getMovieCredits(movie.id, languages.tmdb, signal),
			getMovieImages(movie.id, languages.images, signal).catch(() => undefined),
		]);
		if (details.tagline) {
			addRecentMovieId(movie.id);
			return buildRound(movie, details, credits, images, languages.images);
		}
	}
	throw new Error('No movie with enough clues');
};

export const loadRound = async (difficulty: Difficulty, languages: Languages, signal?: AbortSignal): Promise<LoadedRound> => {
	const { total_pages } = await discoverPopularMovies(1, languages.tmdb, signal);
	const { results } = await discoverPopularMovies(pickPage(difficulty, total_pages), languages.tmdb, signal);
	return {
		round: await findMovieWithClues(results, languages, signal),
		titles: uniqueTitles(results),
		totalPages: total_pages,
	};
};

export const loadExtraTitles = async (totalPages: number, languages: Languages, signal?: AbortSignal): Promise<string[]> => {
	const pages = Array.from({ length: EXTRA_TITLE_PAGES }, () => randomInt(1, totalPages));
	const results = await Promise.allSettled(pages.map(page => discoverPopularMovies(page, languages.tmdb, signal)));
	return uniqueTitles(results.flatMap(result => (result.status === 'fulfilled' ? result.value.results : [])));
};
