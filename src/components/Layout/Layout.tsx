import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import './Layout.scss';

export const Layout = () => {
	return (
		<div className='layout-container'>
			<Header />
			<Outlet />
		</div>
	);
};
