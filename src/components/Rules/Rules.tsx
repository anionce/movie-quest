import './Rules.scss';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

export const Rules = () => {
	return (
		<>
			<h2>Rules</h2>
			<div className='rules-separator'> </div>
			<p>It's time to put your movie knowledge to the test!</p>
			<ul>
				<li>
					Try to figure out the film title using the provided clues. First you get 3 hints: genre, release
					year, and some hangman letters to help you along.
				</li>
				<li>
					Start typing the movie title you think matches the clues. If it doesn't pop up, you might need to
					rethink your choice. Hit the green button when you're ready to submit your guess.
				</li>
				<li>Feeling stuck? No worries! Click on the magnifying glass for more clues.</li>
				<li>
					If you see a red button with a sad face, it means you've exhausted all the clues. Don't stress! You
					can still opt to reveal the correct answer.
				</li>
				<li>
					Your score depends on how many clues you needed and how many times you missed. So, give it your best
					shot and have fun!
				</li>
			</ul>
			<div className='modal-icon'>
				<MovieFilterIcon />
			</div>
		</>
	);
};
