import { describe, expect, it } from 'vitest';
import {
	addLeaderboardEntry,
	addRecentMovieId,
	getLeaderboard,
	getRecentMovieIds,
	getStoredDifficulty,
	storeDifficulty,
} from './storage';

describe('storage', () => {
	it('remembers the difficulty, defaulting to easy', () => {
		expect(getStoredDifficulty()).toBe('easy');
		storeDifficulty('hard');
		expect(getStoredDifficulty()).toBe('hard');
	});

	it('keeps the last 40 recent movies without repeats', () => {
		for (let id = 1; id <= 45; id++) addRecentMovieId(id);
		addRecentMovieId(10);
		const ids = getRecentMovieIds();
		expect(ids).toHaveLength(40);
		expect(ids.at(-1)).toBe(10);
		expect(ids.filter(id => id === 10)).toHaveLength(1);
	});

	it('keeps the 10 best scores, highest first', () => {
		for (let score = 1; score <= 12; score++) addLeaderboardEntry({ movie: `M${score}`, score, date: '' });
		const board = getLeaderboard();
		expect(board).toHaveLength(10);
		expect(board[0].score).toBe(12);
		expect(board.at(-1)?.score).toBe(3);
	});

	it('survives corrupted data', () => {
		localStorage.setItem('movieQuestLeaderboard', '{oops');
		expect(getLeaderboard()).toEqual([]);
	});
});
