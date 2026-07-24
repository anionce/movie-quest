import './Header.scss';
import { Link } from 'react-router-dom';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

export const Header = () => {
	return (
		<div className='header-container'>
			<Link to='/' className='logo'>
				<span className='logo-badge'>
					<LocalMoviesIcon />
				</span>
				<span className='logo-text'>
					Movie<span>Quest</span>
				</span>
			</Link>
		</div>
	);
};
