import { RouteObject } from 'react-router-dom';
import { Page } from '../pages/Page/Page';
import { Home } from '../pages/Home/Home';

export const PATH_OF_ROUTES = {
	PAGE: '/page',
};

export const childrenRoutes: RouteObject[] = [
	{ index: true, element: <Home /> },
	{
		path: PATH_OF_ROUTES.PAGE,
		element: <Page />,
	},
];
