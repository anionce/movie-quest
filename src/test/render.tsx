import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider, type RouteObject } from 'react-router-dom';

export const renderRoutes = (routes: RouteObject[], initialEntry: string | { pathname: string; state: unknown } = '/') => {
	const router = createMemoryRouter(routes, { initialEntries: [initialEntry] });
	return { user: userEvent.setup(), router, ...render(<RouterProvider router={router} />) };
};

export const renderAt = (element: ReactElement) => renderRoutes([{ path: '*', element }]);
