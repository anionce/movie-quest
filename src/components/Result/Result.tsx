import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import LoopIcon from '@mui/icons-material/Loop';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { PATH_OF_ROUTES, type ResultState } from '../../routes/paths';
import { IMAGE_BASE_URL } from '../../services/tmdb';
import { FooterButton } from '../FooterButton/FooterButton';
import './Result.scss';

export const Result = ({ won }: { won: boolean }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const result = useLocation().state as ResultState | null;

	if (!result) return <Navigate to={PATH_OF_ROUTES.HOME} replace />;

	return (
		<div className='result-container'>
			<div className={`result-card ${won ? 'result-card-win' : 'result-card-lose'}`}>
				{result.poster ? (
					<img src={`${IMAGE_BASE_URL}${result.poster}`} alt={result.movie} className='result-poster' />
				) : (
					<div className='result-icon-badge'>
						{won ? <CheckCircleIcon className='correct' /> : <DangerousIcon className='incorrect' />}
					</div>
				)}
				<span className='result-label'>{won ? t('result.youGotIt') : t('result.movieWas')}</span>
				<h1 className='result-title'>{result.movie}</h1>
				{won ? (
					<div className='result-score-row'>
						<span className='result-score'>
							{result.score} {result.score === 1 ? t('result.point') : t('result.points')}
						</span>
						{result.score === 0 && <SentimentDissatisfiedIcon className='result-score-icon' />}
					</div>
				) : (
					<span className='result-score'>{t('result.youLost')}</span>
				)}
			</div>
			<FooterButton
				icon={<LoopIcon />}
				type='home'
				onClick={() => navigate(PATH_OF_ROUTES.HOME)}
				label={t('buttons.playAgain')}
			/>
		</div>
	);
};
