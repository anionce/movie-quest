import { beforeEach, describe, expect, it, vi } from 'vitest';
import { makeCredits, makeDetails, makeImages, makeMovie } from '../test/factories';
import { loadExtraTitles, loadRound } from './rounds';
import { discoverPopularMovies, getMovieCredits, getMovieDetails, getMovieImages } from './tmdb';

vi.mock('./tmdb', () => ({
	discoverPopularMovies: vi.fn(),
	getMovieDetails: vi.fn(),
	getMovieCredits: vi.fn(),
	getMovieImages: vi.fn(),
}));

const languages = { tmdb: 'es-ES', images: 'es' };
const page = (titles: string[]) => ({
	page: 1,
	total_pages: 50,
	total_results: titles.length,
	results: titles.map((title, index) => makeMovie({ id: index + 1, title })),
});

describe('loadRound', () => {
	beforeEach(() => {
		vi.mocked(getMovieCredits).mockResolvedValue(makeCredits(['A', 'B', 'C']));
		vi.mocked(getMovieImages).mockRejectedValue(new Error('no images'));
	});

	it('skips movies without a tagline and remembers the chosen one', async () => {
		vi.mocked(discoverPopularMovies).mockResolvedValue(page(['Heat', 'Heat', 'Up']));
		vi.mocked(getMovieDetails).mockImplementation(async id => makeDetails({ id, tagline: id === 3 ? 'Fly' : '' }));

		const { round, titles, totalPages } = await loadRound('easy', languages);

		expect(round).toMatchObject({ movieId: 3, title: 'Up', tagline: 'Fly' });
		expect(titles).toEqual(['Heat', 'Up']);
		expect(totalPages).toBe(50);
		expect(JSON.parse(localStorage.getItem('movieQuestRecentMovies') ?? '[]')).toEqual([3]);
	});

	it('fails when no movie has enough clues', async () => {
		vi.mocked(discoverPopularMovies).mockResolvedValue(page(['Heat']));
		vi.mocked(getMovieDetails).mockResolvedValue(makeDetails({ tagline: '' }));
		await expect(loadRound('easy', languages)).rejects.toThrow('enough clues');
	});

	it('loads extra titles, ignoring failed pages', async () => {
		vi.mocked(getMovieImages).mockResolvedValue(makeImages());
		vi.mocked(discoverPopularMovies)
			.mockRejectedValueOnce(new Error('down'))
			.mockResolvedValue(page(['Alien']));
		expect(await loadExtraTitles(50, languages)).toEqual(['Alien']);
	});
});
