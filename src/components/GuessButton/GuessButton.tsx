import './GuessButton.scss';

export type GuessButtonProps = { guessMovie: (event: React.MouseEvent<HTMLButtonElement>) => void; value: string };

export const GuessButton = ({ guessMovie, value }: GuessButtonProps) => {
	return (
		<button onClick={guessMovie} className={value ? 'guess-button' : 'guess-button button-disabled'}>
			Guess
		</button>
	);
};
