import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderRoutes } from '../../test/render';
import { Result } from './Result';

const routes = (won: boolean) => [
	{ path: '/', element: <p>home</p> },
	{ path: '/result', element: <Result won={won} /> },
];

describe('Result', () => {
	it('shows the movie and the score after winning', () => {
		renderRoutes(routes(true), { pathname: '/result', state: { movie: 'Up', score: 1 } });
		expect(screen.getByRole('heading', { name: 'Up' })).toBeInTheDocument();
		expect(screen.getByText('1 punto')).toBeInTheDocument();
	});

	it('shows the answer after losing and goes back home', async () => {
		const { user } = renderRoutes(routes(false), {
			pathname: '/result',
			state: { movie: 'Heat', poster: '/p.jpg', score: 0 },
		});
		expect(screen.getByText('La película era')).toBeInTheDocument();
		expect(screen.getByRole('img', { name: 'Heat' })).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/p.jpg');

		await user.click(screen.getByRole('button', { name: 'Jugar de nuevo' }));
		expect(screen.getByText('home')).toBeInTheDocument();
	});

	it('redirects home when opened without a game', () => {
		renderRoutes(routes(true), '/result');
		expect(screen.getByText('home')).toBeInTheDocument();
	});
});
