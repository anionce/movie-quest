import { useEffect, useRef } from 'react';
import { ClueButton } from '../ClueButton/ClueButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import LoopIcon from '@mui/icons-material/Loop';
import './Result.scss';
import { selectMovie, selectCluesLeft, selectPosterPath } from '../../services/slices/scoreboardSlice';
import { useSelector } from 'react-redux';
import { FooterButton } from '../FooterButton/FooterButton';
import { useNavigate } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../services/endpoints';
import { addLeaderboardEntry } from '../../helpers/LeaderboardHelper';

export type ResultProps = {
	result: string;
};

export const Result = ({ result }: ResultProps) => {
	const navigate = useNavigate();

	const movieResult = useSelector(selectMovie);
	const posterPath = useSelector(selectPosterPath);
	const finalScore = useSelector(selectCluesLeft);

	const hasSaved = useRef(false);

	const goHome = () => navigate('/');

	let scoreText;
	if (result === 'win') {
		scoreText = `${finalScore} point${finalScore > 1 || finalScore === 0 ? 's' : ''}${
			finalScore > 0 ? '!' : ' :/'
		}`;
	} else {
		scoreText = 'You lost...';
	}

	useEffect(() => {
		if (hasSaved.current || !movieResult) {
			return;
		}
		hasSaved.current = true;
		addLeaderboardEntry({
			movie: movieResult,
			score: result === 'win' ? finalScore : 0,
			result: result === 'win' ? 'win' : 'lose',
			date: new Date().toISOString(),
		});
	}, [movieResult]);

	return (
		<div className='result-container'>
			{posterPath && (
				<img className='result-poster' src={`${IMAGE_BASE_URL}${posterPath}`} alt={movieResult ?? 'movie poster'} />
			)}
			<ClueButton value={movieResult} type='result' />
			<div className='result'>
				{result === 'win' ? <CheckCircleIcon className='correct' /> : <DangerousIcon className='incorrect' />}
			</div>
			<div>
				<span>{scoreText}</span>
			</div>
			<FooterButton value={<LoopIcon />} type='home' action={goHome} />
		</div>
	);
};
