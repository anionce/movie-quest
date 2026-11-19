import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useTranslation } from 'react-i18next';
import './MoreButton.scss';

type MoreButtonProps = {
	gameOver: boolean;
	onHint: () => void;
	onShowResult: () => void;
};

export const MoreButton = ({ gameOver, onHint, onShowResult }: MoreButtonProps) => {
	const { t } = useTranslation();

	return (
		<button type='button' onClick={gameOver ? onShowResult : onHint} className={gameOver ? 'lost-button' : 'more-button'}>
			{gameOver ? (
				<div className='check-result'>
					<SentimentDissatisfiedIcon fontSize='small' />
					<span>{t('buttons.seeResult')}</span>
				</div>
			) : (
				<div className='get-hint'>
					<LightbulbOutlinedIcon />
					<span>{t('buttons.getHint')}</span>
				</div>
			)}
		</button>
	);
};
