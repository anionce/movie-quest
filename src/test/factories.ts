import type { Round } from '../lib/game';
import type { Credits, Images, Movie, MovieDetail } from '../models/MovieResponse';

export const makeMovie = (overrides: Partial<Movie> = {}): Movie => ({
	adult: false,
	backdrop_path: '',
	genre_ids: [],
	id: 1,
	original_language: 'en',
	original_title: 'Movie',
	overview: '',
	popularity: 10,
	poster_path: '/poster.jpg',
	release_date: '1994-09-23',
	title: 'Movie',
	video: false,
	vote_average: 8,
	vote_count: 5000,
	...overrides,
});

export const makeDetails = (overrides: Partial<MovieDetail> = {}): MovieDetail => ({
	...makeMovie(),
	belongs_to_collection: null,
	budget: 0,
	homepage: '',
	imdb_id: 'tt0',
	production_companies: [],
	production_countries: [],
	revenue: 0,
	spoken_languages: [],
	status: 'Released',
	tagline: 'Fear can hold you prisoner.',
	genres: [{ id: 18, name: 'Drama' }],
	...overrides,
});

export const makeCredits = (names: string[]): Credits => ({
	id: 1,
	cast: names.map((name, index) => ({
		adult: false,
		gender: 0,
		id: index,
		known_for_department: 'Acting',
		name,
		original_name: name,
		popularity: 100 - index,
		profile_path: '',
		cast_id: index,
		character: '',
		credit_id: '',
		order: index,
	})),
});

export const makeImages = (overrides: Partial<Images> = {}): Images => ({ id: 1, backdrops: [], posters: [], ...overrides });

export const makeRound = (overrides: Partial<Round> = {}): Round => ({
	movieId: 1,
	title: 'Up',
	poster: '/up.jpg',
	year: '2009',
	genres: 'Animación · Aventura',
	tagline: 'Fly up with Carl.',
	actor: 'Ed Asner',
	still: '/still.jpg',
	...overrides,
});
