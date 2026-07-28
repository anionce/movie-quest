import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import LoopIcon from '@mui/icons-material/Loop';
import './Result.scss';
import { selectMovie, selectCluesLeft, selectMoviePoster } from '../../services/slices/scoreboardSlice';
import { useSelector } from 'react-redux';
import { FooterButton } from '../FooterButton/FooterButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { IMAGE_BASE_URL } from '../../services/endpoints';
import { addLeaderboardEntry } from '../../services/leaderboard';
import { useTranslation } from 'react-i18next';

export type ResultProps = {
	result: string;
};

export const Result = ({ result }: ResultProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const hasSavedScore = useRef(false);

	const movieResult = useSelector(selectMovie);
	const finalScore = useSelector(selectCluesLeft);
	const moviePoster = useSelector(selectMoviePoster);
	const isWin = result === 'win';

	const goHome = () => navigate('/');

	useEffect(() => {
		if (isWin && movieResult && !hasSavedScore.current) {
			hasSavedScore.current = true;
			addLeaderboardEntry({ movie: movieResult, score: finalScore, date: new Date().toLocaleDateString() });
		}
	}, [isWin, movieResult, finalScore]);

	return (
		<div className='result-container'>
			<div className={isWin ? 'result-card result-card-win' : 'result-card result-card-lose'}>
				{moviePoster ? (
					<img src={`${IMAGE_BASE_URL}${moviePoster}`} alt={movieResult} className='result-poster' />
				) : (
					<div className='result-icon-badge'>
						{isWin ? <CheckCircleIcon className='correct' /> : <DangerousIcon className='incorrect' />}
					</div>
				)}
				<span className='result-label'>{isWin ? t('result.youGotIt') : t('result.movieWas')}</span>
				<h1 className='result-title'>{movieResult}</h1>
				{isWin ? (
					<div className='result-score-row'>
						<span className='result-score'>
							{finalScore} {finalScore === 1 ? t('result.point') : t('result.points')}
						</span>
						{finalScore === 0 && <SentimentDissatisfiedIcon className='result-score-icon' />}
					</div>
				) : (
					<span className='result-score'>{t('result.youLost')}</span>
				)}
			</div>
			<FooterButton value={<LoopIcon />} type='home' action={goHome} label={t('buttons.playAgain')} />
		</div>
	);
};
