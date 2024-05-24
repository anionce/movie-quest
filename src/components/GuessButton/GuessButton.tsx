import './GuessButton.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export type GuessButtonProps = { guessMovie: (event: React.MouseEvent<HTMLButtonElement>) => void; value: string };

export const GuessButton = ({ guessMovie, value }: GuessButtonProps) => {
	return (
		<button onClick={guessMovie} className={value ? 'guess-button' : 'guess-button button-disabled'}>
			<PlayArrowIcon /> <span>Guess</span>
		</button>
	);
};
