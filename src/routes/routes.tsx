import type { RouteObject } from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
import { Home } from '../pages/Home/Home';
import { Result } from '../components/Result/Result';
import { PATH_OF_ROUTES } from './paths';

export const childrenRoutes: RouteObject[] = [
	{ index: true, element: <Home /> },
	{ path: PATH_OF_ROUTES.WIN, element: <Result won /> },
	{ path: PATH_OF_ROUTES.LOSE, element: <Result won={false} /> },
	{ path: PATH_OF_ROUTES.ERROR, element: <ErrorPage /> },
	{ path: '*', element: <ErrorPage /> },
];
