import { Outlet } from 'react-router-dom';

export const Layout = () => {
	return (
		<div id='layout'>
			Header
			<Outlet />
			Footer
		</div>
	);
};
