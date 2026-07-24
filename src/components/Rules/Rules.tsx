import './Rules.scss';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

export const Rules = () => {
	return (
		<>
			<h2 className='rules-title'>How to play</h2>
			<p className='rules-intro'>Guess the movie before you run out of hints!</p>
			<ul className='rules-list'>
				<li>
					<span className='rules-step'>1</span>
					<span className='rules-text'>
						Start with 3 clues: the release <strong>year</strong>, the <strong>genre</strong>, and a few
						letters of the title.
					</span>
				</li>
				<li>
					<span className='rules-step'>2</span>
					<span className='rules-text'>
						Type your guess, pick it from the list, then hit the green <strong>Guess</strong> button.
					</span>
				</li>
				<li>
					<span className='rules-step'>3</span>
					<span className='rules-text'>
						Stuck? Tap <strong>Get hint</strong> for keywords, the tagline, and a cast member — each hint
						costs one point.
					</span>
				</li>
				<li>
					<span className='rules-step'>4</span>
					<span className='rules-text'>
						Out of hints? You can still reveal the answer. Your final score joins the leaderboard!
					</span>
				</li>
			</ul>
			<div className='modal-icon'>
				<MovieFilterIcon />
			</div>
		</>
	);
};
