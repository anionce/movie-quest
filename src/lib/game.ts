import type { Credits, GenreDetail, Images, Movie, MovieDetail } from '../models/MovieResponse';
import type { Difficulty } from './storage';

export type ExtraClue = 'tagline' | 'actor' | 'still';

export const EXTRA_CLUES: ExtraClue[] = ['tagline', 'actor', 'still'];
export const INITIAL_CLUES = 3;
export const BONUS_LETTERS = ['a', 'e', 'm'];
export const EASY_MAX_PAGE = 35;
const MAX_GENRES_LENGTH = 35;
const GENRE_SEPARATOR = ' · ';
const LEAD_ACTORS_TO_SKIP = 2;

export type Round = {
	movieId: number;
	title: string;
	poster?: string;
	year: string;
	genres: string;
	tagline: string;
	actor?: string;
	still?: string;
};

export type GameState = {
	cluesLeft: number;
	revealedClues: number;
	revealedLetters: string[];
	pendingLetters: string[];
	wrongGuess: boolean;
};

export type GameAction = { type: 'hint' } | { type: 'wrongGuess' } | { type: 'clearError' };

export const randomInt = (min: number, max: number, random = Math.random): number =>
	max <= min ? min : Math.floor(random() * (max - min + 1)) + min;

export const pickPage = (difficulty: Difficulty, totalPages: number, random = Math.random): number => {
	const easyMaxPage = Math.min(EASY_MAX_PAGE, totalPages);
	return difficulty === 'easy' || totalPages <= easyMaxPage
		? randomInt(1, easyMaxPage, random)
		: randomInt(easyMaxPage + 1, totalPages, random);
};

export const pickMovie = (movies: Movie[], recentIds: number[], random = Math.random): Movie | undefined => {
	const fresh = movies.filter(movie => !recentIds.includes(movie.id));
	const candidates = fresh.length ? fresh : movies;
	return candidates[randomInt(0, candidates.length - 1, random)];
};

export const formatGenres = (genres: GenreDetail[]): string => {
	const joined = genres.map(genre => genre.name).join(GENRE_SEPARATOR);
	if (joined.length <= MAX_GENRES_LENGTH) return joined;
	const trimmed = joined.slice(0, MAX_GENRES_LENGTH);
	const lastSeparator = trimmed.lastIndexOf(GENRE_SEPARATOR.trim());
	return (lastSeparator === -1 ? trimmed : trimmed.slice(0, lastSeparator)).trim();
};

export const pickActor = (credits: Credits): string | undefined => {
	const actors = credits.cast
		.filter(person => person.known_for_department === 'Acting')
		.sort((a, b) => b.popularity - a.popularity)
		.map(actor => actor.name);
	return actors[Math.min(LEAD_ACTORS_TO_SKIP, actors.length - 1)];
};

export const pickPoster = (images: Images | undefined, imageLanguage: string, fallback?: string): string | undefined =>
	images?.posters.find(poster => poster.iso_639_1 === imageLanguage)?.file_path ?? fallback;

export const pickStill = (images: Images | undefined, random = Math.random): string | undefined => {
	const backdrops = images?.backdrops ?? [];
	const withoutTitleText = backdrops.filter(backdrop => backdrop.iso_639_1 === null);
	const candidates = withoutTitleText.length ? withoutTitleText : backdrops;
	return candidates[randomInt(0, candidates.length - 1, random)]?.file_path;
};

export const buildRound = (
	movie: Movie,
	details: MovieDetail,
	credits: Credits,
	images: Images | undefined,
	imageLanguage: string
): Round => ({
	movieId: movie.id,
	title: movie.title,
	poster: pickPoster(images, imageLanguage, details.poster_path),
	year: movie.release_date.slice(0, 4),
	genres: formatGenres(details.genres),
	tagline: details.tagline,
	actor: pickActor(credits),
	still: pickStill(images),
});

export const isCorrectGuess = (title: string, guess: string): boolean => title.toLowerCase() === guess.trim().toLowerCase();

export const startGame = (title: string): GameState => {
	const pendingLetters = BONUS_LETTERS.filter(letter => title.toLowerCase().includes(letter));
	return {
		cluesLeft: INITIAL_CLUES + pendingLetters.length,
		revealedClues: 0,
		revealedLetters: [],
		pendingLetters,
		wrongGuess: false,
	};
};

const spendClue = (state: GameState) => Math.max(state.cluesLeft - 1, 0);

export const gameReducer = (state: GameState, action: GameAction): GameState => {
	switch (action.type) {
		case 'hint': {
			const [letter, ...pendingLetters] = state.pendingLetters;
			if (letter) {
				return {
					...state,
					cluesLeft: spendClue(state),
					pendingLetters,
					revealedLetters: [...state.revealedLetters, letter, letter.toUpperCase()],
					wrongGuess: false,
				};
			}
			return {
				...state,
				cluesLeft: spendClue(state),
				revealedClues: Math.min(state.revealedClues + 1, EXTRA_CLUES.length),
				wrongGuess: false,
			};
		}
		case 'wrongGuess':
			return { ...state, cluesLeft: spendClue(state), wrongGuess: true };
		case 'clearError':
			return { ...state, wrongGuess: false };
	}
};

export const isGameOver = (state: GameState): boolean => state.revealedClues >= EXTRA_CLUES.length || state.cluesLeft === 0;

export const isClueRevealed = (state: GameState, clue: ExtraClue): boolean => state.revealedClues > EXTRA_CLUES.indexOf(clue);
