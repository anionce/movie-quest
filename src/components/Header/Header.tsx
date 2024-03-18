import './Header.scss';
import Logo from '../../assets/images/logo-final.png';
import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<>
			<div className='header-container'>
				<Link to='/'>
					<img alt='movie-quest-logo' src={Logo} className='logo' />
				</Link>
			</div>
			<div className='header-separator'></div>
		</>
	);
};
