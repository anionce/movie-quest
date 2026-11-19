import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadExtraTitles, loadRound } from '../../services/rounds';
import { makeRound } from '../../test/factories';
import { renderRoutes } from '../../test/render';
import { Home } from './Home';

vi.mock('../../services/rounds', () => ({ loadRound: vi.fn(), loadExtraTitles: vi.fn() }));

const renderHome = () =>
	renderRoutes([
		{ path: '/', element: <Home /> },
		{ path: '/error', element: <p>error page</p> },
	]);

describe('Home', () => {
	beforeEach(() => {
		vi.mocked(loadRound)
			.mockReset()
			.mockResolvedValue({ round: makeRound(), titles: ['Up'], totalPages: 10 });
		vi.mocked(loadExtraTitles).mockResolvedValue([]);
	});

	it('loads a round and asks before changing difficulty mid-game', async () => {
		const { user } = renderHome();
		expect(screen.getByText('Eligiendo una película...')).toBeInTheDocument();
		expect(await screen.findByText('2009')).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Difícil' }));
		expect(screen.getByText('¿Cambiar de dificultad?')).toBeInTheDocument();
		await user.click(screen.getByRole('button', { name: 'Sí, cambiar' }));

		expect(loadRound).toHaveBeenLastCalledWith('hard', { images: 'es', tmdb: 'es-ES' }, expect.any(AbortSignal));
		expect(localStorage.getItem('movieQuestDifficulty')).toBe('hard');
		expect(await screen.findByRole('button', { name: 'Difícil', pressed: true })).toBeInTheDocument();
	});

	it('opens the rules and the leaderboard', async () => {
		const { user } = renderHome();
		await user.click(await screen.findByRole('button', { name: 'Ver reglas' }));
		expect(screen.getByRole('heading', { name: 'Cómo jugar' })).toBeInTheDocument();
		await user.click(screen.getByRole('button', { name: 'Cerrar' }));

		await user.click(screen.getByRole('button', { name: 'Ver clasificación' }));
		expect(screen.getByRole('heading', { name: 'Clasificación' })).toBeInTheDocument();
	});

	it('shows the error page when TMDB fails', async () => {
		vi.mocked(loadRound).mockRejectedValue(new Error('down'));
		renderHome();
		expect(await screen.findByText('error page')).toBeInTheDocument();
	});
});
