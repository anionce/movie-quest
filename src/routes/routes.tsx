import { RouteObject } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Win } from '../pages/Win/Win';
import { Lose } from '../pages/Lose/Lose';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';

export const PATH_OF_ROUTES = {
	WIN: '/win',
	LOSE: '/lose',
};

export const childrenRoutes: RouteObject[] = [
	{ index: true, element: <Home /> },
	{
		path: PATH_OF_ROUTES.WIN,
		element: <Win />,
	},
	{
		path: PATH_OF_ROUTES.LOSE,
		element: <Lose />,
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
];
