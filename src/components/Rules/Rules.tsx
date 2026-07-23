import './Rules.scss';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import TheatersIcon from '@mui/icons-material/Theaters';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SearchIcon from '@mui/icons-material/Search';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export const Rules = () => {
	return (
		<div className='rules'>
			<div className='rules__icon'>
				<MovieFilterIcon fontSize='inherit' />
			</div>
			<h2>How to play</h2>
			<p className='rules__intro'>Guess the movie before you run out of clues!</p>
			<ul className='rules__list'>
				<li>
					<TheatersIcon fontSize='small' />
					<span>
						Start with the <strong>genre</strong>, <strong>year</strong> and a few letters.
					</span>
				</li>
				<li>
					<KeyboardIcon fontSize='small' />
					<span>
						Type 3+ letters, pick your guess, hit <strong>Guess</strong>.
					</span>
				</li>
				<li>
					<SearchIcon fontSize='small' />
					<span>
						Stuck? <strong>Get hint</strong> reveals keywords, tagline or cast — each costs a point.
					</span>
				</li>
				<li>
					<SentimentDissatisfiedIcon fontSize='small' />
					<span>Out of clues, the button turns red so you can see the answer.</span>
				</li>
			</ul>
			<p className='rules__footer'>Good luck, have fun! 🍿</p>
		</div>
	);
};
