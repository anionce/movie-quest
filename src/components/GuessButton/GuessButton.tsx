import './GuessButton.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export type GuessButtonProps = { guessMovie: (event: React.MouseEvent<HTMLButtonElement>) => void };

export const GuessButton = ({ guessMovie }: GuessButtonProps) => {
	return (
		<button onClick={guessMovie} className='guess-button'>
			{<PlayArrowIcon />}
		</button>
	);
};
