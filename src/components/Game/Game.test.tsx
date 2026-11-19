import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { getLeaderboard } from '../../lib/storage';
import { makeRound } from '../../test/factories';
import { renderRoutes } from '../../test/render';
import { Game } from './Game';

const renderGame = (round = makeRound()) =>
	renderRoutes([
		{
			path: '/',
			element: (
				<Game
					round={round}
					titles={['Up', 'Uptown Girls', 'Upgrade']}
					onRestart={vi.fn()}
					onShowRules={vi.fn()}
					onShowLeaderboard={vi.fn()}
				/>
			),
		},
		{ path: '/win', element: <p>win page</p> },
		{ path: '/lose', element: <p>lose page</p> },
	]);

const guess = async (user: ReturnType<typeof renderGame>['user'], title: string) => {
	await user.type(screen.getByRole('combobox', { name: 'Escribe el título de una película para adivinar' }), title.slice(0, 3));
	await user.click(await screen.findByRole('option', { name: title }));
	await user.click(screen.getByRole('button', { name: 'Adivinar' }));
};

describe('Game', () => {
	it('shows the first clues and reveals the rest one hint at a time', async () => {
		const { user } = renderGame();
		expect(screen.getByText('2009')).toBeInTheDocument();
		expect(screen.getByText('Animación · Aventura')).toBeInTheDocument();
		expect(screen.queryByText('Fly up with Carl.')).not.toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: /Más pistas/ }));
		expect(screen.getByText('Fly up with Carl.')).toBeInTheDocument();
		expect(screen.getByLabelText('Pistas restantes: 2')).toBeInTheDocument();
	});

	it('charges a wrong guess and shows an error', async () => {
		const { user } = renderGame();
		await guess(user, 'Uptown Girls');

		expect(screen.getByText('Uy, no es esa — ¡inténtalo de nuevo!')).toBeInTheDocument();
		expect(screen.getByLabelText('Pistas restantes: 2')).toBeInTheDocument();
	});

	it('saves the score and goes to the win page on a correct guess', async () => {
		const { user, router } = renderGame(makeRound({ title: 'Upgrade' }));
		await guess(user, 'Upgrade');

		expect(await screen.findByText('win page')).toBeInTheDocument();
		expect(router.state.location.state).toEqual({ movie: 'Upgrade', poster: '/up.jpg', score: 5 });
		expect(getLeaderboard()).toMatchObject([{ movie: 'Upgrade', score: 5 }]);
	});

	it('offers the result once the clues run out', async () => {
		const { user, router } = renderGame();
		for (let i = 0; i < 3; i++) await user.click(screen.getByRole('button', { name: /Más pistas/ }));
		await user.click(screen.getByRole('button', { name: /Ver resultado/ }));

		expect(await screen.findByText('lose page')).toBeInTheDocument();
		expect(router.state.location.state).toMatchObject({ movie: 'Up', score: 0 });
	});
});
