import type { APIMovieResponse, Credits, Images, MovieDetail } from '../models/MovieResponse';

const BASE_URL = 'https://api.themoviedb.org/3/';
const TOKEN = import.meta.env.VITE_REACT_APP_TOKEN;
const MIN_VOTE_COUNT = 1500;
const MIN_VOTE_AVERAGE = 5.5;

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const IMAGE_THUMB_URL = 'https://image.tmdb.org/t/p/w185';

const fetchTmdb = async <T>(path: string, params: Record<string, string>, signal?: AbortSignal): Promise<T> => {
	const response = await fetch(`${BASE_URL}${path}?${new URLSearchParams(params)}`, {
		headers: { Authorization: `Bearer ${TOKEN}` },
		signal,
	});
	if (!response.ok) throw new Error(`TMDB request failed with status ${response.status}`);
	return (await response.json()) as T;
};

export const discoverPopularMovies = (page: number, language: string, signal?: AbortSignal) =>
	fetchTmdb<APIMovieResponse>(
		'discover/movie',
		{
			language,
			include_adult: 'false',
			'vote_count.gte': String(MIN_VOTE_COUNT),
			'vote_average.gte': String(MIN_VOTE_AVERAGE),
			sort_by: 'popularity.desc',
			page: String(page),
		},
		signal
	);

export const getMovieDetails = (id: number, language: string, signal?: AbortSignal) =>
	fetchTmdb<MovieDetail>(`movie/${id}`, { language }, signal);

export const getMovieCredits = (id: number, language: string, signal?: AbortSignal) =>
	fetchTmdb<Credits>(`movie/${id}/credits`, { language }, signal);

export const getMovieImages = (id: number, imageLanguage: string, signal?: AbortSignal) =>
	fetchTmdb<Images>(`movie/${id}/images`, { include_image_language: `${imageLanguage},null` }, signal);
