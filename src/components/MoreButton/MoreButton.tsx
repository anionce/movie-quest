import './MoreButton.scss';
import SearchIcon from '@mui/icons-material/Search';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export type MoreButtonProps = { getMoreClues: () => void; gameFinished: boolean };

export const MoreButton = ({ getMoreClues, gameFinished }: MoreButtonProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const getClass = () => (gameFinished ? 'lost-button' : 'more-button');

	const goToLosePage = () => {
		navigate('/lose');
	};

	return (
		<button onClick={gameFinished ? goToLosePage : getMoreClues} className={getClass()}>
			{gameFinished ? (
				<div className='check-result'>
					<SentimentDissatisfiedIcon fontSize='small' />
					<span>{t('buttons.seeResult')}</span>
				</div>
			) : (
				<div className='get-hint'>
					<SearchIcon />
					<span>{t('buttons.getHint')}</span>
				</div>
			)}
		</button>
	);
};
