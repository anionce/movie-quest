import './GuessButton.scss';
import { useTranslation } from 'react-i18next';

export type GuessButtonProps = { guessMovie: (event: React.MouseEvent<HTMLButtonElement>) => void; value: string };

export const GuessButton = ({ guessMovie, value }: GuessButtonProps) => {
	const { t } = useTranslation();

	return (
		<button onClick={guessMovie} className={value ? 'guess-button' : 'guess-button button-disabled'}>
			{t('buttons.guess')}
		</button>
	);
};
