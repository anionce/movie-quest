import { ClueButton } from '../ClueButton/ClueButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import LoopIcon from '@mui/icons-material/Loop';
import './Result.scss';
import { selectMovie, selectCluesLeft } from '../../services/slices/scoreboardSlice';
import { useSelector } from 'react-redux';
import { FooterButton } from '../FooterButton/FooterButton';
import { useNavigate } from 'react-router-dom';

export type ResultProps = {
	result: string;
};

export const Result = ({ result }: ResultProps) => {
	const navigate = useNavigate();

	const movieResult = useSelector(selectMovie);
	const finalScore = useSelector(selectCluesLeft);

	const goHome = () => navigate('/');

	let scoreText;
	if (result === 'win') {
		scoreText = `${finalScore} point${finalScore > 1 || finalScore === 0 ? 's' : ''}${
			finalScore > 0 ? '!' : ' :/'
		}`;
	} else {
		scoreText = 'You lost...';
	}

	return (
		<div className='result-container'>
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
