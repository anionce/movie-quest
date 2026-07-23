import './Header.scss';
import { Link } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

export const Header = () => {
	return (
		<div className='header-container'>
			<Link to='/leaderboard' className='header-side-link' aria-label='Leaderboard'>
				<EmojiEventsIcon />
			</Link>
			<Link to='/' className='logo'>
				<LocalMoviesIcon className='logo-icon' />
				<span>
					Movie<strong>Quest</strong>
				</span>
			</Link>
			<span className='header-side-link header-side-link--placeholder' />
		</div>
	);
};
