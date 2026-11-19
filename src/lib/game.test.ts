import { describe, expect, it } from 'vitest';
import { makeCredits, makeDetails, makeImages, makeMovie } from '../test/factories';
import {
	buildRound,
	formatGenres,
	gameReducer,
	INITIAL_CLUES,
	isClueRevealed,
	isCorrectGuess,
	isGameOver,
	pickActor,
	pickMovie,
	pickPage,
	pickPoster,
	pickStill,
	randomInt,
	startGame,
} from './game';

describe('random picks', () => {
	it('covers the whole range', () => {
		expect(randomInt(1, 10, () => 0)).toBe(1);
		expect(randomInt(1, 10, () => 0.9999)).toBe(10);
		expect(randomInt(5, 5)).toBe(5);
	});

	it('picks easy pages among the most popular and hard pages after them', () => {
		expect(pickPage('easy', 500, () => 0.9999)).toBe(35);
		expect(pickPage('hard', 500, () => 0)).toBe(36);
		expect(pickPage('hard', 20, () => 0.9999)).toBe(20);
	});

	it('avoids recently played movies when possible', () => {
		const movies = [makeMovie({ id: 1 }), makeMovie({ id: 2 })];
		expect(pickMovie(movies, [1], () => 0)?.id).toBe(2);
		expect(pickMovie(movies, [1, 2], () => 0)?.id).toBe(1);
		expect(pickMovie([], [])).toBeUndefined();
	});
});

describe('clues', () => {
	it('joins genres and cuts them on a separator when too long', () => {
		expect(formatGenres([{ id: 1, name: 'Drama' }])).toBe('Drama');
		const many = ['Ciencia ficción', 'Aventura', 'Acción', 'Suspense'].map((name, id) => ({ id, name }));
		expect(formatGenres(many)).toBe('Ciencia ficción · Aventura');
	});

	it('skips the most famous leads but falls back for small casts', () => {
		expect(pickActor(makeCredits(['Lead', 'Second', 'Third', 'Fourth']))).toBe('Third');
		expect(pickActor(makeCredits(['Only']))).toBe('Only');
		expect(pickActor(makeCredits([]))).toBeUndefined();
	});

	it('prefers a poster in the app language and stills without title text', () => {
		const images = makeImages({
			posters: [{ file_path: '/en.jpg', iso_639_1: 'en', vote_average: 1 }],
			backdrops: [
				{ file_path: '/title.jpg', iso_639_1: 'en', vote_average: 9 },
				{ file_path: '/scene.jpg', iso_639_1: null, vote_average: 1 },
			],
		});
		expect(pickPoster(images, 'en', '/fallback.jpg')).toBe('/en.jpg');
		expect(pickPoster(images, 'es', '/fallback.jpg')).toBe('/fallback.jpg');
		expect(pickStill(images, () => 0)).toBe('/scene.jpg');
		expect(pickStill(undefined)).toBeUndefined();
	});

	it('builds a round from the movie data', () => {
		const round = buildRound(
			makeMovie({ id: 7, title: 'Heat' }),
			makeDetails(),
			makeCredits(['A', 'B', 'C']),
			undefined,
			'es'
		);
		expect(round).toEqual({
			movieId: 7,
			title: 'Heat',
			poster: '/poster.jpg',
			year: '1994',
			genres: 'Drama',
			tagline: 'Fear can hold you prisoner.',
			actor: 'C',
			still: undefined,
		});
	});

	it('accepts guesses regardless of case and spaces', () => {
		expect(isCorrectGuess('The Matrix', ' the matrix ')).toBe(true);
		expect(isCorrectGuess('The Matrix', 'Matrix')).toBe(false);
	});
});

describe('game rules', () => {
	it('gives one extra clue per bonus letter in the title', () => {
		expect(startGame('Up').cluesLeft).toBe(INITIAL_CLUES);
		expect(startGame('Mulan').pendingLetters).toEqual(['a', 'm']);
		expect(startGame('Mulan').cluesLeft).toBe(INITIAL_CLUES + 2);
	});

	it('reveals bonus letters first, in both cases, then the extra clues', () => {
		let state = startGame('Rambo');
		state = gameReducer(state, { type: 'hint' });
		expect(state.revealedLetters).toEqual(['a', 'A']);
		state = gameReducer(state, { type: 'hint' });
		expect(state.revealedLetters).toEqual(['a', 'A', 'm', 'M']);
		expect(isClueRevealed(state, 'tagline')).toBe(false);
		state = gameReducer(state, { type: 'hint' });
		expect(isClueRevealed(state, 'tagline')).toBe(true);
		expect(isClueRevealed(state, 'actor')).toBe(false);
		expect(state.cluesLeft).toBe(2);
	});

	it('charges wrong guesses and clears the error on the next hint', () => {
		let state = gameReducer(startGame('Up'), { type: 'wrongGuess' });
		expect(state).toMatchObject({ cluesLeft: 2, wrongGuess: true });
		state = gameReducer(state, { type: 'clearError' });
		expect(state.wrongGuess).toBe(false);
	});

	it('ends when all clues are shown or none are left, never going below zero', () => {
		let state = startGame('Up');
		for (let i = 0; i < 3; i++) state = gameReducer(state, { type: 'hint' });
		expect(isGameOver(state)).toBe(true);
		expect(gameReducer(state, { type: 'wrongGuess' }).cluesLeft).toBe(0);

		const broke = gameReducer(gameReducer(gameReducer(startGame('Up'), { type: 'wrongGuess' }), { type: 'wrongGuess' }), {
			type: 'wrongGuess',
		});
		expect(isGameOver(broke)).toBe(true);
	});
});
