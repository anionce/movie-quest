import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { childrenRoutes } from './routes/routes';
import './services/i18n';
import './index.scss';

const router = createBrowserRouter([{ path: '/', element: <Layout />, children: childrenRoutes }]);

const root = document.getElementById('root');

if (root) {
	createRoot(root).render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);
}
