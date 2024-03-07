import './Header.scss';
import Logo from '../../assets/images/logo-final.png';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<>
			<div className='header-container'>
				<MenuIcon fontSize='large' className='menu-icon' />
				<Link to='/'>
					<img alt='movie-quest-logo' src={Logo} className='logo' />{' '}
				</Link>
				<MenuIcon fontSize='large' className='menu-icon' />
			</div>
			<div className='header-separator'> </div>
		</>
	);
};
