import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './services/i18n';
import './index.scss';
import { childrenRoutes } from './routes/routes';
import { Layout } from './components/Layout/Layout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: childrenRoutes,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
