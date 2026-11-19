import { useTranslation } from 'react-i18next';
import './GuessButton.scss';

export const GuessButton = ({ disabled, onGuess }: { disabled: boolean; onGuess: () => void }) => {
	const { t } = useTranslation();

	return (
		<button
			type='button'
			onClick={onGuess}
			disabled={disabled}
			className={`guess-button ${disabled ? 'button-disabled' : ''}`}
		>
			{t('buttons.guess')}
		</button>
	);
};
