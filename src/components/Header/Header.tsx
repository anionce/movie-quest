import './Header.scss';
import Logo from '../../assets/images/logo-final.png';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = () => {
	return (
		<>
			<div className='header-container'>
				<MenuIcon fontSize='large' className='menu-icon' />
				<img alt='movie-quest-logo' src={Logo} className='logo' />
				<MenuIcon fontSize='large' className='menu-icon' />
			</div>
			<div className='header-separator'> </div>
		</>
	);
};
