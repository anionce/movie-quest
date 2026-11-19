import { useTranslation } from 'react-i18next';
import type { Difficulty } from '../../lib/storage';

const DIFFICULTIES: Difficulty[] = ['easy', 'hard'];

export const DifficultyToggle = ({ value, onChange }: { value: Difficulty; onChange: (difficulty: Difficulty) => void }) => {
	const { t } = useTranslation();

	return (
		<div className='difficulty-toggle' role='group' aria-label={t('difficulty.label')}>
			{DIFFICULTIES.map(difficulty => (
				<button
					key={difficulty}
					type='button'
					aria-pressed={value === difficulty}
					className={`difficulty-option${value === difficulty ? ' active' : ''}`}
					onClick={() => onChange(difficulty)}
				>
					{t(`difficulty.${difficulty}`)}
				</button>
			))}
		</div>
	);
};
